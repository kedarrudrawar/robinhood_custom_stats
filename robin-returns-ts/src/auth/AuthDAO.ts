import axios, { AxiosResponse } from "axios";

import { OAUTH2_URL } from "./AuthURLs";
import {
  InitialLoginResponse,
  MFALoginResponse,
  RobinhoodError,
} from "./ServerResponseConstants";
import { InitialLoginRequest, MFALoginRequest } from "./ServerRequestConstants";
import { assert } from "util/assert";
import { isRobinhoodError } from "./ServerResponseTypePredicates";
import { buildAuthPayload } from "./DAO/DAOUtils";

async function attemptLogin<RequestPayloadType, ResponseType>({
  endpoint,
  payload,
  onReject,
}: {
  endpoint: string;
  payload: RequestPayloadType;
  onReject: (data: RobinhoodError) => void;
}): Promise<AxiosResponse<ResponseType> | null> {
  try {
    return await axios.post<ResponseType>(endpoint, payload);
  } catch (e) {
    assert(
      isRobinhoodError(e.response.data),
      `Error from login endpoint should be a RobinhoodError, was instead: ${e}`
    );
    onReject(e.response.data);
    return null;
  }
}

export async function attemptInitialLogin({
  username,
  password,
  onReject,
}: {
  username: string;
  password: string;
  onReject: (data: RobinhoodError) => void;
}): Promise<AxiosResponse<InitialLoginResponse | RobinhoodError> | null> {
  const payload = buildAuthPayload(username, password);

  return await attemptLogin<InitialLoginRequest, InitialLoginResponse>({
    endpoint: OAUTH2_URL,
    payload,
    onReject,
  });

  // return new Promise((resolve) =>
  //   resolve({
  //     data: {
  //       mfa_required: true,
  //       mfa_type: "app",
  //     },
  //     status: 200,
  //   } as AxiosResponse<MFARequiredResponse>)
  // );
}

export async function attemptMFALogin({
  username,
  password,
  MFACode,
  onReject,
}: {
  username: string;
  password: string;
  MFACode: string;
  onReject: (data: RobinhoodError) => void;
}): Promise<AxiosResponse<MFALoginResponse> | null> {
  const payload: MFALoginRequest = {
    ...buildAuthPayload(username, password),
    mfa_code: MFACode,
  };

  return await attemptLogin<MFALoginRequest, MFALoginResponse>({
    endpoint: OAUTH2_URL,
    payload,
    onReject,
  });

  // return new Promise((resolve) => {
  //   resolve({
  //     data: {
  //       access_token: "token here",
  //       expires_in: 257896,
  //       token_type: "Bearer",
  //       scope: "internal",
  //       refresh_token: "refresh token here",
  //       mfa_code: "976383",
  //       backup_code: null,
  //     },
  //     status: 200,
  //   } as AxiosResponse<MFALoginResponse>);
  // });
}
