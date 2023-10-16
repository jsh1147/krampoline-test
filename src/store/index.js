import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage("token", null);
// token 상태 관리
export const userAtom = atom(null);
// 유저 상태 관리
