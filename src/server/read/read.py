from ..app.app import (
    app,
    token_required,
)
from ..db import db
from flask import request
from sqlalchemy import Table, MetaData
from flask_cors import cross_origin


@app.route("/read", methods=["POST"])
@cross_origin()
@token_required
def read_table_data():
    data = request.get_json()
    table = data.get("table")
    per_page = 100
    page_num = int(data.get("pageNum"))
    page_num = (page_num - 1) * per_page
    if table not in db.get_tables_in_db():
        return {"error": "Table does not exist"}, 400
    # Get all rows from table
    current_table = Table(table, MetaData(), autoload_with=db.engine)
    size = db.session.query(current_table).count()
    if size % per_page == 0:
        pages = size // per_page
    else:
        pages = size // per_page + 1
    data = db.session.query(current_table).all()[page_num : page_num + per_page]
    metadata = db.get_metadata(table)
    result = []
    for row in data:
        # Convert everything to string to avoid JSON serialization issues
        result.append([str(x) for x in list(row)])
    return {"metadata": metadata, "rows": result, "pages": pages}, 200
