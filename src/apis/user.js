import { instance } from "./instance";

// api 요청
export const register = (data) => {
  const { firstName, lastName, email, password, role, country, interest } =
    data;
  return instance.post("/signup", {
    firstName,
    lastName,
    email,
    password,
    role,
    country,
    interest,
  });
};

export const login = (data) => {
  const { email, password } = data;
  return instance.post("/login", {
    email,
    password,
  });
};
