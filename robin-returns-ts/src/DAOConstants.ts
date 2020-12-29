import { v4 as uuidv4 } from "uuid";

const CLIENT_ID = "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";
const uuid = uuidv4();

export type RobinhoodURL = string;

export type RobinhoodBaseToken = string;
export type RobinhoodBearerToken = string;

interface BaseHeader {
  "Accept-Language": "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5,";
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8,";
  "Cache-Control": "no-cache";
  Accept: "*/*";
}

interface HeaderWithToken extends BaseHeader {
  // TODO kedar: See if I even need the accept:
  Authorization: RobinhoodBearerToken;
}

interface AuthHeader extends BaseHeader {
  "X-Robinhood-API-Version": "1.0.0";
}

export interface AuthPayload {
  headers: AuthHeader;
  client_id: string;
  device_token: string;
  grant_type: "password";
  expires_in: 734000;
  scope: "internal";
  challenge_type: "email";
}

export interface AuthPayloadWithCredentials extends AuthPayload {
  password: string;
  username: string;
}

const BASE_HEADER: BaseHeader = {
  Accept: "*/*",
  "Accept-Language":
    "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5,",
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8,",
  "Cache-Control": "no-cache",
};

const AUTH_HEADER: AuthHeader = {
  ...BASE_HEADER,
  "X-Robinhood-API-Version": "1.0.0",
};

const HEADERS_WITH_TOKEN: HeaderWithToken = {
  ...BASE_HEADER,
  Accept: "*/*",
  Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
};

export function buildHeaders(token: string): { headers: HeaderWithToken } {
  return {
    headers: {
      ...BASE_HEADER,
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
}

export const AXIOS_HEADERS: { headers: HeaderWithToken } = {
  headers: HEADERS_WITH_TOKEN,
};

export const BASE_AUTH_PAYLOAD: AuthPayload = {
  headers: AUTH_HEADER,
  client_id: CLIENT_ID,
  device_token: uuid,
  grant_type: "password",
  expires_in: 734000,
  scope: "internal",
  challenge_type: "email",
};
