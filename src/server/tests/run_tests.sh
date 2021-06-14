#!/bin/bash
# POSTGRES
eval `pifpaf run postgresql`
# Run the tests
cd ../
python3 -m tests.test
python3 -m tests.test_login
python3 -m tests.test_config
# Stop pifpaf
pifpaf_stop
# MYSQL
# Run the tests
# Stop pifpaf