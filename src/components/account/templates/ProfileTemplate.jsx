import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileForm from "../organisms/ProfileForm";

const ProfileTemplate = () => {
  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    const profileUid = window.localStorage.getItem("uid");
    if (!uid) {
      navigate(`/mypage/profiles/${profileUid}`);
    }
  }, [uid]);

  return (
    <>
      <main className="w-full mt-10 justify-center items-center flex flex-col">
        <ProfileForm />
      </main>
    </>
  );
};

export default ProfileTemplate;
