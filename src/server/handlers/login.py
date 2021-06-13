from flask import request, current_app
from flask_cors import cross_origin
import os
import jwt
import datetime
from . import handler


@handler.route("/login", methods=["POST"])
@cross_origin()
def login():
    username = os.getenv("LOGIN_USERNAME")
    password = os.getenv("LOGIN_PASSWORD")

    if username is None or password is None or current_app.config["SECRET_KEY"] is None:
        print("ERROR: Environment variables are improperly configured")
        return {"error": "Credentials are not configured in the server"}, 500

    data = request.get_json()
    username_candidate = data.get("username")
    password_candidate = data.get("password")

    if username_candidate == username and password_candidate == password:
        token = jwt.encode(
            {
                "username": username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            current_app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        return {"token": token}
    else:
        return {"error": "Incorrect username or password"}, 400
