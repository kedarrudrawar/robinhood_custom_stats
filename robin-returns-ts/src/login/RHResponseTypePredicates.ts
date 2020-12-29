import {
  ErrorWithDetail,
  InitialLoginResponse,
  MFARequiredResponse,
  MFALoginResponse,
  ChallengeRequiredResponse,
  ErrorWithDescription,
  RobinhoodError,
} from "./RobinhoodResponseConstants";

export function isErrorDetail(data: any): data is ErrorWithDetail {
  return data.hasOwnProperty("detail");
}

export function isErrorWithDescription(
  data: any
): data is ErrorWithDescription {
  return (
    data.hasOwnProperty("error") && data.hasOwnProperty("error_description")
  );
}

export function isRobinhoodError(data: any): data is RobinhoodError {
  return isErrorDetail(data) || isErrorWithDescription(data);
}

export function isMFARequired(
  response: InitialLoginResponse
): response is MFARequiredResponse {
  return response.hasOwnProperty("mfa_required");
}

export function isChallengeRequired(
  response: InitialLoginResponse
): response is ChallengeRequiredResponse {
  return response.hasOwnProperty("");
}

export function isValidMFALoginResponse(data: any): data is MFALoginResponse {
  return data.hasOwnProperty("access_token");
}
