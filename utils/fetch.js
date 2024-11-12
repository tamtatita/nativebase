import axios from "axios";
import config from "./config";
import axiosRetry from "axios-retry";
import * as SecureStore from "expo-secure-store";
import { handleError } from "./helpers";

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount) => retryCount * 2000,
  retryCondition: (error) => {
    const message = handleError(error);
    return (
      error.response.status === 503 ||
      message.includes(
        "変更内容が、同時に編集しているユーザーの変更内容と競合しています"
      )
    );
  },
});

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

export const fetchAuth = async ({
  ignore401 = false,
  url,
  params,
  headers,
  method,
  data,
  ...options
}) => {
  try {
    const accessToken = await SecureStore.getItemAsync(
      config.LOCAL_ACCESS_TOKEN
    );
    const res = await axios({
      url,
      params,
      method,
      data,
      timeout: config.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      ...options,
    });
    return res.data;
  } catch (error) {
    if (handleError(error) === '"401"') {
      if (!ignore401) {
        window.location.reload();
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};
