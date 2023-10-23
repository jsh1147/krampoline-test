import { useSetAtom } from "jotai";
import {
  getPublicChannels,
  joinChannel,
} from "../../../apis/chatting/talkplus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chattingRoomIdAtom } from "../../../store/chatting/chatting";
import ChannelListItem from "./ChannelListItem";

const PublicChannelList = () => {
  const queryClient = useQueryClient();
  const setChattingRoomId = useSetAtom(chattingRoomIdAtom);
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
      <p className="font-bold text-2xl">Public Channel List</p>
      <div className="w-full h-[90%] overflow-y-scroll scrollbar-hide bg-white">
        {channels.map((channel) => (
          <div key={channel.id} className="flex justify-between border-b-2 p-2">
            <ChannelListItem data={channel} />
            <button onClick={() => joinChannelMutate(channel.id, channel.name)}>
              참여
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default PublicChannelList;
