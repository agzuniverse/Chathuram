from flask import Blueprint

handler = Blueprint("handler", __name__, static_folder="../fe")

from . import (  # noqa
    config,
    create,
    delete,
    life,
    login,
    meta,
    read,
    serve_static,
    tables,
    update,
)
