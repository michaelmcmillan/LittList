# System binaries
SYSTEM_PIP=$(shell which pip3)
SYSTEM_PYTHON=$(shell which python3.6)
SYSTEM_VIRTUALENV=$(shell which virtualenv)

# Project binaries
PYLINT=$(ENV_DIR)/bin/pylint
PYTHON=$(ENV_DIR)/bin/python3
PIP=$(ENV_DIR)/bin/pip3
UWSGI=$(ENV_DIR)/bin/uwsgi 

# Directories
LIB_DIR=./lib
TEST_DIR=./test
SRC_DIR=./src
ENV_DIR=$(LIB_DIR)/env
WEBSERVER_DIR=$(SRC_DIR)/webserver
MODULES=$(SRC_DIR):$(TEST_DIR)

# Flags
TEST_RUNNER=$(PYTHON) -m unittest

# Files
TEST_FILES=test_*.py
FLASK_SERVER=$(WEBSERVER_DIR)/server.py
REQUIREMENTS=$(LIB_DIR)/requirements.txt
UWSGI_CONFIG=$(WEBSERVER_DIR)/uwsgi_config

# Environment variables
export PYTHONPATH=$(MODULES)
export PYTHONDONTWRITEBYTECODE=true

install: pip-install
test: unit-test
serve: flask
start: uwsgi

virtualenv-install:
	$(SYSTEM_PIP) install virtualenv
	$(SYSTEM_VIRTUALENV) -p $(SYSTEM_PYTHON) --no-site-packages $(ENV_DIR)

pip-install: virtualenv-install
	@$(PIP) install -r $(REQUIREMENTS)

flask: export FLASK_APP=$(FLASK_SERVER)
flask: export FLASK_DEBUG=1
flask:
	@$(PYTHON) -m flask run

uwsgi:
	@$(UWSGI) --ini $(UWSGI_CONFIG)

unit-test:
	@$(TEST_RUNNER) discover -s $(TEST_DIR) -p $(TEST_FILES)

.PHONY: test install
