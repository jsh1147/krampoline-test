import { instance } from "./instance";
import {
  mockResponse,
  userData,
  postsData,
  addPostRes,
} from "../components/mentoring/mock";

export async function getUser() {
  // return await instance.get(`/user`);

  // api 구현 전까지 mock 데이터 반환
  // user쪽 getUser()에서 다루는 데이터가 달라 일단 별도로 작성
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse(userData);
}

export async function getPostsReq(category, search, page) {
  // return await instance.get(
  //   `/mentorings/post?category=${category}&search=${search}&page=${page}`
  // );

  // api 구현 전까지 mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500));
  return page < 2 ? mockResponse(postsData) : mockResponse([]);
}

export async function getPostReq(pid) {
  return await instance.get(`/mentorings/post/${pid}`);
}

export async function addPostReq(data) {
  // const { title, content } = data;
  // return await instance.post("/mentorings/post", {
  //   title,
  //   content,
  // });

  // api 구현 전까지 mock 데이터 반환
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockResponse(addPostRes);
}

export async function editPostReq(pid, data) {
  const { requiredData } = data;
  return await instance.put(`/mentorings/post/${pid}`, {
    requiredData,
  });
}

export async function deletePostReq(pid) {
  return await instance.delete(`/mentorings/post/${pid}`);
}

export async function donePostReq(pid) {
  return await instance.patch(`/mentorings/post/${pid}/done`);
}
