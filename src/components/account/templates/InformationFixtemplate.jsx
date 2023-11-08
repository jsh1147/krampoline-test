import InformationFixForm from "../organisms/InformationFixForm";
import { userInfo } from "../../../apis/mypage";
import { useQuery } from "@tanstack/react-query";
import { EDIT } from "../constants/SIGNUP";
import Title from "../atoms/Title";
const InformationFixtemplate = () => {
  const { data } = useQuery(["userInfo"], userInfo, {
    suspense: true,
  });

  return (
    <>
      <main className="w-full mt-10 mb-10 justify-center items-center flex flex-col">
        <div className="min-w-[40%] border-2  p-10 bg-white items-center flex flex-col">
          <Title>Edit Personal Information</Title>
          <InformationFixForm inputProps={EDIT} data={data} />
        </div>
      </main>
    </>
  );
};

export default InformationFixtemplate;
