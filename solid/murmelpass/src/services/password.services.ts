import { generateSHAKE128Hash } from "./cryptography";

export const generatePasswordHash = async (
  password: string,
  salt: string,
  length: number,
  iterations: number
) => {
  // Set initial value of hash
  let hash = password + salt;

  // Iterate as many times as requested and rehash previous result
  for (let i = 1; i < iterations; i++) {
    hash = generateSHAKE128Hash(hash);
  }

  // Slice for correct length
  hash = hash.slice(0, length);

  return hash;
};
