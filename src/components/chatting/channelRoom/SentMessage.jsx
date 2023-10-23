import { XSSCheck } from "../../../utils/chatting/messageCheck";
import { convertDate } from "../../../utils/date";

const SentMessage = ({ message }) => {
  const text = XSSCheck(message.text);
  const createdAt = convertDate(message.createdAt);
  return (
    <div className="flex justify-end w-full py-2">
      <div className="flex flex-col items-end w-fit max-w-[16rem]">
        <div className="bg-green-300 p-3 rounded-lg w-fit">
          {XSSCheck(text)}
        </div>
        <div className="text-gray-500 text-xs">{createdAt}</div>
      </div>
    </div>
  );
};
export default SentMessage;
