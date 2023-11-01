import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import WriteSection from "../../components/mentoring/writeEdit/WriteSection";

export default function Write() {
  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load write page"
    >
      <WriteSection />
    </Fallback>
  );
}
