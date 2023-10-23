import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatWrap = ({ channelId }) => {
  return (
    <div className="flex flex-col w-[1000px] max-w-full h-fit">
      <MessageList channelId={channelId} />
      <MessageInput channelId={channelId} />
    </div>
  );
};
export default ChatWrap;
