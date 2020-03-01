#!/bin/sh

set -e

mkdir -p ~/.ssh
rm -f ~/.ssh/known_hosts
ssh-keyscan -t rsa 111.229.3.72 >> ~/.ssh/known_hosts