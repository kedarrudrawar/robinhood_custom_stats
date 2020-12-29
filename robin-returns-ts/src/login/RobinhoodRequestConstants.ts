import { AuthPayloadWithCredentials } from "DAOConstants";

export interface InitialLoginRequest extends AuthPayloadWithCredentials {}

export interface MFALoginRequest extends AuthPayloadWithCredentials {
  mfa_code: number;
}
