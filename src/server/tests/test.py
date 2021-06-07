import unittest
import os
import sqlalchemy
from sqlalchemy.inspection import inspect
from sqlalchemy.orm.session import Session
from ..db import engine, session, insp


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


if __name__ == "__main__":
    unittest.main()
