import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import PostSection from "../../components/mentoring/post/PostSection";

export default function Post() {
  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load mentoring page"
    >
      <PostSection />
    </Fallback>
  );
}
