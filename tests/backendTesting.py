import unittest
import unittest.mock as mock
from unittest.mock import patch

from app import getallUser, Allusers

class DBTests(unittest.TestCase):
    def setUp(self):
        self.initial_db_mock = [Allusers(1, "test@gmail.com", True, None)]
    def test_get_user(self):
        with patch("app.Allusers.query") as mock_query:
            mock_query.all.return_value = self.initial_db_mock
            users = getallUser()
            self.assertEqual(users, ([1, 'test@gmail.com', True, None]))
    