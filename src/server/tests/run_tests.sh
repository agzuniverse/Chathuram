#!/bin/bash
# POSTGRES
eval `pifpaf run postgresql`
# Run the tests
cd ../
python3 -m tests.test -v
python3 -m tests.test_login -v
python3 -m tests.test_config -v
# Stop pifpaf
pifpaf_stop
# MYSQL
# Run the tests
# Stop pifpaf