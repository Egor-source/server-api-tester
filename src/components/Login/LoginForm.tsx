import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ILoginData from '../../interfaces/Login/ILoginData';
import useFetch from '../../hooks/useFetch';
import ContentService from '../../services/ContentService';
import Spinner from '../Spinner/Spinner';
import { setTokens, TokenNames } from '../../store/tokens';
import { useAppDispatch } from '../../hooks/redux';

const LoginForm: FC = () => {
  const [userData, setUserData] = useState<ILoginData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const [login, isLoading, err] = useFetch(async () => {
    const { accessToken, refreshToken } = await ContentService.login(userData);
    dispatch(
      setTokens([
        {
          tokenName: TokenNames.contentAccessToken,
          value: accessToken,
        },
        {
          tokenName: TokenNames.contentRefreshToken,
          value: refreshToken,
        },
      ])
    );
  });

  const errorMessage: string | null = useMemo(() => {
    if (!err) return null;
    if (err.response?.status === 401) {
      return 'Не верный email или пароль';
    }

    return 'Неизвестная ошибка на сервере';
  }, [err]);

  const setUserDataByKey = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form className="d-flex flex-column align-items-center justify-content-center">
      <Form.Control
        onSubmit={(e) => e.preventDefault()}
        value={userData.email}
        className="mb-3"
        placeholder="Email"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserDataByKey(e, 'email')
        }
      />
      <Form.Control
        value={userData.password}
        className="mb-3"
        placeholder="Пароль"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserDataByKey(e, 'password')
        }
      />
      {errorMessage && (
        <div className="text-center text-danger mb-3">{errorMessage}</div>
      )}
      <Button type="submit" onClick={login}>
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
