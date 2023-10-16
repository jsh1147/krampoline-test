import { createChannel, getChannels } from "../../../apis/chatting/talkplus";
import { useEffect, useState } from "react";

const PublicChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [newChannelId, setNewChannelId] = useState("");
  const fetchChannels = () => {
    getChannels()
      .then((res) => {
        setChannels(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleAddChannel = () => {
    createChannel(newChannelId)
      .then((res) => {
        console.log("create", res);
        fetchChannels();
        setNewChannelId("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <span>채널 리스트</span>
      <div>
        <input
          value={newChannelId}
          onChange={(e) => setNewChannelId(e.target.value)}
        />
        <button onClick={handleAddChannel}>채널 생성</button>
      </div>

      {channels.map((channel) => (
        <div key={channel.id}>{channel.name}</div>
      ))}
    </>
  );
};
export default PublicChannelList;
