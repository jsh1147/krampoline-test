import { useEffect, useState } from "react";

import OpenChannelPreview from "./OpenChannelPreview";
import Profile from "./Profile";
import { sendBirdSelectors, withSendBird } from "@sendbird/uikit-react";

function CommunityChannelList({
  sdk,
  user,
  currentChannelUrl,
  setCurrentChannel,
}) {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    if (!sdk || !sdk.OpenChannel) {
      return;
    }
    const openChannelListQuery = sdk.OpenChannel.createOpenChannelListQuery();
    // @ts-ignore: Unreachable code error
    openChannelListQuery.customTypes = ["SB_COMMUNITY_TYPE"];
    openChannelListQuery.next(function (openChannels, error) {
      if (error) {
        return;
      }
      setChannels(openChannels);
      if (openChannels.length > 0) {
        setCurrentChannel(openChannels[0]);
      }
    });
  }, [sdk]);

  return (
    <div className="w-[264px] h-full flex flex-col overflow-y-scroll flex-1 box-border text-lg font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[color:var(--gray-0)] border-b-[color:var(--gray-1)] px-6 py-5 border-b border-solid text-center font-[normal] ml-8 p-4">
      <div className="box-border text-lg font-semibold not-italic leading-[normal] tracking-[-0.2px] text-[color:var(--gray-0)] border-b-[color:var(--gray-1)] px-6 py-5 border-b border-solid">
        Community Channels
      </div>
      <div className="h-full overflow-y-scroll flex-1">
        {channels.length === 0 ? (
          "No Channels"
        ) : (
          <div className="community-channel-list__scroll-wrap">
            <div>
              {channels.map((c) => (
                <OpenChannelPreview
                  key={c.url}
                  channel={c}
                  selected={c.url === currentChannelUrl}
                  onClick={() => {
                    setCurrentChannel(c);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <p className="w-[200px] h-4 text-center text-xs font-[normal] not-italic leading-[1.33] tracking-[normal] text-[color:var(--gray-2)] ml-8">
          Preset channels developed by UI Kit
        </p>
      </div>
      <div className="box-border flex p-4">
        <Profile user={user} />
      </div>
    </div>
  );
}

const CommunityChannelListWithSendBird = withSendBird(
  CommunityChannelList,
  (store) => {
    return {
      sdk: sendBirdSelectors.getSdk(store),
      user: store.stores.userStore.user,
    };
  }
);

export default CommunityChannelListWithSendBird;
