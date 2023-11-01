import { useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../apis/mentoring/post";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { RoleType } from "../constants/user";

import Loader from "../components/common/Loader";
import Error from "../components/common/Error";
import toast from "react-hot-toast";

export default function MentorCheck() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const isMentor = data?.data.response.role === RoleType.MENTOR;

  useEffectOnce(() => {
    if (!(isLoading || isError))
      if (!isMentor) {
        toast("This service is only accessible to mentors.");
        navigate("mentoring/posts", { replace: true });
      }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error meesage="Failed to check role" />
  ) : (
    isMentor && <Outlet />
  );
}
