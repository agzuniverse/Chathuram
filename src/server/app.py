from flask import Flask, request
from functools import wraps

# from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS
import logging

from dotenv import load_dotenv
import jwt
import os

# Init app
app = Flask(__name__, static_folder="fe")
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

from ..life import life  # noqa
from ..read import read  # noqa
from ..update import update  # noqa
from ..create import create  # noqa
from ..config import config  # noqa
from ..meta import meta  # noqa
from ..tables import tables  # noqa
from ..delete import delete  # noqa
from ..login import login  # noqa
from ..serve_static import serve_static  # noqa

for rule in app.url_map.iter_rules():
    print(rule.endpoint)
print(app.url_map)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
