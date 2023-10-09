import { useState } from "react";

import "./theme.css";
import "./community.css";
import "@sendbird/uikit-react/dist/index.css";

import {
  OpenChannel,
  OpenChannelSettings,
  SendBirdProvider,
} from "@sendbird/uikit-react";
import CommunityChannelListWithSendBird from "./openChannel/CommunityChannelList";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import { ChannelListProvider } from "@sendbird/uikit-react/ChannelList/context";

export default function Community({ appId, userId, theme, nickname }) {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  return (
    <SendBirdProvider
      appId={appId}
      userId={userId}
      theme={theme}
      nickname={nickname}
    >
      <div className="flex flex-row h-[99vh]">
        <ChannelListProvider>
          <ChannelList />
        </ChannelListProvider>
        <div className="bg-[color:var(--bg-0)] border-r-[color:var(--gray-1)] border-r border-solid">
          <CommunityChannelListWithSendBird
            currentChannelUrl={currentChannelUrl}
            setCurrentChannel={setCurrentChannel}
          />
        </div>
        <div className="flex-1 bg-[color:var(--bg-0)]">
          <OpenChannel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
        {showSettings && (
          <OpenChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </SendBirdProvider>
  );
}
