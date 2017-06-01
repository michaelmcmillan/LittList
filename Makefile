# System binaries
SYSTEM_GIT=$(shell which git)
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
CONF_DIR=./config
WEBSERVER_DIR=$(SRC_DIR)/webserver
BIBLIOGRAPHY_DIR=$(SRC_DIR)/bibliography
CITEPROC_DIR=$(LIB_DIR)/citeproc-js
STYLES_DIR=$(BIBLIOGRAPHY_DIR)/styles
LOCALES_DIR=$(BIBLIOGRAPHY_DIR)/locales
MODULES=$(SRC_DIR):$(TEST_DIR):$(CONF_DIR)

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

install: pip-install clone-submodules
test: unit-test
serve: flask
start: gunicorn

virtualenv-install:
ifndef SYSTEM_VIRTUALENV
	$(SYSTEM_PIP) install virtualenv
endif
	$(SYSTEM_VIRTUALENV) -p $(SYSTEM_PYTHON) --no-site-packages $(ENV_DIR)

pip-install: virtualenv-install
	@$(PIP) install -r $(REQUIREMENTS)

clone-submodules: $(STYLES_DIR) $(LOCALES_DIR) $(CITEPROC_DIR)
	@$(SYSTEM_GIT) submodule update --init --recursive

flask: export FLASK_APP=$(FLASK_SERVER)
flask: export FLASK_DEBUG=1
flask:
	@$(PYTHON) -m flask run --host 0.0.0.0 --port 5000

gunicorn:
	@$(GUNICORN) -c $(GUNICORN_CONFIG) webserver.server:app &

unit-test:
	@$(TEST_RUNNER) discover -s $(TEST_DIR) -p $(TEST_FILES)

.PHONY: test install
