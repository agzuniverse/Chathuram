from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/data", methods=["GET"])
def get_bulk_data():
    return jsonify({"data": "BULK DATA"})


@app.route("/data/<id>", methods=["GET"])
def get_single_data(id):
    return jsonify({"data": id})


@app.route("/data", methods=["POST"])
def post_data():
    return jsonify({"data": "RECORD CREATED"})


@app.route("/data/<id>", methods=["PUT"])
def update_data(id):
    return jsonify({"data": "DATA UPDATED"})


@app.route("/data/<id>", methods=["DELETE"])
def delete_data(id):
    return jsonify({"data": "DATA DELETED"})


if __name__ == "__main__":
    app.run(debug=True)
