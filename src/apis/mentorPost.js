import { instance } from "./instance";
import { mockResponse, postsData } from "../components/mentoring/mock";

export async function getPostsReq(category, search, page) {
  // return await instance.get(
  //   `/mentorings/post?category=${category}&search=${search}&page=${page}`
  // );

  // api 구현 전까지 mock 데이터 반환
  return page < 2 ? mockResponse(postsData) : mockResponse({ response: [] });
}

export async function getPostReq(pid) {
  return await instance.get(`/mentorings/post/${pid}`);
}

export async function addPostReq(data) {
  const { datas } = data;
  return await instance.post("/mentorings/post", {
    datas: datas,
  });
}

export async function editPostReq(pid, data) {
  const { datas } = data;
  return await instance.put(`/mentorings/post/${pid}`, {
    datas: datas,
  });
}

export async function deletePostReq(pid) {
  return await instance.delete(`/mentorings/post/${pid}`);
}

export async function donePostReq(pid) {
  return await instance.patch(`/mentorings/post/${pid}/done`);
}
