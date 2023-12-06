import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {Mutex} from "async-mutex";
import {getUserToken,} from "../storage";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const mutex = new Mutex();
const XApiKey = import.meta.env.VITE_APP_ENCRYPTION_KEY;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("content-type", "application/json");
    headers.set("XApiKey", XApiKey)
    const token = getUserToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error?.status === 401) {
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();

  //     try {
  //       const refreshResult = await axios.post(
  //         baseUrl.concat("/auth/refresh"),
  //         {
  //           refreshToken: getSessionItem("refresh"),
  //         }
  //       );

  //       if (refreshResult.access) {
  //         setSessionItem("token", refreshResult.access);
  //         setSessionItem("refresh", refreshResult.refresh);
  //         setSessionItem("siteName", refreshResult.siteName);
  //         // Retry the initial query
  //         result = await baseQuery(args, api, extraOptions);
  //       } else {
  //         window.location.href = "/login";
  //       }
  //     } finally {
  //       release();
  //     }
  //   } else {
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }

  return result;
};

export default customFetchBase;
