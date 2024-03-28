
/**
 * The database representation for a password, made up of the
 * concatenation of the hash of the salted password and the salt itself.
 * Encoded base64.
 */
type THashPhrase = string;

const hashSize: 32 | 64 = 32;

/**
 * Generates the hashphrase for the password str.
 */
async function hash(str: string): Promise<THashPhrase> {
    // convert str to utf-8 bytes
    const u8 = new TextEncoder().encode(str);
    const len = u8.length;

    // produce secure random salt
    const salt = new Uint8Array(hashSize);
    crypto.getRandomValues(salt);

    // form salted = concat u8 salt
    const salted = new Uint8Array(len + hashSize);
    salted.set(u8);
    salted.set(salt, len);

    // compute the hash of salted
    const digest = new Uint8Array(await crypto.subtle.digest(`SHA-${hashSize*8}`, salted));

    // produce HashPhrase by concat digest salt
    const full = new Uint8Array(2*hashSize);
    full.set(digest);
    full.set(salt, hashSize);

    // convert result to base64
    const res = Buffer.from(full).toString("base64");
    return res;
}

/**
 * Verifies that a password str matches a hashphrase.
 */
async function verify(str: string, hashPhrase: THashPhrase): Promise<boolean> {
    // convert hash from base64 to binary
    const buf = new Uint8Array(Buffer.from(hashPhrase, "base64"));

    // split hashphrase into salt and hash
    const salt = buf.subarray(hashSize, 2*hashSize);
    const hashPart = buf.subarray(0, hashSize);

    // convert str to utf-8 bytes
    const u8 = new TextEncoder().encode(str);
    const len = u8.length;

    // form salted = concat u8 salt
    const salted = new Uint8Array(len + hashSize);
    salted.set(u8);
    salted.set(salt, len);

    // compute the hash of salted
    const digest = new Uint8Array(await crypto.subtle.digest(`SHA-${hashSize*8}`, salted));

    // compare that digest is equal to original hashpart
    return digest.every((v, i) => hashPart.at(i) === v);
}
