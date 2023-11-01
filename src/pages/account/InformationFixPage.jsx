import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import InformationFixtemplate from "../../components/account/templates/InformationFixtemplate";
import Loader from "../../components/account/atoms/Loader";
import Error from "../../components/account/atoms/Error";

const InformationFixPage = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary
          FallbackComponent={(props) => (
            <Error errorMessage={props.error.message} />
          )}
        >
          <InformationFixtemplate />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default InformationFixPage;
