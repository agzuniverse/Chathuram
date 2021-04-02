from flask import Flask, make_response
from flask_mysqldb import MySQL
import jwt
import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = 'projectudap'

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'arun'
app.config['MYSQL_PASSWORD'] = 'pass'
app.config['MYSQL_DB'] = 'myflaskapp'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# init MYSQL
mysql = MySQL(app)


@app.route('/login', methods=['POST'])
def login(data):
    username = data.username
    password_candidate = data.password

    cur = mysql.connection.cursor()
    res = cur.execute("SELECT * FROM users WHERE username = %s", [username])

    if res > 0:
        data = cur.fetchone()
        password = data['password']

        #Decrypt password

        if password_candidate == password:
            token = jwt.encode({'id': data['id'], 'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=30)},
                               app.config['SECRET_KEY'])
            return {"token": token.decode('UTF-8')}
        else:
            return make_response('Could not verify', 401, {'WWW-authenticate': 'basic realm="Login Required"'})
    return make_response('Could not verify', 401, {'WWW-authenticate': 'basic realm="Login Required"'})

@app.route('/data', methods=['GET'])
def get_bulk_data():
    return {"data": "BULK DATA"}

@app.route('/data/<id>', methods=['GET'])
def get_single_data(id):
    return {"data": id}

@app.route('/data', methods=['POST'])
def post_data():
    return {"data": "RECORD CREATED"}

@app.route('/data/<id>', methods=['PUT'])
def update_data(id):
    return {"data": "DATA UPDATED"}

@app.route('/data/<id>', methods=['DELETE'])
def delete_data(id):
    return {"data": "DATA DELETED"}


if __name__ == '__main__':
    app.run(debug=True)
