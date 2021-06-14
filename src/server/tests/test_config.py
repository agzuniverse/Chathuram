import sys
import os
import json
import unittest
import jwt
import datetime

# Allow importing from one directory up
sys.path.append(os.path.abspath(".."))

from app import app  # noqa


class TestConfig(unittest.TestCase):
    def test_config_route__success(self):
        client = app.test_client()
        url = "/config"

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
            "port": 3306,
            "db_name": "test",
            "db_type": "mysql",
        }

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    def test_config_route__failure__unauthorized(self):
        client = app.test_client()
        url = "/config"

        mock_request_data = {"username": "user", "password": "pass"}

        mock_request_headers = {"Content-Type": "application/json"}

        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 401

    def test_config_route__failure__bad_request(self):
        client = app.test_client()
        url = "/config"

        token = jwt.encode(
            {
                "username": "user",
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=180),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        mock_request_data = {"username": "user"}

        mock_request_headers = {
            "Content-Type": "application/json",
            "x-access-token": token,
        }

        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 400


if __name__ == "__main__":
    unittest.main()
