import { RESET } from "jotai/utils";
import { expiryAtom, tokenAtom, authAtom } from "../../../store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 고려 사항
// 1. react query로 통신
// 2. login / logout hook 필요성
// 3. 자동 로그아웃

const useLogin = () => {
  const [expiry, setExpiry] = useAtom(expiryAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [auth, setAuth] = useAtom(authAtom);

  const navaigate = useNavigate();

  useEffect(() => {
    console.log("is Login:", auth);
  }, [auth]);

  const loginUser = (data) => {
    const now = new Date();
    const ttl = 3600 * 1000; // 1h
    setAuth(true);
    setToken(data?.headers?.authorization);
    setExpiry(now.getTime() + ttl);
    window.localStorage.setItem("expiry", now.getTime() + ttl);
  };
  const logoutUser = () => {
    setAuth(RESET);
    setToken(RESET);
    setExpiry("");
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiry");
    navaigate("/");
  };

  return { expiry, loginUser, logoutUser };
};

export default useLogin;
