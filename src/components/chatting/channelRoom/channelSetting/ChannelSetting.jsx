import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { getChannelDetail } from "../../../../apis/chatting/talkplus";
import ChannelEditForm from "./ChannelEditForm";
import ChannelInfo from "./ChannelInfo";

const ChannelSetting = ({ channelId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {
    setIsEdit(false);
  };

  const { data: channelInfo } = useQuery(["channelDetail", channelId], () =>
    getChannelDetail(channelId)
  );

  return (
    <Suspense fallback={<div>로딩중</div>}>
      <div className="flex flex-col gap-4 absolute right-0 w-[60%] h-[90%] bottom-0 overflow-y-scroll scrollbar-hide bg-white shadow-lg px-8 pt-4">
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">Channel Setting</p>
        </div>
        {isEdit ? (
          <ChannelEditForm
            channelInfo={channelInfo}
            handleCancel={handleCancel}
          />
        ) : (
          <>
            <ChannelInfo channelInfo={channelInfo} handleEdit={handleEdit} />
          </>
        )}
      </div>
    </Suspense>
  );
};
export default ChannelSetting;
