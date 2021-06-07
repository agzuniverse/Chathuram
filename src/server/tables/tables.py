from ..app.app import (
    app,
    token_required,
)
from ..db import db
from flask_cors import cross_origin


@app.route("/tables", methods=["GET"])
@cross_origin()
@token_required
def get_tables():
    return {"tables": db.get_tables_in_db()}, 200
