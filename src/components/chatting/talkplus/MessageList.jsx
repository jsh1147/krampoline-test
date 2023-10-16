import { getMessages } from "../../../apis/chatting/talkplus";
import ReceivedMessage from "./ReceivedMessage";

const MessageList = () => {
  const messages = getMessages();
  console.log(messages);
  return (
    <>
      {/* {messages.map((message) => (
        <ReceivedMessage key={message.userId} />
      ))} */}
      <h1>Message List</h1>
    </>
  );
};

export default MessageList;
