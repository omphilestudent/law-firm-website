import jwt from 'jsonwebtoken';

const ACCESS_EXPIRES_IN = process.env.ACCESS_TOKEN_TTL || '1d';
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_TTL || '7d';

export function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

export function signRefreshToken(payload) {
  return jwt.sign({ ...payload, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
