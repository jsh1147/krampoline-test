import Card from "../atoms/Card";
import Image from "../atoms/Image";
import Title from "../../account/atoms/Title";
import Tag from "../../common/Tag";

const VideoCard = ({ video, className, ...props }) => {
  console.log(video);
  return (
    <Card
      to={`/videos/${video.videoID}`}
      className={`justify-center items-center flex flex-col mt-10 ${className}`}
    >
      <Image
        className="mb-2 rounded-xl"
        src={video.videoThumbnailUrl}
        alt={video.videoTitleKorean}
      />
      <Title className="text-lg text-green-900">{video.videoTitleKorean}</Title>
      <p className="mt-2 mb-2 text-gray-500 font-bold text-sm">
        {video.videoTitleEng}
      </p>
      <Tag>{video.interests}</Tag>
    </Card>
  );
};

export default VideoCard;
