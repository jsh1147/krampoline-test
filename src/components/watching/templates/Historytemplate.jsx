import Title from "../../account/atoms/Title";
import HistoryForm from "../organisms/HistoryForm";
import { getHistory } from "../../../apis/watching/videos";
import { useQuery } from "@tanstack/react-query";
import VideoSkeleton from "../atoms/Skeleton";

const Historytemplate = () => {
  const { data, isError, error, isLoading } = useQuery(
    ["getHistory"],
    getHistory,
    {
      suspense: true,
    }
  );
  console.log(data);

  return (
    <>
      <main className="w-[58rem] mx-auto my-16 flex flex-col justify-center items-center">
        <div className="w-full space-y-8">
          <Title className="">History</Title>
          {isLoading ? <VideoSkeleton /> : <HistoryForm data={data} />}
        </div>
      </main>
    </>
  );
};

export default Historytemplate;
