import { useCallback, useState } from 'react';

interface IReqConf {
  url: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: unknown;
}

export type ISendRequest = (requestConfig: IReqConf, applyData: (data: unknown) => void) => void;

type IUseHttp = () => {
  isLoading: boolean;
  error: string | null;
  sendRequest: ISendRequest;
};

const useHttp: IUseHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest: ISendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { url, method, headers, body } = requestConfig;
      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError((err as Error).message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
