#!/bin/bash

# POSTGRES
eval `pifpaf run postgresql`

# Run the tests
python3 test.py

# Stop pifpaf
pifpaf_stop

# MYSQL

# Run the tests

# Stop pifpaf


