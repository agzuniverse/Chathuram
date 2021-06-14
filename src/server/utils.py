from flask import request
from functools import wraps
import os
import jwt


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
            data = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
            username = data["username"]
            if username != os.getenv("LOGIN_USERNAME"):
                return {"error": "Token is invalid!"}, 401
        except jwt.exceptions.InvalidSignatureError:
            return {"error": "Token is invalid!"}, 401
        except KeyError:
            return {"error": "Token is invalid!"}, 401
        return f(*args, **kwargs)

    return decorated
