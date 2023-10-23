import { Outlet, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../hooks/useEffectOnce";
// import { useAtom } from "jotai";
// import { authAtom } from "../store";

export default function AuthCheck() {
  const navigate = useNavigate();
  // const [auth, setAuth] = useAtom(authAtom);
  // 전역 상태로 체크 -> 로그인 풀림 문제 (로딩 구현 전까지만)
  const auth = window.localStorage.getItem("isLogin");

  useEffectOnce(() => {
    if (!auth)
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?"))
        navigate("/users/login", { replace: true });
      else navigate(-1);
  });

  return auth && <Outlet />;
}
