#!/bin/bash

# Grab an argument or use the default version number
RELEASE_VERSION=${1:-1.0.0}

# Build our container
docker build --no-cache -t webapp:$RELEASE_VERSION -t webapp:latest .
