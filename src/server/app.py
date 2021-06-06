from flask import Flask, request
from functools import wraps

# from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS
import logging

from dotenv import load_dotenv
import jwt
import os

# Init app
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
logging.getLogger("flask_cors").level = logging.DEBUG
app.config["CORS_HEADERS"] = "Content-Type"
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()


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


import read  # noqa
import update  # noqa
import create  # noqa
import config  # noqa
import meta  # noqa
import tables  # noqa
import delete  # noqa
import login  # noqa

if __name__ == "__main__":
    app.run(debug=True)
