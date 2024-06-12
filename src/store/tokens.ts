import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TokenNames {
  contentAccessToken = 'contentAccessToken',
  contentRefreshToken = 'contentRefreshToken',
  multiplayerToken = 'multiplayerToken',
}

type TokenName =
  | TokenNames.contentAccessToken
  | TokenNames.contentRefreshToken
  | TokenNames.multiplayerToken;
type GetToken = (tokenName: TokenName) => string | null;

interface ISetTokenPayload {
  tokenName: TokenName;
  value: string;
}

const tokensSlice = createSlice({
  name: 'tokens',
  initialState: {
    [TokenNames.contentAccessToken]: localStorage.getItem(
      TokenNames.contentAccessToken
    ) as string | null,
    [TokenNames.contentRefreshToken]: localStorage.getItem(
      TokenNames.contentRefreshToken
    ) as string | null,
    [TokenNames.multiplayerToken]:
      (localStorage.getItem(TokenNames.multiplayerToken) as string) || null,
  },
  selectors: {
    getToken:
      (state): GetToken =>
      (tokenName: TokenName): string | null => {
        return state[tokenName];
      },
    isAuth: (state): boolean => {
      return !!state[TokenNames.multiplayerToken];
    },
  },
  reducers: {
    setTokens: (state, { payload }: PayloadAction<ISetTokenPayload[]>) => {
      payload.forEach((tokenData: ISetTokenPayload) => {
        state[tokenData.tokenName] = tokenData.value;
        localStorage.setItem(tokenData.tokenName, tokenData.value);
      });
    },
    clearTokens(state, { payload }: PayloadAction<TokenName[] | 'all'>) {
      const removeTokens =
        payload === 'all' ? Object.values(TokenNames) : payload;

      removeTokens.forEach((tokenName) => {
        state[tokenName] = null;
        localStorage.removeItem(tokenName);
      });
    },
  },
});

export const { setTokens, clearTokens } = tokensSlice.actions;
export const { getToken, isAuth } = tokensSlice.selectors;
export default tokensSlice.reducer;
