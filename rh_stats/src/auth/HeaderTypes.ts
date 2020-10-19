interface BaseHeader {
  "Cache-Control": "no-cache";
  Accept: "*/*";
  "Accept-Language": "en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5";
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8";
}

interface AuthHeader {
  Authorization: string;
}

type AuthWithBaseHeader = AuthHeader & BaseHeader;

interface BaseRequestBody {
  grant_type: "password";
  client_id: "c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS";
  expires_in: string;
  scope: string;
  device_token: string;
}

interface RequestBody extends BaseRequestBody {
  username: string;
  password: string;
  challenge_type?: string;
}

type FullRequestBody = RequestBody & { headers: BaseHeader };

interface FullHeader extends AuthWithBaseHeader, RequestBody {}

// TODO kedar:
interface OAuthResponse {}
