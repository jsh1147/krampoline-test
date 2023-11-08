import { instance } from "../instance";
import {
  isMock,
  mockResponse,
  userData,
  postsData,
  postData,
  mutateRes,
} from "./mock";

// user쪽 getUser()에서 다루는 데이터가 달라 일단 별도로 작성
export async function getUser() {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(userData);
  } else {
    return await instance.get(`/user`);
  }
}

export async function getPostsReq(category, search, page) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return page < 2 ? mockResponse(postsData) : mockResponse([]);
  } else {
    return await instance.get(
      `/mentorings/post?category=${category}&search=${search}&page=${page}`
    );
  }
}

export async function getPostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(postData);
  } else {
    return await instance.get(`/mentorings/post/${postId}`);
  }
}

export async function addPostReq(data) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(mutateRes);
  } else {
    const { title, content } = data;
    return await instance.post("/mentorings/post", {
      title,
      content,
    });
  }
}

export async function editPostReq(postId, data) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(mutateRes);
  } else {
    const { title, content } = data;
    return await instance.put(`/mentorings/post/${postId}`, {
      title,
      content,
    });
  }
}

export async function deletePostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.delete(`/mentorings/post/${postId}`);
  }
}

export async function donePostReq(postId) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.patch(`/mentorings/post/${postId}/done`);
  }
}
