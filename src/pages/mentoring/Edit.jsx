import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import EditSection from "../../components/mentoring/writeEdit/EditSection";

export default function Edit() {
  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load edit page"
    >
      <EditSection />
    </Fallback>
  );
}
