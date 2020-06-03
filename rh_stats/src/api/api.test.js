import * as api from './api';

describe("login", () => {
    it('it should parse login response properly for mfa/challenge"', () => {
        let mfaResponse = {
            'mfa_required': true,
        };
        let challengeResponse = {
            'accept_challenge_types': {'sms': "SMS", 'email': "Email"}
        }

        expect(api.isMFA(mfaResponse)).toBeTruthy();
        expect(api.isMFA(challengeResponse)).toBeFalsy();
        expect(api.isChallenge(mfaResponse)).toBeFalsy();
        expect(api.isChallenge(challengeResponse)).toBeTruthy();
    })
})