import axios from "axios";
import Error from "../components/common/Error";
import useLogin from "../components/account/hooks/useLogin";
import { useAtom } from "jotai";
import { userProfileAtom } from "../store";

const REFRESH_URL = "/users/refresh";

axios.defaults.withCredentials = true;

// instance 생성

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 5,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token.replace(/"/g, "")}`;
      // try {
      //   const response = await instance.get('/profiles/simple');
      //   if (response.data) {
      //     setUserProfile(response.data); // Jotai 상태 업데이트
      //   }
      // } catch (error) {
      //   console.error('프로필 데이터를 가져오는 데 실패했습니다:', error);
      // }
    } else {
      console.log("해당 요청에는 token이 담기지 않았습니다.");
    }
    return config;
  },
  (error) => {
    console.log(`[API REQEST ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    if (
      response &&
      response.status === 401 &&
      config.url !== REFRESH_URL &&
      !config._retry
    ) {
      config._retry = true;
      try {
        const response = await instance.get(REFRESH_URL);
        if (response.data?.status === "success") {
          const accessToken = response?.headers?.authorization || null;
          localStorage.setItem("token", accessToken);
          config.headers["Authorization"] = `${accessToken.replace(/"/g, "")}`;
          return instance(config);
        } else if (response?.data?.status === "error") {
          // refrsh token 만료
          // 토스트로 로그인 시간이 만료되었습니다. 다시 로그인 후 시도해주세요
          // 강제 로그아웃
          // 로그인 페이지로 리다이렉트

          return console.log(data?.status);
        }
      } catch (refreshError) {
        // Refresh Token 요청 중 에러 처리

        return Promise.reject(refreshError);
      }
    } else {
      if (error.response) {
        const errorCode = error.response.status;
        const errorState = ["Redirect", "Client", "Server"][
          Math.floor(errorCode / 100) - 3
        ];
        console.error(
          `[API RESPONSE ERROR] ${errorCode}(${errorState}): ${error.message}`
        );
      } else {
        console.error(`[API RESPONSE ERROR] ${error}`);
      }

      return Promise.reject(error);
    }
  }
);
