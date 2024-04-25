from sys import argv
from typing import TextIO
import csv
import re


def write_insert(sql, header: list[str], table_name: str):
    # write the main INSERT INTO statement ending with VALUES on a newline
    # exclude the id column if it exists
    #
    # Example:
    # INSERT INTO table_name (<header>)
    # VALUES

    sql.write(f"INSERT INTO {table_name} ({','.join(header)})\n")
    sql.write(f"VALUES\n")


def write_values(sql: TextIO, csv_file):
    # loop through the rows of csv file and write the row as a tuple
    # exclude the id column if it exists

    all_rows = []
    for row in csv_file:
        isfloat = lambda x: re.match(r"^-?\d+(?:\.\d+)$", x) is not None

        new_row = []
        for ele in row:
            if not (isfloat(ele) or ele.isnumeric() or ele == "NULL"):
                ele = f"'{ele}'"
            new_row.append(ele)

        all_rows.append(f"\t({','.join(new_row)})")

    sql.write(",\n".join(all_rows) + ";")


def main():
    # usage
    if len(argv) != 4:
        print(f"python {argv[0]} <table_name> <input_filepath> <output_filepath>")
        return

    # get values form usage
    table_name = argv[1]
    input_filepath = argv[2]
    output_filepath = argv[3]

    # read from input file
    infile = open(input_filepath, "r")
    csv_file = csv.reader(infile)

    # get the header from csv file as the attributes of the table
    header = next(csv_file)

    sql_file = open(output_filepath, "w")

    # write to the file
    write_insert(sql_file, header, table_name)
    write_values(sql_file, csv_file)

    sql_file.close()
    infile.close()


if __name__ == "__main__":
    main()
