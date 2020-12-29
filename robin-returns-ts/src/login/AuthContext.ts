import React from "react";

export interface AuthContextType {
  username: string;
  password: string;
  isLoggedIn: boolean;
  token: null | string;
  updateCredentials: (username: string, password: string) => void;
  login: () => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  username: "",
  password: "",
  isLoggedIn: false,
  token: null,
  updateCredentials: (username: string, password: string) => {},
  login: () => null,
  logout: () => null,
});
