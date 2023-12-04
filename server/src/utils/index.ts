import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
export function HashPassword(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

/**
 * Compares a password with its hash value.
 * @param password - The password to compare.
 * @param hash - The hash value to compare against.
 * @returns True if the password matches the hash value, false otherwise.
 */
export function ComparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
