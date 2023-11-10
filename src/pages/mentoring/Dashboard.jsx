import Fallback from "../../components/common/Fallback";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import DashboardSection from "../../components/mentoring/dashboard/DashboardSection";

export default function Dashboard() {
  return (
    <Fallback
      Loader={Loader}
      Error={Error}
      errorMessage="Failed to load dashboard page"
    >
      <DashboardSection />
    </Fallback>
  );
}
