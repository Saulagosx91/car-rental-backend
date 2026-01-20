import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export function createToken(payload: object) {
  const token = jwt.sign(
    payload,
    String(SECRET_KEY));

  return token;
}