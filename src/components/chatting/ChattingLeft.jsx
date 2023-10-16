import PublicChannelList from "./talkplus/PublicChannelList";
import UserBox from "./talkplus/UserBox";

const ChattingsLeft = ({ loginUserInfo }) => {
  return (
    <div className="flex flex-col gap-4">
      <UserBox loginUserInfo={loginUserInfo} />
      <PublicChannelList />
    </div>
  );
};
export default ChattingsLeft;
