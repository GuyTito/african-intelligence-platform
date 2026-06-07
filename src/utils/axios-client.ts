import axios from "axios";
import { ENV_VARS } from "./constants";

export const axiosClient = axios.create({
  baseURL: `${ENV_VARS.WORLDBANK_API_URL}`,
});

// const CANCELLED_STATUS_CODE = 499;
// function errorHandler(error: AxiosError) {
//   let { status } = error.response || {};
//   status = error.code === 'ERR_CANCELED' ? CANCELLED_STATUS_CODE : status;

//   throw {
//     status,
//     ...(error?.response?.data || {
//       message: error.message || 'Sorry, an unexpected error occurred.',
//     }),
//   };
// }

export const getMethod = async <T = any>(
  url: string,
  id?: string,
): Promise<T> => {
  const readyUrl = id ? `${url}/${id}` : url;
  const res = await axiosClient.get(readyUrl);
  return res.data;
};
