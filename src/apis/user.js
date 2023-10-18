import { instance } from "./instance";
import { mockUsers, mockResponse } from "../components/account/mockUser";

export const register = (data) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    introduction,
    profileImage,
    country,
    age,
    categoryList,
    phone,
  } = data;

  return instance.post("/users/signup", {
    firstName,
    lastName,
    email,
    password,
    role,
    introduction,
    profileImage,
    country,
    age,
    categoryList,
    phone,
  });
};

// export const login = (data) => {
//   const { email, password } = data;
//   return instance.post("/users/login", {
//     email,
//     password,
//   });
// };

export const login = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 사용자의 email이 mock data의 key 값과 일치하면
  const user = mockUsers[data.email];
  // 패스워드 일치 확인
  if (user && user.password === data.password) {
    const responseUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      country: user.country,
      interest: user.interest,
    };
    return mockResponse({
      message: "Login successful",
      user: responseUser,
      success: true,
    });
  } else {
    return mockResponse({
      message: "Invalid email or password",
      success: false,
    });
  }
};
