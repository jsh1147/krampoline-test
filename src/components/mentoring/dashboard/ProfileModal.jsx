import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "react-modal";

import { getProfileById } from "../../../apis/mypage";

import Profile from "../../account/molecules/Profile";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ProfileModal({ isModal, setIsModal, uid }) {
  // const { data } = useQuery(
  //   ["getProfileById", uid],
  //   () => getProfileById(uid),
  //   { enabled: !!uid, suspense: true }
  // );

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal}>close</button>
      {/* <Profile data={data} /> */}
      <h1>프로필 모달</h1>
      <h2>{uid}</h2>
    </Modal>
  );
}
