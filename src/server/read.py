from __main__ import (
    app,
    token_required,
)
import db
from flask import request
from sqlalchemy import Table, MetaData
from flask_cors import cross_origin


@app.route("/read", methods=["POST"])
@cross_origin()
@token_required
def read_table_data():
    data = request.get_json()
    table = data.get("table")
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    # Get all rows from table
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    data = db.session.query(current_table).all()
    metadata = db.get_metadata(table)
    result = []
    for row in data:
        result.append(list(row))
    return {"metadata": metadata, "rows": result}, 200
