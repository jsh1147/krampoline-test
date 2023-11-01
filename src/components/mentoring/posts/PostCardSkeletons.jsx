import PostCardSkeleton from "./PostCardSkeleton";

export default function PostCardSkeletons() {
  return (
    <div>
      {[1, 2, 3].map((index) => (
        <PostCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
