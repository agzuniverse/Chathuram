from __main__ import (
    app,
    token_required,
)

import db
from flask import request
from flask_cors import cross_origin
from sqlalchemy.exc import OperationalError


@app.route("/config", methods=["POST"])
@cross_origin()
@token_required
def db_config():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    url = data.get("url")
    port = data.get("port")
    db_name = data.get("db_name")
    db_type = data.get("db_type")

    # Bad request
    if None in [username, password, url, port, db_name, db_type]:
        return {"error": "All required values not specified"}, 400

    # Possible errors
    try:
        db.establish_connection(username, password, url, port, db_name, db_type)
    except OperationalError as e:
        return {
            "error": "Failed to establish connection with the DB, {0}".format(e.orig)
        }, 500

    # On successful connection, return list of tables in the DB
    tables = db.get_tables_in_db()
    return {"tables": tables}, 200
