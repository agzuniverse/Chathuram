from flask import Flask

from flask_cors import CORS
import logging

from dotenv import load_dotenv
import os
import sys

from handlers import handler

# Allow importing from this directory
# (Used for importing modules at this level in nested modules, like those in handlers/)
sys.path.append(os.path.abspath("."))

# Init app
app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
logging.getLogger("flask_cors").level = logging.DEBUG
app.config["CORS_HEADERS"] = "Content-Type"
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv()
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.register_blueprint(handler)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
