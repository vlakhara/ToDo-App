import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    });
    const data = await response.json();
    applyData(data);
    setIsLoading(false);
  }, []);
  return { sendRequest, isLoading };
};

export default useHttp;
