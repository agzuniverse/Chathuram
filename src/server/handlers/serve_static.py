import os
from flask import send_from_directory
import mimetypes
from . import handler


# Default mimetypes may be wrong, resulting in browsers refusing to parse js
# and css files. Explicitly setting the mimetypes here to avoid this.
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/javascript", ".js")


@handler.route("/", defaults={"path": ""})
@handler.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(handler.static_folder + "/" + path):
        return send_from_directory(handler.static_folder, path)
    else:
        return send_from_directory(handler.static_folder, "index.html")
