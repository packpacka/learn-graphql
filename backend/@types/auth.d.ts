declare namespace Express {
  export type AuthData = { userId: string; login: string };

  export interface Request {
    authData?: AuthData;
  }
}
