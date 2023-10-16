import { XSSCheck } from "../../../utils/chatting/messageCheck";

const SentMessage = ({ message }) => {
  const text = XSSCheck(message.text);
  const createdAt = new Date(message.createdAt).toLocaleTimeString();
  return (
    <div className="message-list writer">
      <div className="message-box">
        <div className="message-time">
          <div className="message-text">{text}</div>
          <div className="timestamp">{createdAt}</div>
        </div>
      </div>
    </div>
  );
};
export default SentMessage;
