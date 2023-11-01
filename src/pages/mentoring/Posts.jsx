import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import PostsSection from "../../components/mentoring/posts/PostsSection";

export default function Posts() {
  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load mentoring list page"
    >
      <PostsSection />
    </Fallback>
  );
}
