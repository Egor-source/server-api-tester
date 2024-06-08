import React, { FC } from 'react';
import { authRouter } from '../../router/authRouter';

const AuthRouter: FC = () => {
  return <>{authRouter()}</>;
};

export default AuthRouter;
