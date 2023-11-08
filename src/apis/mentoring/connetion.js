import { instance } from "../instance";
import { isMock, mockResponse } from "./mock";

export async function getConnectiontsReq() {
  if (isMock) {
    1;
  } else {
    return await instance.get("/contacts");
  }
}

export async function addConnectionReq(pid) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.post(`/contacts/${pid}`);
  }
}

export async function deleteConnectionReq(uids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.delete(`/contacts/`);
  }
}

export async function acceptConnectionReq(uids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.patch(`/contacts/accept`);
  }
}

export async function refuseConnectionReq(uids) {
  if (isMock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockResponse(null);
  } else {
    return await instance.patch(`/contacts/refuse`);
  }
}
