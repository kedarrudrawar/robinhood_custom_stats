import * as urls from "../api/endpoints";
import axios from "axios";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";

const CLIENT_ID = "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";

export let BASE_HEADERS: BaseHeader = {
  "Cache-Control": "no-cache",
  Accept: "*/*",
  "Accept-Language": "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5",
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
};

export function buildHeaders(
  authHeader: AuthHeader
): { headers: AuthWithBaseHeader } {
  return { headers: { ...BASE_HEADERS, ...authHeader } };
}

export const BODY: BaseRequestBody = {
  grant_type: "password",
  client_id: CLIENT_ID,
  expires_in: "86400",
  scope: "internal",
  device_token: uuidv4(),
};

export async function oauth2(
  username: string,
  password: string,
  challenge_type = ""
) {
  let payload: FullRequestBody = {
    headers: BASE_HEADERS,
    ...BODY,
    username,
    password,
  };
  //   payload["username"] = username;
  //   payload["password"] = password;
  if (challenge_type) payload["challenge_type"] = challenge_type;

  try {
    const response = await axios.post<any, OAuthResponse>(urls.OAUTH2, payload);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export function isMFA(responseData) {
  return "mfa_required" in responseData;
}

export function isChallenge(responseData) {
  return "accept_challenge_types" in responseData;
}

export function getMFA() {}

export function getChallenge() {}

// ----------------- MFA ------------------

export async function oauth2_MFA(username, password, mfa_code) {
  let BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME;
  let payload = {
    headers: BASE_HEADERS,
  };
  Object.assign(payload, BODY);
  payload["username"] = username;
  payload["password"] = password;
  payload["mfa_code"] = mfa_code;

  try {
    const response = await axios.post(urls.OAUTH2, payload);
    let data = response.data;
    BEARER_TOKEN = data["access_token"];
    REFRESH_TOKEN = data["refresh_token"];
    EXPIRY_TIME = new Date().getTime() / 1000 + data["expires_in"];
    return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
  } catch (err) {
    console.log(err);
  }
}

// ----------------- Challenge ------------------

export async function oauth2Challenge(
  username,
  password,
  challenge_type,
  challenge_id
) {
  let headers = {
    headers: {
      ...BASE_HEADERS,
      "x-robinhood-challenge-response-id": challenge_id,
    },
  };
  let payload = { ...BODY };
  payload["username"] = username;
  payload["password"] = password;
  payload["challenge_type"] = challenge_type;

  try {
    const response = await axios.post(
      urls.OAUTH2,
      qs.stringify(payload),
      headers
    );
    let data = response.data;
    let BEARER_TOKEN = data["access_token"];
    let REFRESH_TOKEN = data["refresh_token"];
    let EXPIRY_TIME = new Date().getTime() / 1000 + data["expires_in"];
    return [BEARER_TOKEN, REFRESH_TOKEN, EXPIRY_TIME];
  } catch (err) {
    console.log(err);
    alert("Invalid code. Please go back and try again.");
  }
}

export async function respondToChallenge(
  username,
  password,
  challenge_id,
  challengeCode
) {
  let payload = {
    headers: BASE_HEADERS,
  };
  let url = urls.build_challenge(challenge_id);
  Object.assign(payload, BODY);
  payload["username"] = username;
  payload["password"] = password;
  payload["response"] = challengeCode;
  try {
    const response = await axios.post(url, payload);
    let data = response.data;
    let status = data["status"];
    if (status === "validated") return true;
    return false;
  } catch (err) {
    console.log("Failed Challenge Request");
    console.log(err);
  }
}

export async function oauth2ChallengeTypeInput(
  username,
  password,
  challenge_type
) {
  let payload = {
    headers: BASE_HEADERS,
  };
  Object.assign(payload, BODY);
  payload["username"] = username;
  payload["password"] = password;
  payload["challenge_type"] = challenge_type;

  try {
    let response = await axios.post(urls.OAUTH2, payload);
    let data = response.data;
    return data.challenge.id;
  } catch (err) {
    let data = err.response.data;
    return data.challenge.id;
  }
}
