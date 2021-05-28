from __main__ import app, token_required
import db
from flask import request
from sqlalchemy import Table, MetaData
from sqlalchemy.exc import OperationalError, DataError
from flask_cors import cross_origin


@app.route("/create", methods=["POST"])
@cross_origin()
@token_required
def create_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    row = data.get("row")
    db.clean_data(row, table)
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    try:
        db.engine.execute(current_table.insert(), row)
        db.session.commit()
        return {"message": "Successfully Created"}, 200
    except (OperationalError, DataError) as e:
        return {"error": "Failed to create row, {0}".format(e.orig)}, 400
