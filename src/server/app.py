from flask import Flask, request, make_response

# from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask_cors import CORS, cross_origin
from sqlalchemy import create_engine, inspect

from dotenv import load_dotenv
import jwt
import datetime
import os
import random

# Init app
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()

# Init database
# engine = create_engine("mysql+pymysql://admin:password@127.0.0.1:3306/test")
engine = None
session = None
insp = None

# Use automap to read tables from the database - temperorily disabled
# Base = automap_base()


# Return list of all tables in the db
def get_tables_in_db():
    return engine.table_names()


# Return column metadata associated with a certain table
def get_metadata(table):
    return insp.get_columns(table)


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
    print(insp.get_table_names())
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
    data = request.get_json()
    username_candidate = data["username"]
    password_candidate = data["password"]

    # Decrypt password here

    username = os.getenv("LOGIN_USERNAME")
    password = os.getenv("LOGIN_PASSWORD")

    print(username, username_candidate, password, password_candidate)
    if username_candidate == username and password_candidate == password:
        token = jwt.encode(
            {
                "id": random.randint(0, 1000),
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            },
            app.config["SECRET_KEY"],
        )
        return {"token": token}
    else:
        return make_response(
            "Could not verify",
            401,
            {"WWW-authenticate": 'basic realm="Login Required"'},
        )


@app.route("/db-config", methods=["POST"])
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


@app.route("/meta", methods=["POST"])
def get_table_metadata():
    data = request.get_json()
    table = data.get("table")
    metadata = get_metadata(table)
    if metadata is None:
        return {"error": "Table does not exist"}, 400
    return {"metadata": metadata}, 200


@app.route("/data", methods=["GET"])
def get_bulk_data():
    return {"data": "BULK DATA"}


@app.route("/data/<id>", methods=["GET"])
def get_single_data(id):
    return {"data": id}


@app.route("/data", methods=["POST"])
def post_data():
    return {"data": "RECORD CREATED"}


@app.route("/data/<id>", methods=["PUT"])
def update_data(id):
    return {"data": "DATA UPDATED"}


@app.route("/data/<id>", methods=["DELETE"])
def delete_data(id):
    return {"data": "DATA DELETED"}


if __name__ == "__main__":
    app.run(debug=True)
