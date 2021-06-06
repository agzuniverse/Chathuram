from __main__ import app, token_required
from flask import request
import db
from sqlalchemy import Table, MetaData
from flask_cors import cross_origin
from sqlalchemy.exc import OperationalError, IntegrityError


@app.route("/delete", methods=["POST"])
@cross_origin()
@token_required
def delete_table_data():
    data = request.get_json()
    table = data.get("table")
    rows = data.get("rows")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    column_names = current_table.c.keys()

    for row in rows:
        row_to_be_deleted = {}
        for idx in range(len(column_names)):
            row_to_be_deleted[column_names[idx]] = row[idx]
        try:
            db.session.query(current_table).filter_by(**row_to_be_deleted).delete()
            db.session.commit()
        except (OperationalError, IntegrityError) as e:
            return {"error": "Failed to delete rows, {0}".format(e.orig)}, 400
    return {"message": "Successfully Deleted"}, 200


@app.route("/delete_all", methods=["POST"])
@cross_origin()
@token_required
def delete_all_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    try:
        db.session.execute(current_table.delete())
        db.session.commit()
    except (OperationalError, IntegrityError) as e:
        return {"error": "Failed to delete table, {0}".format(e.orig)}, 400
    return {"message": "Successfully Deleted All Rows"}, 200
