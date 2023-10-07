import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthCheck() {
  const navigate = useNavigate();

  // React.StrictMode에서 실행 시 2번 동작하여 의도치 않은 효과가 발생함
  useEffect(() => {
    if (!window.localStorage.getItem("token"))
      if (window.confirm("로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?"))
        navigate("/login");
      else navigate(-1);
  });

  return <Outlet />;
}
