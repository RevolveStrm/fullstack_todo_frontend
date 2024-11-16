export type UserInfo = {
  id: string;
  email: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: UserInfo;
  tokens: Tokens;
};

export type Credentials = {
  email: string;
  password: string;
};
