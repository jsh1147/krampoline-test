import { XSSCheck } from "../../../utils/chatting/messageCheck";
import { convertDate } from "../../../utils/date";

const SentMessage = ({ message }) => {
  const text = XSSCheck(message.text);
  const createdAt = convertDate(message.createdAt);
  return (
    <div className="flex justify-end w-full py-2">
      <div className="grid grid-cols-[6rem_1fr] max-w-[50%] justify-items-end items-end gap-2">
        <div className="text-gray-500 text-xs w-fit">{createdAt}</div>
        <div className="bg-green-300 p-3 rounded-lg w-fit">
          {XSSCheck(text)}
        </div>
      </div>
    </div>
  );
};
export default SentMessage;
