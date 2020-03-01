#!/bin/sh
set -e
tar -czvf ./assets.tar.gz ./dist
scp -i ./id_rsa ./assets.tar.gz root@111.229.3.72:/home/webroot
ssh -i ./id_rsa root@111.229.3.72 'cd /home/webroot && tar -xzf assets.tar.gz && rm -f assets.tar.gz && docker restart zewail-nginx'
