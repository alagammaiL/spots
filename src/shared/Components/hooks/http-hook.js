import { useCallback, useState, useRef, useEffect } from "react";
export function useHttpHook() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const httpActiveReq = useRef([]);
  const fetchApiCall = useCallback(async function fetchApiCall(
    url,
    method = "GET",
    headers = {},
    body = null
  ) {
    setLoading(true);
    try {
      const httpAbortCtrl = new AbortController();
      httpActiveReq.current.push(httpAbortCtrl);

      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
        signal: httpAbortCtrl.signal,
      });

      let resValue = null;
      // 👇 Only parse JSON if there is a body
      if (response.status !== 204) {
        try {
          resValue = await response.json();
        } catch (err) {
          resValue = null;
        }
      }

      httpActiveReq.current = httpActiveReq.current.filter(
        (reqctrl) => reqctrl !== httpAbortCtrl
      );

      if (!response.ok) {
        if (resValue?.error?.code === 11000) {
          throw new Error("Email already exist, please sign in instead");
        }
        throw new Error(resValue?.message || "Request failed");
      }

      setLoading(false);
      return resValue;
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }
      setError(err.message || "Something went wrong. Please try again");
      setLoading(false);
      throw err;
    }
  },
  []);
  useEffect(() => {
    return () => {
      httpActiveReq.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  function handlecancelOnError() {
    setError(null);
  }
  return {
    loading,
    error,
    fetchApiCall,
    handlecancelOnError,
  };
}
