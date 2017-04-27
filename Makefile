# System binaries
SYSTEM_PIP=$(shell which pip3)
SYSTEM_PYTHON=$(shell which python3)
SYSTEM_VIRTUALENV=$(shell which virtualenv)

# Project binaries
PYLINT=$(ENV_DIR)/bin/pylint
PYTHON=$(ENV_DIR)/bin/python3
PIP=$(ENV_DIR)/bin/pip3

# Directories
LIB_DIR=./lib
TEST_DIR=./test
SRC_DIR=./src
ENV_DIR=$(LIB_DIR)/env

# Flags
TEST_FILES=test_*.py
TEST_RUNNER=$(PYTHON) -m unittest
REQUIREMENTS=$(LIB_DIR)/requirements.txt
MODULES=$(SRC_DIR):$(TEST_DIR)

# Environment variables
export PYTHONPATH=$(MODULES)
export PYTHONDONTWRITEBYTECODE=true

install: pip-install
test: unit-test

virtualenv-install:
	$(SYSTEM_PIP) install virtualenv
	$(SYSTEM_VIRTUALENV) -p $(SYSTEM_PYTHON) --no-site-packages $(ENV_DIR)

pip-install: virtualenv-install
	@$(PIP) install -r $(REQUIREMENTS)

unit-test:
	@$(TEST_RUNNER) discover -s $(TEST_DIR) -p $(TEST_FILES)

.PHONY: test install
