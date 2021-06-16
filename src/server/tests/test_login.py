import os
import sys
import json
import unittest

from dotenv import load_dotenv

# Allow importing from one directory up
sys.path.append(os.path.abspath(".."))

from app import app  # noqa


class TestLogin(unittest.TestCase):
    def test_login_route__success(self):
        client = app.test_client()
        url = "/login"
        load_dotenv(dotenv_path="../.env")
        mock_request_data = {
            "username": os.getenv("LOGIN_USERNAME"),
            "password": os.getenv("LOGIN_PASSWORD"),
        }

        mock_request_headers = {"Content-Type": "application/json"}

        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 200

    def test_login_route__failure__bad_request(self):
        client = app.test_client()
        url = "/login"

        mock_request_data = {
            "username": "incorrect_username",
            "password": "wrong_password",
        }

        mock_request_headers = {"Content-Type": "application/json"}

        response = client.post(
            url, data=json.dumps(mock_request_data), headers=mock_request_headers
        )
        assert response.status_code == 400


if __name__ == "__main__":
    unittest.main()
