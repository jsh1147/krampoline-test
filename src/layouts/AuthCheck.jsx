import { Outlet, useNavigate } from "react-router-dom";
import { useAuthCheck } from "../hooks/useEffectOnce";

export default function AuthCheck() {
  const navigate = useNavigate();

  useAuthCheck(() => {
    if (!window.localStorage.getItem("token"))
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?"))
        navigate("/login", { replace: true });
      else navigate(-1);
  });

  return <Outlet />;
}
