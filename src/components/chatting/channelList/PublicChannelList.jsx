import { useSetAtom } from "jotai";
import {
  getPublicChannels,
  joinChannel,
} from "../../../apis/chatting/talkplus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { channelIdAtom } from "../../../store/chatting/chatting";
import ChannelListItem from "./ChannelListItem";
import { useState } from "react";
import ChannelDetailModal from "../modal/ChannelDetailModal";

const PublicChannelList = () => {
  const queryClient = useQueryClient();
  const setChannelId = useSetAtom(channelIdAtom);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = (id) => {
    setChannelId(id);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setChannelId("");
    setModalIsOpen(false);
  };

  const {
    data: channels,
    isLoading,
    isError,
  } = useQuery(["publicChannels"], () => getPublicChannels());
  const { mutate: joinChannelMutate } = useMutation(joinChannel, {
    onSettled: () => queryClient.invalidateQueries("joinedChannels"),
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <ChannelDetailModal
        modalIsOpen={modalIsOpen}
        handleModalClose={handleModalClose}
      />
      <p className="font-bold text-2xl">Public Channel List</p>
      <div className="w-full h-[90%] overflow-y-scroll scrollbar-hide bg-white">
        {channels.map((channel) => (
          <section
            key={channel.id}
            className="flex justify-between border-b-2 p-2"
            onClick={() => handleModalOpen(channel.id)}
          >
            <ChannelListItem data={channel} />
          </section>
        ))}
      </div>
    </>
  );
};
export default PublicChannelList;
