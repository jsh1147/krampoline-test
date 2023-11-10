import Card from "../atoms/Card";
import Image from "../atoms/Image";
import Title from "../../account/atoms/Title";

const HistoryCard = ({ video }) => {
  return (
    <>
      <Card className="w-full mb-2" to={`/videos/${video.videoId}`}>
        <section className="flex">
          <Image
            className="mb-2 rounded-xl max-w-[70%]"
            src={video.thumbnail}
            alt={video.korean_title}
          />
          <div>
            <Title className="text-lg text-green-900">
              {video.korean_title}
            </Title>
            <Title className="text-lg text-green-900">
              {video.english_title}
            </Title>
          </div>
        </section>
      </Card>
    </>
  );
};

export default HistoryCard;
