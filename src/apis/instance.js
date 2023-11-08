import axios from "axios";

const REFRESH_URL = "/users/refresh";

// instance 생성
export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 5,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token.replace(/"/g, "")}`;
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
        // Refresh Token 요청
        const { data } = await instance.get(REFRESH_URL);
        if (data?.status === "success") {
          //1. 응답의 헤더에서 재발급 된 액세스 토큰 꺼내기
          //2. 기존의 로컬 스토리지에 있는 토큰을 지우고, 재발급 받은 액세스 토큰을 저장
          //3. 새로 저장한 토큰을 스토리지에서 꺼내서 다시 요청 보내기
          const accessToken = data?.headers?.authorization || null;
          localStorage.setItem("token", accessToken);

          // config.headers.Authorization = `${data?.token.replace(/"/g, "")}`;
          //   return instance(config);
          console.log("refresh");
        } else if (data?.status === "error") {
          // Refresh Token 실패 처리
          console.log(data?.message);
          throw new Error("Refresh authentication failed");
        }
      } catch (refreshError) {
        // Refresh Token 요청 중 에러 처리
        return Promise.reject(refreshError);
      }
    } else {
      if (error.response) {
        const errorCode = error.response.status;
        const states = { 3: "Redirect", 4: "Client", 5: "Server" };
        const errorState = states[Math.floor(errorCode / 100)];
        console.log(
          `[API RESPONSE ERROR] ${errorCode}(${errorState}): ${error.message}`
        );
      } else {
        console.log(`[API RESPONSE ERROR] ${error}`);
        console.dir(error);
      }
      return Promise.reject(error);
    }
  }
);
