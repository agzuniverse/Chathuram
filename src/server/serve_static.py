import os
from __main__ import (
    app,
)
from flask import send_from_directory
import mimetypes

# Default mimetypes may be wrong, resulting in browsers refusing to parse js
# and css files. Explicitly setting the mimetypes here to avoid this.
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/javascript", ".js")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
