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


def main() -> None:
    for v in sys.argv[1:]:
        print(produce_hash(v))


if __name__ == "__main__":
    main()
