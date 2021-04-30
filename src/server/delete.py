from __main__ import app, token_required
from flask import request
import db
from sqlalchemy import Table, MetaData
from flask_cors import cross_origin


@app.route("/delete", methods=["POST"])
@cross_origin()
@token_required
def delete_table_data():
    data = request.get_json()
    table = data.get("table")
    row = data.get("row")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    try:
        db.session.query(current_table).filter_by(**row).delete()
        db.session.commit()
    except Exception as e:
        return {"message": e.__repr__()}, 400
    return {"message": "Successfully Deleted"}, 200
