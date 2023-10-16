import { avatarUser } from "../../../constants/chatting/chatting";
import { XSSCheck } from "../../../utils/chatting/messageCheck";

/**
 * @typedef {Object} Message
 * @property {string} text
 * @property {string} createdAt
 */

/**
 * ReceivedMessage component
 * @param {Message} message
 * @returns JSX.Element
 */
const ReceivedMessage = ({ message }) => {
  const pick = Math.floor(Math.random() * avatarUser.length);

  const { username, text, createdAt } = message;
  const profileImageUrl = message.profileImageUrl
    ? message.profileImageUrl
    : avatarUser[pick].image;

  return (
    <div className="message-list avatar">
      <div className="avatar-image">
        <img src={profileImageUrl} alt="프로필" />
      </div>
      <div className="message-box">
        <div className="avatar-name">{username}</div>
        <div className="message-time">
          <div className="message-text">{XSSCheck(text)}</div>
          <div className="timestamps">
            {new Date(createdAt).toLocaleTimeString()}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
