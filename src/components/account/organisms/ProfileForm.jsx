import React from "react";
import { useParams } from "react-router-dom";
import { getProfileById } from "../../../apis/mypage";
import { useQuery } from "@tanstack/react-query";
import Profile from "../molecules/Profile";
import Error from "../atoms/Error";

const ProfileForm = () => {
  const { uid } = useParams();

  const { data, isError, error } = useQuery(
    ["getProfileById", uid],
    () => getProfileById(uid),
    { enabled: !!uid, suspense: true }
  );

  if (isError) {
    return <Error errorMessage={error.errorMessage} />;
  }

  return (
    <>
      <main className="min-w-[50%] border-2 bg-white ">
        {data && <Profile data={data} />}
      </main>
    </>
  );
};

export default ProfileForm;
