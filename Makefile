# System binaries
SYSTEM_PIP=$(shell which pip3)
SYSTEM_PYTHON=$(shell which python3.6)
SYSTEM_VIRTUALENV=$(shell which virtualenv)

# Project binaries
PYLINT=$(ENV_DIR)/bin/pylint
PYTHON=$(ENV_DIR)/bin/python3
PIP=$(ENV_DIR)/bin/pip3
GUNICORN=$(ENV_DIR)/bin/gunicorn

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
GUNICORN_CONFIG=$(WEBSERVER_DIR)/gunicorn_config

# Environment variables
export PYTHONPATH=$(MODULES)
export PYTHONDONTWRITEBYTECODE=true

install: pip-install
test: unit-test
serve: flask
start: gunicorn

virtualenv-install:
ifndef SYSTEM_VIRTUALENV
	$(SYSTEM_PIP) install virtualenv
	$(SYSTEM_VIRTUALENV) -p $(SYSTEM_PYTHON) --no-site-packages $(ENV_DIR)
endif

pip-install: virtualenv-install
	@$(PIP) install -r $(REQUIREMENTS)

flask: export FLASK_APP=$(FLASK_SERVER)
flask: export FLASK_DEBUG=1
flask:
	@$(PYTHON) -m flask run --host 0.0.0.0 --port 5000

gunicorn:
	@$(GUNICORN) -c $(GUNICORN_CONFIG) webserver.server:app &

unit-test:
	@$(TEST_RUNNER) discover -s $(TEST_DIR) -p $(TEST_FILES)

.PHONY: test install
