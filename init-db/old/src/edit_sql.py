import os


def write_sql_header(filepath: str, table_name: str, headers: list[str]) -> None:
    # write the header for an sql file
    with open(filepath, "w") as outfile:
        outfile.write(f"INSERT INTO {table_name} ({','.join(headers)})\nVALUES\n")


def write_sql_entry(filepath: str, entry: list) -> None:
    # write an entry in the sql file
    with open(filepath, "a") as outfile:
        # format for strings to be in quote otherwise not
        formated_entry = map(
            lambda x: f"{x}" if (type(x) is int or type(x) is float) else f"'{x}'",
            entry,
        )

        # write to file
        outfile.write(f"\t({','.join(formated_entry)}),\n")


def bulk_write_sql_entries(filepath: str, entries: list[list]) -> None:
    # write entries in the sql file
    with open(filepath, "a") as outfile:
        # format for strings to be in quote otherwise not
        for entry in entries:
            formated_entry = map(
                lambda x: f"{x}" if (type(x) is int or type(x) is float) else f"'{x}'",
                entry,
            )

            # write to file
            outfile.write(f"\t({','.join(formated_entry)}),\n")


def end_sql_file(filepath: str) -> None:
    # write the semicolon in the sql file
    with open(filepath, "rb+") as outfile:
        # remove the comma and newline
        outfile.seek(-2, os.SEEK_END)
        outfile.truncate()

    with open(filepath, "a") as outfile:
        # write the last semicolon
        outfile.write(";\n")
