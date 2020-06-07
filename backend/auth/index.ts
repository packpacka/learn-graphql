import { sign, verify } from 'jsonwebtoken';
import { Response, RequestHandler } from 'express';

const ACCESS_TOKEN_SECRET = 'supersecretkeyaccess';
const REFRESH_TOKEN_SECRET = 'supersecretkeyrefresh';
const ACCESS_TOKEN_COOKIE = 'access-token';
const REFRESH_TOKEN_COOKIE = 'refresh-token';

export type AuthData = { userId: string; login: string };

export const authenticate = (data: AuthData, res: Response) => {
  const accessToken = sign(data, ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });
  const refreshToken = sign(data, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  res.cookie(ACCESS_TOKEN_COOKIE, accessToken, { httpOnly: true, maxAge: 60 * 15 * 1000 });
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

export const authMiddleware = (): RequestHandler => (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE];
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  if (!accessToken && !refreshToken) {
    next();
  return;
  }

  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as AuthData;
    (req as any).authData = data; //todo: разобраться, почему ts-node не подхватывает расщирение типов (vscode ок)
  } catch {
    if (!refreshToken) {
      next();
      return;
    }
    try {
      const data = verify(refreshToken, REFRESH_TOKEN_SECRET) as AuthData;
      authenticate(data, res);
      (req as any).authData = data;
    } catch {}
  }
  next();
};
