import Title from "../atoms/Title";
import Button from "../../common/Button";
import Modal from "../atoms/Modal";
import { useState } from "react";
import { InputOnly } from "../atoms/InputBox";
import { useNavigate } from "react-router-dom";
import { codeToName } from "../../../utils/account/country";
import { profileImageAtom } from "../../../store/index";
import { useAtom } from "jotai";

const KeyValueComponent = ({ keyName, value }) => (
  <div className="flex justify-between">
    <p className="text-green-700">
      <span className="material-symbols-outlined relative -bottom-1">
        check_circle
      </span>
      {keyName}
    </p>
    <p>{value}</p>
  </div>
);

const InformationForm = ({ data }) => {
  const info = data?.data?.data;
  const [defaultProfileImage] = useAtom(profileImageAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState();
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleOnChange = (event) => {
    setPassword(event.target.value);
  };

  const userInfo = [
    {
      keyName: "Name",
      value: `${info?.firstName || ""} ${info?.lastName || ""}`,
    },
    { keyName: "Email", value: info?.email },
    { keyName: "Birth", value: info?.age },
    { keyName: "TEL", value: info?.phone },
    { keyName: "Country", value: codeToName(info?.country) },
    { keyName: "bio", value: info?.introduction },
    { keyName: "Role", value: info?.role },
    // { keyName: "Interests", value: info?.categoryList.join(", ") },
  ];

  return (
    <div className="min-w-[50%] flex justify-center items-center flex-col">
      <section className="p-10 border border-2 bg-white w-full">
        <Title className="text-xl mb-5 border-b">
          My Information
          <img
            className="w-7 rounded-full inline-block mb-2 ml-2"
            src={info?.profileImage || defaultProfileImage}
            alt="Profile Image"
          ></img>
        </Title>
        {userInfo.map((item, index) => (
          <KeyValueComponent
            key={index}
            keyName={item.keyName}
            value={item.value}
          />
        ))}
      </section>

      <section className="mt-10 mb-10 p-10 border border-2 bg-white w-full">
        <Title className="text-xl mb-5">Update Information</Title>
        <p className="text-gray-500">Go to Edit Information</p>
        <div className="relative w-full flex justify-end">
          <Button color="orange" size="base" onClick={openModalHandler}>
            <span className="material-symbols-outlined relative -bottom-1">
              edit
            </span>
            Edit
          </Button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <Title className="text-xl font-semibold mb-4">
              Edit Personal Information{" "}
            </Title>
            <p className="text-base text-gray-600">
              Please enter your password for user authentication
            </p>
            <InputOnly
              value={password || ""}
              type="password"
              id="password"
              label="password"
              onChange={handleOnChange}
            ></InputOnly>
            <Button
              color="white"
              size="sm"
              onClick={() => navigate("/mypage/information/fix")}
            >
              confirm
            </Button>
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default InformationForm;
