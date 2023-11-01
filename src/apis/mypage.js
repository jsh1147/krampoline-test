import { mockUsers, mockResponse } from "../components/account/mockUser";
// export const userInfo = () => {
//   return instance.get("/userInfo");
// };

// 백앤드 api 연결 전 까지 mock api 사용 - userInfo
export const userInfo = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers["user@example.com"];
  if (!user) {
    throw new Error("User not found");
  }

  const responseUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    profileImage: user.profileImage,
    role: user.role,
    categoryList: user.categoryList,
    country: user.country,
    phone: user.phone,
    age: user.age,
    introduction: user.introduction,
  };

  return {
    message: "successful",
    user: responseUser,
    success: true,
  };
};
