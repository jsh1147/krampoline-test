import HistoryCard from "../molecules/HistoryCard";

const HistoryForm = ({ data }) => {
  const videos = data?.data?.data?.response;
  console.log(videos);
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center">
        {videos ? (
          videos.map((video, index) => (
            <HistoryCard key={index} video={video} />
          ))
        ) : (
          <p>시청 기록이 없습니다.</p>
        )}
      </main>
    </>
  );
};

export default HistoryForm;
