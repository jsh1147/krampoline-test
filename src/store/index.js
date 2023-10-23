import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

// token 상태 관리
export const tokenAtom = atomWithStorage("token", null);

// 인증 만기
export const expiryAtom = atom(null);

// auth : isLogin을 스토리지에 저장 -> 로그아웃시 RESET
// 스토리지에 auth 값이 있을때 (참일 때) -> 인가

export const authAtom = atomWithStorage("isLogin", null);
// 로그인 시 스토리지에 isLogin 저장
// 이후 인증 상태는 스토리지에 저장 된 값을 꺼내 사용
// 인증 상태는 로그아웃 시 초기화
