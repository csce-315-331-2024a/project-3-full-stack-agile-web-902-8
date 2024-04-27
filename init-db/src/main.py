import hashlib
import os
import base64
import sys


def produce_hash(password: str) -> str:
    salt: bytes = os.urandom(256 // 8)
    hashable: bytes = password.encode("utf-8") + salt
    digest: bytes = hashlib.sha256(hashable).digest()
    hashed: bytes = digest + salt
    encoded: str = base64.b64encode(hashed).decode("ascii")
    return encoded


def get_file_hex(fname: str) -> str:
    with open(fname, 'rb') as f:
        return f.read().hex()


def write_menu_images():
    with open('../output/menu-images.sql', 'w') as sql_file:
        for image_file in os.listdir('../images'):
            sql_file.write(f"UPDATE menu_items SET image = decode('{get_file_hex('../images/'+image_file)}', 'hex') WHERE id = {image_file};\n")


def main() -> None:
    if (len(sys.argv) < 2):
        write_menu_images()
        return
    for v in sys.argv[1:]:
        print(produce_hash(v))


if __name__ == "__main__":
    main()
