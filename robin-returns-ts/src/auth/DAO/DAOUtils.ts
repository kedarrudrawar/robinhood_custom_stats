import { AuthPayloadWithCredentials, BASE_AUTH_PAYLOAD } from "DAOConstants";

export function buildAuthPayload(
  username: string,
  password: string
): AuthPayloadWithCredentials {
  return {
    ...BASE_AUTH_PAYLOAD,
    username,
    password,
  };
}
