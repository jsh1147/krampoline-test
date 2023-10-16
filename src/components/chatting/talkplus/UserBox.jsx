import { useState } from "react";

const UserBox = ({ loginUserInfo, client }) => {
  return (
    <div className="w-64">
      <img
        className="user-img"
        src={loginUserInfo.profileImageUrl}
        alt="user image"
      />
      <div className="name">
        <span>{loginUserInfo.username}</span>
      </div>
    </div>
  );
};
export default UserBox;
