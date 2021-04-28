from flask import Flask, request
from functools import wraps

# from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy.schema import Table, MetaData
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, inspect, exc
import logging

from dotenv import load_dotenv
import jwt
import datetime
import os

# Init app
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
logging.getLogger("flask_cors").level = logging.DEBUG
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()

# Init database
# engine = create_engine("mysql+pymysql://admin:password@127.0.0.1:3306/test")
engine = None
session = None
insp = None


# Decorator to check for token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]
        if not token:
            return {"error": "Token is missing!"}, 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            username = data["username"]
            if username != os.getenv("LOGIN_USERNAME"):
                return {"error": "Token is invalid!"}, 401
        except jwt.exceptions.InvalidSignatureError:
            return {"error": "Token is invalid!"}, 401
        except KeyError:
            return {"error": "Token is invalid!"}, 401
        return f(*args, **kwargs)

    return decorated


# Return list of all tables in the db
def get_tables_in_db():
    return insp.get_table_names()


def get_columns(self, table_name, schema=None, **kw):
    with self._operation_context() as conn:
        col_defs = self.dialect.get_columns(
            conn, table_name, schema, info_cache=self.info_cache, **kw
        )
    return col_defs


# Return column metadata associated with a table
def get_metadata(table):
    metadata = get_columns(insp, table)
    # Making the column objects json serializable
    for col in metadata:
        col["type"] = str(col["type"])
        col["value"] = "" if col["default"] is None else col["default"]
    return metadata


# Choose the correct driver
def pick_db_driver(db_type):
    if db_type == "mysql":
        return "mysql+pymysql"


# Establish connection:
def establish_connection(username, password, url, port, db_name, db_type):
    global engine, session, insp
    db_driver = pick_db_driver(db_type)
    engine = create_engine(
        "{0}://{1}:{2}@{3}:{4}/{5}".format(
            db_driver, username, password, url, port, db_name
        )
    )
    session = Session(engine)
    insp = inspect(engine)
    return True

    # Create classes that map to the tables
    # This only works for tables that have a primary key
    # Base.prepare(engine, reflect=True)
    # Test
    # Sample is the name of a table in the db with columns "name" and "age"
    # smp = Base.classes.sample
    # Print all rows in sample
    # temp = session.query(smp).all()
    # for t in temp:
    # print(t.name, t.age)


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    username = os.getenv("LOGIN_USERNAME")
    password = os.getenv("LOGIN_PASSWORD")

    if username is None or password is None or app.config["SECRET_KEY"] is None:
        print("ERROR: Environment variables are improperly configured")
        return {"error": "Credentials are not configured in the server"}, 500

    data = request.get_json()
    username_candidate = data["username"]
    password_candidate = data["password"]

    if username_candidate == username and password_candidate == password:
        token = jwt.encode(
            {
                "username": username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        return {"token": token}
    else:
        return {"error": "Incorrect username or password"}, 500


@app.route("/config", methods=["POST"])
@cross_origin()
@token_required
def db_config():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    url = data.get("url")
    port = data.get("port")
    db_name = data.get("db_name")
    db_type = data.get("db_type")

    # Bad request
    if None in [username, password, url, port, db_name, db_type]:
        return {"error": "All required values not specified"}, 400

    # Internal server error
    if not establish_connection(username, password, url, port, db_name, db_type):
        return {"error": "Failed to establish connection with the DB"}, 500

    # On successful connection, return list of tables in the DB
    tables = get_tables_in_db()
    return {"tables": tables}, 200


@app.route("/tables", methods=["GET"])
@cross_origin()
@token_required
def get_tables():
    return {"tables": get_tables_in_db()}, 200


@app.route("/meta", methods=["POST"])
@cross_origin()
@token_required
def get_table_metadata():
    data = request.get_json()
    table = data.get("table")
    if table not in get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    return {"metadata": get_metadata(table)}, 200


@app.route("/read", methods=["POST"])
@cross_origin()
@token_required
def read_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    # Get all rows from table
    current_table = Table(table, MetaData(), autoload_with=engine)
    data = session.query(current_table).all()
    metadata = get_metadata(table)
    result = []
    for row in data:
        result.append(list(row))
    return {"metadata": metadata, "rows": result}, 200


@app.route("/create", methods=["POST"])
@cross_origin()
@token_required
def create_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    row = data.get("row")
    current_table = Table(table, MetaData(), autoload_with=engine)
    try:
        engine.execute(current_table.insert(), row)
        session.commit()
        return {"message": "Successfully Created"}, 200
    except exc.IntegrityError:
        return {"error": "Integrity Error"}, 400


@app.route("/update", methods=["POST"])
@cross_origin()
@token_required
def update_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    row = data.get("row")
    old_row = data.get("old_row")
    current_table = Table(table, MetaData(), autoload_with=engine)
    try:
        session.query(current_table).filter_by(**old_row).update(row)
        session.commit()
        return {"message": "Successfully Updated"}, 200
    except exc.IntegrityError:
        return {"error": "Integrity Error"}, 400


@app.route("/delete", methods=["POST"])
@cross_origin()
@token_required
def delete_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    # Delete metadata here
    return {"message": "Successfully Deleted"}, 200


if __name__ == "__main__":
    app.run(debug=True)
