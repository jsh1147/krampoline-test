import FlagTag from "../../common/FlagTag";
import Tag from "../../common/Tag";

export default function MentorCard({ info }) {
  return (
    <div className="w-fit py-3 flex items-end space-x-2">
      <img
        className="inline w-12 rounded-full"
        src={info.profileImage}
        alt={`프로필 이미지`}
      />
      <div className="inline-flex items-center space-x-2">
        <span className="text-sm">{info.name}</span>
        <FlagTag>{info.country}</FlagTag>
        <Tag>{info.role}</Tag>
        {info.interests.map((val, index) => (
          <Tag key={`tag-${index}`}>{val}</Tag>
        ))}
      </div>
    </div>
  );
}
