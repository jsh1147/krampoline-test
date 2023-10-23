import { Link } from "react-router-dom";

import Tag from "../../../components/common/Tag";
import FlagTag from "../../../components/common/FlagTag";

export default function PostCard({ post }) {
  return (
    <Link
      className="w-full h-fit border bg-white flex"
      to={`/mentoring/post/${post.pid}`}
    >
      <img
        className="w-56 p-8 rounded-full"
        src={post.writer.profileImage}
        alt={`글${post.pid} 작성자 프로필 이미지`}
      ></img>
      <div className="w-full px-4 flex flex-col justify-center space-y-3">
        <span className="text-xl font-semibold">{post.title}</span>
        <span className="text-sm text-gray-500">{`${post.writer.firstName} ${post.writer.lastName}`}</span>
        <span>{post.summary}</span>
        <div className="flex items-center space-x-2">
          <FlagTag>{post.writer.country}</FlagTag>
          <Tag>Mentor</Tag>
          {post.writer.interest.map((val, index) => (
            <Tag key={`글${post.pid}tag-${index}`}>{val}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
