import { v4 as uuidv4 } from "uuid";

const CLIENT_ID = "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";
const uuid = uuidv4();

interface Header {
  "Accept-Language": string;
  "Content-Type": string;
  "Cache-Control": "no-cache";
  Accept: "*/*";
  Authorization: string;
}

export const HEADERS: Header = {
  "Accept-Language":
    "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5,",
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8,",
  "Cache-Control": "no-cache",
  Accept: "*/*",
  Authorization: `Bearer ${process.env.REACT_APP_BEARER}`,
};
