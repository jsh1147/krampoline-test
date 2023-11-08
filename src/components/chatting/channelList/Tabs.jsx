import { useAtom } from "jotai";
import { currentChannelTypeAtom } from "../../../store/chatting/chatting";
import { CHANNEL_TYPES } from "../../../constants/chatting/CHAT";

const Tabs = ({ handleModalOpen }) => {
  const [channelType, setChannelType] = useAtom(currentChannelTypeAtom);
  const tabNames = Object.values(CHANNEL_TYPES).map(
    (channel) => channel.tabName
  );
  const handleClick = (type) => {
    setChannelType(type);
  };

  return (
    <div className="flex justify-between w-full border-b-2 px-3">
      <div className="flex gap-2">
        {tabNames.map((type) =>
          type === channelType ? (
            <div
              key={type}
              className="font-bold text-orange p-2 border-b-2 border-orange"
            >
              {type}
            </div>
          ) : (
            <div
              key={type}
              className="text-gray-600 p-2 border-b-2 border-green-100"
            >
              <button onClick={() => handleClick(type)}>{type}</button>
            </div>
          )
        )}
      </div>
      <button className="flex items-center" onClick={handleModalOpen}>
        <span className="text-sm text-gray-600">Create Channel</span>
        <span className="material-symbols-outlined text-2xl font-black">
          add
        </span>
      </button>
    </div>
  );
};
export default Tabs;
