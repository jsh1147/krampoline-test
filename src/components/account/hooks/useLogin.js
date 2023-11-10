import { RESET } from "jotai/utils";
import { tokenAtom, authAtom, uidAtom } from "../../../store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navaigate = useNavigate();

  const [token, setToken] = useAtom(tokenAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [uid, setUid] = useAtom(uidAtom);

  const loginUser = (response) => {
    setAuth(true);
    setUid(response?.data?.data?.id);
    setToken(response?.headers?.authorization);
  };
  const logoutUser = () => {
    setAuth(RESET);
    setToken(RESET);
    setUid(RESET);

    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("token");

    window.reload();
  };

  return { loginUser, logoutUser };
};

export default useLogin;
