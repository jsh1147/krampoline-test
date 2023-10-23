import { Suspense, useEffect, useState } from "react";
import { client, login } from "../../apis/chatting/talkplus";
import { useSetAtom } from "jotai";
import {
  userIdAtom,
  userNameAtom,
  userProfileImageUrlAtom,
} from "../../store/chatting/chatting";
import { Link, useParams } from "react-router-dom";
import ChatWrap from "../../components/chatting/channelRoom/ChatWrap";

const ChattingRoomsPage = () => {
  const setUserId = useSetAtom(userIdAtom);
  const setUserProfileImageUrl = useSetAtom(userProfileImageUrlAtom);
  const setUserName = useSetAtom(userNameAtom);
  const [isLogin, setIsLogin] = useState(client.isLoggedIn());
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

  return (
    <Suspense fallback={<div>로딩중</div>}>
      <div className="flex w-[95vw] overflow-x-hidden">
        <div className="flex justify-center items-start gap-7 h-fit mt-5 w-full">
          <Link to={`/chatting/rooms`}>
            <span className="material-symbols-outlined text-3xl font-black">
              arrow_back
            </span>
          </Link>
          <ChatWrap channelId={channelId} />
        </div>
      </div>
    </Suspense>
  );
};

export default ChattingRoomsPage;
