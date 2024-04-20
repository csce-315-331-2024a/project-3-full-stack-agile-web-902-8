#!/usr/bin/bash
source venv/bin/activate
set -o allexport
source ../.env.local
set +o allexport
cat $( command ls sql/*.sql ) | PGPASSWORD=$DB_PASSWORD psql -U $DB_USERNAME -h $DB_HOST -d $DB_DATABASE
