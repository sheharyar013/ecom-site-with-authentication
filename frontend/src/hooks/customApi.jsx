import { useState } from "react";

const useApiCall = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method, body = null) => {
    setIsLoading(true);
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json", // Modify headers as needed
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const get = (url) => fetchData(url, "GET");
  const post = (url, body) => fetchData(url, "POST", body);
  const put = (url, body) => fetchData(url, "PUT", body);
  const del = (url) => fetchData(url, "DELETE");

  return { data, isLoading, error, get, post, put, del };
};

export default useApiCall;
