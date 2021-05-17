from __main__ import app, token_required
from flask import request
import db
from sqlalchemy import Table, MetaData
from flask_cors import cross_origin
from sqlalchemy.exc import OperationalError


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
    column_names = current_table.c.keys()
    row_to_be_deleted = {}
    for idx in range(len(column_names)):
        row_to_be_deleted[column_names[idx]] = row[idx]
    try:
        db.session.query(current_table).filter_by(**row_to_be_deleted).delete()
        db.session.commit()
    except OperationalError as e:
        return {"error": e.orig}, 400
    return {"message": "Successfully Deleted"}, 200
