#!/usr/bin/bash
# All of these are chained on purpose
# We should only proceed if we can use a venv
python3 -m venv venv && \
source venv/bin/activate && \
# We do not want to install into system
python -m pip install -r pyreqs.txt && \
# Run legacy scripts
(
    builtin cd old/src && \
    mkdir -p ../output && \
    python script.py && \
    python convert_csv_to_sql.py menu_items ../input/insert_values/menu_items.csv ../output/menu_items.sql && \
    printf "\n\nALTER SEQUENCE menu_items_id_seq RESTART WITH $(wc -l < ../input/insert_values/menu_items.csv);" >> ../output/menu_items.sql
) && \
# Run New scripts
(
    builtin cd src/ && \
    mkdir -p ../output && \
    python main.py
)
