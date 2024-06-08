import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TokenNames {
  contentAccessToken = 'contentAccessToken',
  contentRefreshToken = 'contentRefreshToken',
}

type TokenName = TokenNames.contentAccessToken | TokenNames.contentRefreshToken;
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
  },
  selectors: {
    getToken:
      (state): GetToken =>
      (tokenName: TokenName): string | null => {
        return state[tokenName];
      },
    isAuth: (state): boolean => {
      return !!state[TokenNames.contentAccessToken];
    },
  },
  reducers: {
    setTokens: (state, { payload }: PayloadAction<ISetTokenPayload[]>) => {
      payload.forEach((tokenData: ISetTokenPayload) => {
        state[tokenData.tokenName] = tokenData.value;
        localStorage.setItem(tokenData.tokenName, tokenData.value);
      });
    },
    clearTokens(state, { payload }: PayloadAction<TokenName[]>) {
      payload.forEach((tokenName) => {
        state[tokenName] = null;
      });
    },
  },
});

export const { setTokens, clearTokens } = tokensSlice.actions;
export const { getToken, isAuth } = tokensSlice.selectors;
export default tokensSlice.reducer;
