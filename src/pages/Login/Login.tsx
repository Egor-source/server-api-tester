import React, { FC } from 'react';
import LoginForm from '../../components/Login/LoginForm';

const Login: FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div>
        <div className="h1 text-center">Вход</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
