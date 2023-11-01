import { Suspense, useEffect, useState } from "react";
import { client, getChannelDetail, login } from "../../apis/chatting/talkplus";
import { useSetAtom } from "jotai";
import {
  userIdAtom,
  userNameAtom,
  userProfileImageUrlAtom,
} from "../../store/chatting/chatting";
import { Link, useParams } from "react-router-dom";
import MessageList from "../../components/chatting/channelRoom/MessageList";
import MessageInput from "../../components/chatting/channelRoom/MessageInput";
import ChannelSetting from "../../components/chatting/channelRoom/channelSetting/ChannelSetting";

const ChattingRoomsPage = () => {
  const setUserId = useSetAtom(userIdAtom);
  const setUserProfileImageUrl = useSetAtom(userProfileImageUrlAtom);
  const setUserName = useSetAtom(userNameAtom);
  const [isLogin, setIsLogin] = useState(client.isLoggedIn());
  const [isChannelDetailModalOpen, setIsChannelDetailModalOpen] =
    useState(false);
  const channelId = useParams().roomId;

  const handleLogin = () => {
    login()
      .then((res) => {
        console.log(res);
        setUserId(res.id);
        setUserProfileImageUrl(res.profileImageUrl);
        setUserName(res.username);
        setIsLogin(client.isLoggedIn());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  if (!isLogin) return <></>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex w-[95vw] overflow-x-hidden">
        <div className="flex justify-center items-start gap-7 h-fit mt-5 w-full">
          <Link to={`/chatting/rooms`}>
            <span className="material-symbols-outlined text-3xl font-black mt-6">
              arrow_back
            </span>
          </Link>
          <div className="flex flex-col w-[1000px] max-w-full h-fit my-6 relative">
            <span
              className="material-symbols-outlined w-full bg-white font-semibold text-3xl p-2 border-b-2 text-end"
              onClick={() => setIsChannelDetailModalOpen((prev) => !prev)}
            >
              menu
            </span>
            {isChannelDetailModalOpen && (
              <ChannelSetting channelId={channelId} />
            )}
            <MessageList channelId={channelId} />
            <MessageInput channelId={channelId} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ChattingRoomsPage;
