import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Head } from "../misc/html_head";
import auth from "../../auth/auth";
import "../../UI/css/Login.css";
import * as api from "../../api/api";

export const ChallengeLogin = (props) => {
  const [challengeCode, setChallengeCode] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [challengeID, setChallengeID] = useState("");

  const changeChallenge = (e) => {
    setChallengeCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = await props.onSubmit(
      challengeID,
      challengeCode,
      challengeType
    );
    if (success) {
      props.history.push("/stats");
    } else {
      alert("Invalid code");
    }
  };

  // once type has been inputted, request with type to get challenge ID
  useEffect(() => {
    const inputChallengeType = async () => {
      if (challengeType) {
        let challenge_id = await api.oauth2ChallengeTypeInput(
          auth.username,
          auth.password,
          challengeType
        );
        console.log(challenge_id);
        setChallengeID(challenge_id);
      }
    };
    inputChallengeType();
  }, [challengeType]);

  if (challengeType) {
    return (
      <div>
        <Head />
        <div className="Page mfa">
          <div className="login-container mfa-container">
            <form onSubmit={handleSubmit}>
              <label className="small-title login-contents">
                Authentication Code
              </label>
              <input
                className="input-box input-text"
                id="challenge_code"
                type="text"
                value={challengeCode}
                onChange={changeChallenge}
              ></input>
              <button
                className="login-btn login-btn-text login-contents"
                type="submit"
              >
                Log in
              </button>
            </form>
            <div className="note">Check your SMS / email for 2-FA code</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Page gray-bg">
      <div className="login-container mfa-container" style={{ width: "420px" }}>
        <div
          className="large-title login-contents"
          style={{
            margin: "0 0 15px 0",
            // border: '1px blue solid',
          }}
        >
          Verify Your Identity
        </div>
        <div
          style={{
            fontSize: "13px",
            lineHeight: "19px",
            // border: '1px blue solid',
          }}
        >
          {" "}
          Robinhood is sending you a code to verify your login.
        </div>
        <div
          style={{
            fontSize: "13px",
            lineHeight: "19px",
          }}
        >
          {" "}
          Do you want Robinhood to text you the code or email it to you?
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // border: "1px red solid",
            // marginTop: '10px',
          }}
        >
          <button
            className="login-btn login-btn-text login-contents"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setChallengeType("sms");
            }}
          >
            Text
          </button>
          <button
            className="login-btn login-btn-text login-contents"
            style={{ marginRight: "10px" }}
            onClick={() => {
              setChallengeType("email");
            }}
          >
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChallengeLogin);
