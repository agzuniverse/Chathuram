from __main__ import app, token_required
from flask import request
import db
from sqlalchemy import Table, MetaData
from sqlalchemy.exc import OperationalError, DataError
from flask_cors import cross_origin


@app.route("/update", methods=["POST"])
@cross_origin()
@token_required
def update_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    row = data.get("row")
    old_row = data.get("old_row")
    db.clean_data(row, table)
    db.clean_data(old_row, table)
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    try:
        db.session.query(current_table).filter_by(**old_row).update(row)
        db.session.commit()
        return {"message": "Successfully Updated"}, 200
    except (DataError, OperationalError) as e:
        return {"error": "Failed to update table, {0}".format(e.orig)}, 400
