import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

export function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  config?: SWRConfiguration
) {
  const { data, error } = useSWR<Response<Data>, AxiosError<Error>>(
    request.url,
    () => axiosInstance.request(request),
    config
  );

  return {
    data,
    error,
  };
}

export default useRequest;
