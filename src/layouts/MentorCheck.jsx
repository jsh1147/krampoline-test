import { useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../apis/mentorPost";
import { useEffectOnce } from "../hooks/useEffectOnce";

import Loader from "../components/mentoring/posts/Loader";
import Error from "../components/mentoring/posts/Error";

export default function MentorCheck() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (!(isLoading || isError))
      if (data.data.response.role !== "mentor") {
        alert("해당 서비스는 멘토만 접근할 수 있습니다.");
        navigate("mentoring/posts", { replace: true });
      }
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error meesage="Failed to check role" />
  ) : (
    <Outlet />
  );
}
