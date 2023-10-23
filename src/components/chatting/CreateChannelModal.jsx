import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createChannel } from "../../apis/chatting/talkplus";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "calc(100% - 28rem)",
    height: "calc(70%)",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CreateChannelModal = ({ modalIsOpen, setModalIsOpen }) => {
  const queryClient = useQueryClient();
  const [createChannelInfo, setCreateChannelInfo] = useState({
    name: "",
    imageUrl: "",
    content: "",
    category: "",
  });

  const { mutate: createChannelMutate } = useMutation(
    () => createChannel(createChannelInfo),
    {
      onSettled: () => {
        queryClient.invalidateQueries("joinedChannels");
        queryClient.invalidateQueries("publicChannels");
      },
    }
  );

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleCreateChannel = () => {
    if (!createChannelInfo.name) {
      alert("채팅방 이름을 입력해주세요");
      return;
    }
    if (!createChannelInfo.imageUrl) {
      alert("채팅방 이미지 URL을 입력해주세요");
      return;
    }
    if (!createChannelInfo.content) {
      alert("채팅방 설명을 입력해주세요");
      return;
    }
    createChannelMutate();
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="flex flex-col gap-4 h-full">
        <button onClick={handleModalClose} className="w-fit">
          <span className="material-symbols-outlined">close</span>
        </button>
        <p className="text-2xl font-bold">채팅방 생성</p>
        <input
          type="url"
          className="border-2 border-gray-300 rounded-md p-2"
          placeholder="채팅방 이미지 URL을 입력하세요"
          value={createChannelInfo.imageUrl}
          onChange={(e) => {
            setCreateChannelInfo({
              ...createChannelInfo,
              imageUrl: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="채팅방 이름을 입력하세요"
          className="border-2 border-gray-300 rounded-md p-2"
          value={createChannelInfo.name}
          onChange={(e) => {
            setCreateChannelInfo({
              ...createChannelInfo,
              name: e.target.value,
            });
          }}
        />
        <textarea
          className="border-2 border-gray-300 rounded-md p-2 h-full resize-none"
          placeholder="채팅방 설명을 입력하세요"
          value={createChannelInfo.content}
          onChange={(e) => {
            setCreateChannelInfo({
              ...createChannelInfo,
              content: e.target.value,
            });
          }}
        />
        <button
          className="bg-green-400 rounded-md p-2"
          onClick={handleCreateChannel}
        >
          생성
        </button>
      </div>
    </Modal>
  );
};
export default CreateChannelModal;
