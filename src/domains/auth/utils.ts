import { JWT } from 'next-auth/jwt';
import { refreshToken } from './services';

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const refreshedTokensResponse = await refreshToken(token.refreshToken);

    return {
      ...token,
      accessToken: refreshedTokensResponse.tokens?.accessToken,
      refreshToken: refreshedTokensResponse.tokens?.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
    };
  }
};
