import axios from "axios";

// instance
export const instance = axios.create({
  baseURL: "" + "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 5,
});

// middleware
instance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("token");
    if (auth) config.headers["Authorization"] = auth;
    return config;
  },
  (error) => {
    console.log(`[API REQEST ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.dir(response);
    return response;
  },
  (error) => {
    if (error.response.status && error.message) {
      const states = { 3: "Rredirect", 4: "Client", 5: "Server" };
      const state = states[Math.floor(error.response.status / 100)];
      console.log(
        `[API RESPONSE ERROR] ${error.response.status}(${state}): ${error.message}`
      );
    } else console.log(`[API RESPONSE ERROR] ${error}`);
    console.dir(error);
    return Promise.reject(error);
  }
);
