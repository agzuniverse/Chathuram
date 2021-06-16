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
        print(insp.get_table_names())
        print(engine, session)
        self.assertTrue(insp.get_table_names())

    # integration test for config and read handlers
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

        mock_request_data = {
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
            config_url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )

        url = "/read"
        mock_request_data = {"table": "books", "pageNum": "1"}
        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200


if __name__ == "__main__":
    unittest.main()
