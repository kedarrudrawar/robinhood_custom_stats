import * as authAPI from "../api/auth";

class Auth {
  constructor() {
    this.authenticated = true;
    this.username = "";
    this.password = "";
    this.bearer_token = "";
    this.refresh_token = "";
    this.expiry_time = "";
  }

  setCredentials(username, password) {
    this.username = username;
    this.password = password;
  }

  resetCredentials() {
    this.username = "";
    this.password = "";
  }

  resetAllCredentials() {
    this.username = "";
    this.password = "";
    this.bearer_token = "";
    this.refresh_token = "";
    this.expiry_time = "";
  }

  setChallengeID(challengeID) {
    this.challengeID = challengeID;
  }

  async initialLogin() {
    let data;
    try {
      data = await authAPI.oauth2(this.username, this.password);
      if (authAPI.isMFA(await data)) {
        return {
          isMFA: true,
          isChallenge: false,
        };
      } else if (authAPI.isChallenge(await data)) {
        return {
          isMFA: false,
          isChallenge: true,
        };
      }
      return {
        isMFA: false,
        isChallenge: false,
      };
    } catch (err) {
      alert("Invalid Credentials");
      return {
        isMFA: false,
        isChallenge: false,
      };
    }
  }

  async loginMFA(mfa_code) {
    try {
      let data = await authAPI.oauth2_MFA(
        this.username,
        this.password,
        mfa_code
      );
      let [bearer_token, refresh_token, expiry_time] = data;

      this.login(bearer_token, refresh_token, expiry_time);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async loginChallenge(challenge_id, challenge_code, challenge_type) {
    try {
      let success = await authAPI.respondToChallenge(
        this.username,
        this.password,
        challenge_id,
        challenge_code
      );
      if (success) {
        let data = await authAPI.oauth2Challenge(
          this.username,
          this.password,
          challenge_type,
          challenge_id
        );
        console.log(data);
        let [bearer_token, refresh_token, expiry_time] = data;

        this.login(bearer_token, refresh_token, expiry_time);
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  login(bearer_token, refresh_token, expiry_time) {
    this.resetCredentials();
    this.authenticated = true;

    this.bearer_token = bearer_token;
    this.refresh_token = refresh_token;
    this.expiry_time = expiry_time;
  }

  logout() {
    this.resetAllCredentials();
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
