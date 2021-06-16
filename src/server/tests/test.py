import datetime
import json
import unittest
import os
import sys
import jwt
import sqlalchemy
from sqlalchemy.inspection import inspect
from sqlalchemy.orm.session import Session

# Allow importing from one directory up
sys.path.append(os.path.abspath(".."))

from app import app  # noqa


class TestDB(unittest.TestCase):
    def add_data(self):
        session.execute("insert into books values(1, 'Sapiens', 'Harari', false);")
        session.execute("insert into books values(2, 'Meluha', 'Amish', true);")
        session.execute("insert into books values(3, 'Harry Potter', 'Rowling', true);")
        session.commit()

    def setUp(self):
        global engine
        global session
        global insp
        url = os.getenv("PIFPAF_POSTGRESQL_URL")
        if not url:
            self.skipTest("No database URL set")
        engine = sqlalchemy.create_engine(url)
        session = Session(engine)
        insp = inspect(engine)
        session.execute(
            "create table books(id int primary key, name varchar(20), author varchar(20), read boolean);"
        )
        session.commit()
        self.add_data()

    def tearDown(self):
        session.execute("drop table books;")
        session.commit()

    def test_foobar(self):
        self.assertTrue('books' in insp.get_table_names())

    # integration test for read and config handlers
    def test_read(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/read"
        mock_request_data = {"table": "books", "pageNum": "1"}
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    # integration test for meta and config handlers
    def test_meta(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/meta"
        mock_request_data = {"table": "books"}
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    # integration test for tables and config handlers
    def test_tables(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/tables"
        response = client.get(url, headers=mock_request_headers)
        assert response.status_code == 200

    # integration test for create and config handlers
    def test_create(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/create"
        mock_request_data = {
            "table": "books",
            "row": {
                "id": "4",
                "name": "The Famous Five",
                "author": "Enid Blyton",
                "read": True,
            },
        }
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    # integration test for delete and config handlers
    def test_delete(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/delete"
        mock_request_data = {"table": "books", "rows": [["2", "Meluha", "Amish", True]]}
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    # integration test for update and config handlers
    def test_update(self):
        client = app.test_client()
        config_url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        config_request_data = {
            "username": "admin",
            "password": "password",
            "url": "localhost",
            "port": 5432,
            "db_name": "test",
            "db_type": "postgres",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        client.post(
            config_url,
            data=json.dumps(config_request_data),
            headers=mock_request_headers,
        )

        url = "/update"
        mock_request_data = {
            "table": "books",
            "row": {"id": "2", "name": "Meluha", "author": "Amish", "read": True},
            "old_row": {
                "id": "5",
                "name": "Unknown",
                "author": "Macavity",
                "read": False,
            },
        }
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200


if __name__ == "__main__":
    unittest.main()
