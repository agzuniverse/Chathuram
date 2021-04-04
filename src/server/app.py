from flask import Flask, request, make_response

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from dotenv import load_dotenv
import jwt
import datetime
import os
import random

# Init app
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()

# Init database
engine = create_engine("mysql+pymysql://admin:password@127.0.0.1:3306/test")

# Use automap to read tables from the database
Base = automap_base()
# Create classes that map to the tables
# This only works for tables that have a primary key
Base.prepare(engine, reflect=True)

session = Session(engine)

# Print all tables in the db
print(engine.table_names())

# Sample is the name of a table in the db with columns "name" and "age"
smp = Base.classes.sample
# Print all rows in sample
temp = session.query(smp).all()
for t in temp:
    print(t.name, t.age)


@app.route("/login")
def login():
    data = request.authorization
    username_candidate = data.username
    password_candidate = data.password

    # Decrypt password here

    username = os.getenv("LOGIN_USERNAME")
    password = os.getenv("LOGIN_PASSWORD")

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
