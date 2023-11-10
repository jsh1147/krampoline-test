import { instance } from "./instance";
// import {
//   mockUsers,
//   ProfileData,
//   mockResponse,
// } from "../components/account/mockUser";

// Information Page

export const userInfo = () => {
  return instance.get("/profiles");
};

export const simpleUserInfo = () => {
  return instance.get("/profiles/simple");
};

export const editInfo = (formData) => {
  return instance.put("/profiles", formData);
};

// // 임시 uid 로 판별
// export const userInfo = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   const uid = window.localStorage.getItem("uid");
//   let user;

//   if (uid === "10") {
//     user = mockUsers["user@example.com"];
//   } else if (uid === "11") {
//     user = mockUsers["user2@example.com"];
//   }

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const responseUser = {
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     password: user.password,
//     profileImage: user.profileImage,
//     role: user.role,
//     categoryList: user.categoryList,
//     country: user.country,
//     phone: user.phone,
//     age: user.age,
//     introduction: user.introduction,
//   };

//   return {
//     message: "successful",
//     user: responseUser,
//     success: true,
//   };
// };

// Profile Page

export const getProfileById = (id) => {
  if (!id) {
    throw Error("해당 ID를 사용하는 사용자를 찾을 수 없습니다.  ");
  }
  return instance.get("/profiles/" + id);
};

// export const getProfileById = async (uid) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));

//   const user = ProfileData[uid];

//   if (!user) {
//     throw new Error("User not found");
//   }

//   return {
//     message: "successful",
//     user: user,
//     success: true,
//   };
// };
