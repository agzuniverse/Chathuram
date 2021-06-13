from utils import token_required
import db
from flask_cors import cross_origin
from . import handler


@handler.route("/tables", methods=["GET"])
@cross_origin()
@token_required
def get_tables():
    return {"tables": db.get_tables_in_db()}, 200
