import { useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getUser } from "../apis/mentoring/post";
import { useEffectOnce } from "../hooks/useEffectOnce";
import { userRole } from "../constants/mentoring";

import Loader from "../components/common/Loader";
import Error from "../components/common/Error";

export default function MentorCheck() {
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const isMentor = data?.data.data.role === userRole.MENTOR;

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
