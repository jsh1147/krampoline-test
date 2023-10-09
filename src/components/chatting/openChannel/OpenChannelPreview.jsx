import { useMemo } from "react";

//import { ChannelMeta } from "./DummyStream";

const kFormat = (num) => {
  if (num < 1000) {
    return num;
  }
  const trimmed = num / 1000;
  return `${trimmed.toFixed(2)} k`;
};

export default function OpenChannelPreview({
  channel,
  selected = false,
  onClick,
  isStreaming = false,
}) {
  const streamInfo = useMemo(() => {
    let channelMeta;
    if (isStreaming) {
      try {
        channelMeta = JSON.parse(channel.data);
      } catch (error) {
        channelMeta = null;
      }
    }
    return channelMeta;
  }, [isStreaming]);
  return (
    <div
      className={`
        relative cursor-pointer w-[264px] h-12 box-border flex flex-row border-b-[color:var(--gray-1)] text-[color:var(--gray-0)] border-b border-solid hover:bg-[color:var(--preview-hover)]
        ${
          selected
            ? "bg-[color:var(--selected-bg-0)] text-[color:var(--selected-text-0)] inline-block"
            : null
        }
        ${isStreaming ? "pl-0 pt-0" : null}
      `}
      onClick={onClick}
    >
      <div className="hidden absolute h-full w-1 bg-[#9e8cf5] left-0 top-0" />
      <div className="relative box-border pl-3 pt-2">
        <div className="h-8 w-8">
          <img
            src={channel.coverUrl}
            alt={channel.name}
            className="h-full w-full rounded-[50%]"
          />
        </div>
      </div>
      <div className="relative w-[230px] box-border pl-3 pt-4">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis w-[140px] left-1 absolute top-2 text-sm font-semibold not-italic leading-[1.14] tracking-[-0.2px]">
          {channel.name}
        </div>
        {isStreaming && (
          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-[140px] left-1 absolute text-sm font-[normal] not-italic leading-[1.43] tracking-[normal] text-[color:var(--selected-sub-text)] top-[22px]">
            {streamInfo.creator_info.name}
          </div>
        )}
        {isStreaming && (
          <div className="absolute flex flex-row right-[22px] top-3">
            <div className="w-2.5 h-2.5 bg-[red] rounded-[50%]" />
            <div className="text-xs font-[normal] not-italic leading-none tracking-[normal] text-[color:var(--gray-0)] ml-1">
              {kFormat(channel.participantCount)}
            </div>
          </div>
        )}
        {channel.isFrozen && <div style={{ position: "absolute" }}>*</div>}
      </div>
    </div>
  );
}
