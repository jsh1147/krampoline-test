import { Suspense, useEffect, useState } from "react";
import PublicChannelList from "../../components/chatting/channelList/PublicChannelList";
import JoinedChannelList from "../../components/chatting/channelList/JoinedChannelList";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentChannelTypeAtom,
  userIdAtom,
  userNameAtom,
  userProfileImageUrlAtom,
} from "../../store/chatting/chatting";
import { login } from "../../apis/chatting/talkplus";
import Tabs from "../../components/chatting/channelList/Tabs";
import CreateChannelModal from "../../components/chatting/modal/CreateChannelModal";

const ChattingListPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const channelType = useAtomValue(currentChannelTypeAtom);

  const setUserId = useSetAtom(userIdAtom);
  const setUserProfileImageUrl = useSetAtom(userProfileImageUrlAtom);
  const setUserName = useSetAtom(userNameAtom);

  const handleLogin = () => {
    login()
      .then((res) => {
        setUserId(res.id);
        setUserProfileImageUrl(res.profileImageUrl);
        setUserName(res.username);
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
      <section className="flex justify-center w-full mb-8">
        <CreateChannelModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <section className="flex flex-col gap-6 w-[1000px]">
          <h1 className="text-3xl font-extrabold">Chat List</h1>
          <Tabs handleModalOpen={() => setModalIsOpen(true)} />
          {channelType === "Public" ? (
            <PublicChannelList />
          ) : (
            <JoinedChannelList />
          )}
        </section>
      </section>
    </Suspense>
  );
};
export default ChattingListPage;
