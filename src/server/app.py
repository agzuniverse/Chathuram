from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
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
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://" + os.path.join(basedir, "db.mysql")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


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
