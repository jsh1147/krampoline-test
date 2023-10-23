const ChannelListItem = ({ data }) => {
  const { imageUrl, name, memberCount, data: detail } = data;
  return (
    <div className="flex gap-12 px-2 py-3">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="user image"
          className="w-24 h-24 rounded-full"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
      )}
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">{name}</span>
        <span className="text-gray-600">{memberCount} people</span>
        <span>{detail?.content ? detail.content : ""}</span>
        <div>{detail?.tag ? <span>tags</span> : <span>no tag</span>}</div>
      </div>
    </div>
  );
};
export default ChannelListItem;
