import * as authFixtures from "./authFixtures";
import * as api from "../api/api";

jest.mock("axios");

jest.mock("../api/api", () => ({
  oauth2: jest.fn(),
  oauth2ChallengeTypeInput: jest.fn(),
  oauth2Challenge: jest.fn(),
}));

describe("oauth2 challenge", () => {
  it("should get a challenge prompt response with allowed challenge types", () => {
    api.oauth2.mockImplementation(
      (username, password) => authFixtures.challenge_response
    );
    let received = api.oauth2("username", "password");
    expect("Request blocked, challenge type required.").toEqual(
      received.detail
    );
  });

  it("should prompt challenge with id and type", () => {
    api.oauth2ChallengeTypeInput.mockImplementation(
      (username, password, type) => authFixtures.challenge_issued_response(type)
    );
    let received = api.oauth2ChallengeTypeInput("testUser", "testPass", "sms");
    expect("Request blocked, challenge issued.").toEqual(received.detail);
    expect("sms").toEqual(received.type);
  });

  // it('should accept challenge ID from ')
});

describe("oauth2 login", () => {});

describe("oauth2 mfa", () => {});
