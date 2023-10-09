import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import Community from "../../components/chatting/Community";
import SearchInput from "../../components/chatting/SearchInput";
import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";

const ChattingRoomsPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex flex-col items-center w-[1000px] h-screen">
        <SearchInput />
        <SendbirdApp
          appId="77E9161E-6470-4E08-9329-E7A148215547"
          userId="bada"
          nickname="강바다"
        />
        {/* <Community
          appId="77E9161E-6470-4E08-9329-E7A148215547"
          userId="bada"
          nickname="강바다"
        /> */}
      </div>
    </div>
  );
};

export default ChattingRoomsPage;
