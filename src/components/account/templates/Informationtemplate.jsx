import InformationForm from "../organisms/InformationForm";
import { userInfo } from "../../../apis/mypage";
import { useQuery } from "@tanstack/react-query";

const Informationtemplate = () => {
  const { data } = useQuery(["userInfo"], userInfo, {
    suspense: true,
  });

  return (
    <>
      <main className="mt-10 w-full justify-center items-center flex flex-col">
        <InformationForm data={data} />
      </main>
    </>
  );
};

export default Informationtemplate;
