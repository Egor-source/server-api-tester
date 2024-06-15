import { useState } from 'react';

type Callback = (...args: any[]) => Promise<void>;

type FetchReturn = [
  (...args: any[]) => Promise<void>,
  boolean,
  any | null,
  () => void,
];

const useFetch = (callback: Callback): FetchReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [
    fetching,
    isLoading,
    error,
    () => {
      setError(null);
    },
  ];
};

export default useFetch;
