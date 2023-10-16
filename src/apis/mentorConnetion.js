import { instance } from "./instance";

export async function getConnectiontsReq() {
  return await instance.get("/contacts");
}

export async function addConnectionReq(uid) {
  return await instance.post(`/contacts/${uid}`);
}

export async function deleteConnectionReq(uid) {
  return await instance.delete(`/contacts/${uid}`);
}

export async function acceptConnectionReq(uid) {
  return await instance.patch(`/contacts/${uid}/accept`);
}

export async function refuseConnectionReq(uid) {
  return await instance.patch(`/contacts/${uid}/refuse`);
}
