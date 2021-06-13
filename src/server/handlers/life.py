from utils import token_required
import db
from flask_cors import cross_origin
from . import handler


@handler.route("/life", methods=["GET"])
@cross_origin()
@token_required
def check_db_connection():
    if db.insp is None or db.engine is None or db.session is None:
        return {"error": "Failed to establish connection with the DB"}, 500
    return {"success": "Server is connected to the DB"}
