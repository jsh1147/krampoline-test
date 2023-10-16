import { useEffect, useState } from "react";
import UserBox from "../../components/chatting/talkplus/UserBox";
import ChatWrap from "../../components/chatting/talkplus/ChatWrap";
import { client, login } from "../../apis/chatting/talkplus";
import { useMutation, useQuery } from "@tanstack/react-query";
import ChattingsLeft from "../../components/chatting/ChattingLeft";

const ChattingRoomsPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const [isLogin, setIsLogin] = useState(client.isLoggedIn());

  const handleLogin = () => {
    login()
      .then((res) => {
        console.log("login", res);
        setUserInfo(res);
        setIsLogin(client.isLoggedIn());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  // const handleMessageInputChange = (e) => {
  //   setMessageInput(e.target.value);
  // };

  // const handleSendMessage = () => {
  //   const message = {
  //     username,
  //     text: messageInput,
  //     timestamp: new Date().getTime(),
  //   };
  //   // 메시지 전송 로직 구현
  // };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex flex-col items-center w-[1000px] h-screen">
        {!isLogin ? (
          <button onClick={handleLogin}>로그인</button>
        ) : (
          <div className="flex">
            <ChattingsLeft loginUserInfo={userInfo} />
            <ChatWrap />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChattingRoomsPage;
