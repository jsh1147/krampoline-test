export default function PostCardSkeleton() {
  return (
    <div className="w-full h-fit border bg-white flex">
      <div className="w-40 h-40 m-8 bg-gray-100 rounded-full" />
      <div className="flex-grow px-4 flex flex-col justify-center space-y-3">
        {[20, 10, 4].map((val, index) => (
          <span
            key={`skeleton-${index}`}
            className={`w-[${val}rem] h-6 bg-gray-100`}
          />
        ))}
        <div className="flex items-center space-x-2">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <span
                key={`skeletonTag-${index}`}
                className="w-14 h-6 rounded-lg bg-gray-100"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
