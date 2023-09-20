import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const UseFetch = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      setResponse(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  };

  useEffect(() => {
    if (axiosParams?.method === "GET" || axiosParams?.method === "get") {
      fetchData(axiosParams);
    }
  }, []);

  return { response, loading, sendData };
};

export default UseFetch;
