import InformationFixForm from "../organisms/InformationFixForm";
import { userInfo } from "../../../apis/mypage";
import { useQuery } from "@tanstack/react-query";
import SIGNUP from "../constants/SIGNUP";

const InformationFixtemplate = () => {
  const { data } = useQuery(["userInfo"], userInfo, {
    suspense: true,
  });

  return (
    <>
      <main className="mt-20 justify-center items-center flex flex-col">
        <InformationFixForm inputProps={SIGNUP} data={data} />
      </main>
    </>
  );
};

export default InformationFixtemplate;
