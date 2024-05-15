import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "./axiosInstance";

interface Response<Data> {
  code: number;
  data: Data;
  msg: string;
}

interface UseRequestResponse<Data, Error>
  extends Pick<
    SWRResponse<Response<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined;
  response: Response<Data> | undefined;
}

export function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  config?: SWRConfiguration
): UseRequestResponse<Data, Error> {
  const {
    data: response,
    error,
    mutate,
    isValidating,
  } = useSWR<Response<Data>, AxiosError<Error>>(
    request.url,
    () => axiosInstance.request(request),
    config
  );

  return {
    data: response?.data,
    response,
    error,
    mutate,
    isValidating,
  };
}

export default useRequest;
