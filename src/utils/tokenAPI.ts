import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_KEY;

export type TokenDecrypt = {
  id: number;
};

function generateToken(id: number) {
  return jwt.sign({ id }, secretKey);
}

async function decryptToken(token: string) {
  return jwt.verify(token, secretKey) as TokenDecrypt;
}

const tokenAPI = { generateToken, decryptToken };

export default tokenAPI;
