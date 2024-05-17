#!/bin/sh



cassandra-migrate -H cassandra -p 9042 -c db_config.yml migrate

tail -f /dev/null
# socat tcp-l:1337,reuseaddr,fork,keepalive exec:"python migrate.py",stderr