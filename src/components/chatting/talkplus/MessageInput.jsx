import { useState } from "react";
import { TEST_CHANNEL_ID } from "../../../constants/chatting/chatting";

const MessageInput = ({ client }) => {
  const [newMessage, setNewMessage] = useState("");
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = () => {
    client.sendMessage(
      {
        channelId: TEST_CHANNEL_ID,
        type: "text",
        text: newMessage,
      },
      function (err, date) {
        if (err) {
          return alert(JSON.stringify(err));
        }
      }
    );
  };
  return (
    <>
      <div className="write-box">
        <input
          type="text"
          className="enterMessage"
          placeholder="메시지를 입력해주세요."
          value={newMessage}
          onChange={handleNewMessageChange}
        />
      </div>
      <button
        className="btn-send"
        id="btnEnterMessage"
        onClick={handleSendMessage}
      >
        전송
      </button>
    </>
  );
};
export default MessageInput;
