#!/bin/bash

# POSTGRES
eval `pifpaf run postgresql`

# Run the tests
cd ../..
python3 -m server.tests.test

# Stop pifpaf
pifpaf_stop

# MYSQL

# Run the tests

# Stop pifpaf


