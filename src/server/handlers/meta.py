from utils import token_required
import db
from flask import request
from flask_cors import cross_origin
from . import handler


@handler.route("/meta", methods=["POST"])
@cross_origin()
@token_required
def get_table_metadata():
    data = request.get_json()
    table = data.get("table")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    return {"metadata": db.get_metadata(table)}, 200
