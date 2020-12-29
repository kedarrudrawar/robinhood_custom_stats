import { RobinhoodBaseToken } from "DAOConstants";

// Robinhood has two types of errors, and I'm not exactly sure which one is used when, so I'll handle both.
export interface ErrorWithDetail {
  detail: string;
}

export interface ErrorWithDescription {
  error: string;
  error_description: string;
}

export type RobinhoodError = ErrorWithDetail | ErrorWithDescription;

export interface MFARequiredResponse {
  mfa_required: true;
  mfa_type: "app";
}

export interface ChallengeRequiredResponse {
  // TODO kedar
}

export type InitialLoginResponse =
  | MFARequiredResponse
  | ChallengeRequiredResponse;

export interface MFALoginResponse {
  access_token: RobinhoodBaseToken;
  expires_in: number;
  token_type: "Bearer";
  scope: "internal";
  refresh_token: RobinhoodBaseToken;
  mfa_code: string;
  backup_code: string | null;
}
