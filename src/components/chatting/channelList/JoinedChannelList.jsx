import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import ChannelListItem from "./ChannelListItem";
import { chattingRoomIdAtom } from "../../../store/chatting/chatting";
import {
  getJoinedChannels,
  leaveChannel,
} from "../../../apis/chatting/talkplus";
import { Link } from "react-router-dom";

const JoinedChannelList = () => {
  const queryClient = useQueryClient();
  const setChattingRoomId = useSetAtom(chattingRoomIdAtom);
  const {
    data: channels,
    isLoading,
    isError,
  } = useQuery(["joinedChannels"], () => getJoinedChannels());
  const { mutate: deleteChannelMutate } = useMutation(leaveChannel, {
    onSettled: () => queryClient.invalidateQueries("joinedChannels"),
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <p className="font-bold text-2xl">My Channel List</p>
      <div className="w-full h-[90%] overflow-y-scroll scrollbar-hide bg-white">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex justify-between border-b-2 p-2"
            onClick={() => {
              setChattingRoomId(channel.id);
              queryClient.invalidateQueries(["messages", channel.id]);
            }}
          >
            <Link to={`/chatting/room/${channel.id}`}>
              <ChannelListItem data={channel} />
            </Link>
            <button onClick={() => deleteChannelMutate(channel.id)}>
              <span className="material-symbols-outlined">delete_forever</span>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default JoinedChannelList;
