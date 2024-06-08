import { useState } from 'react';

type Callback = () => Promise<void>;

type FetchReturn = [() => Promise<void>, boolean, any | null];

const useFetch = (callback: Callback): FetchReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};

export default useFetch;
