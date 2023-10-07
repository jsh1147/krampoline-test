import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavState } from "/src/hooks/useNavState.js";

const nav = [
  {
    mainNav: "Watching",
    mainUrl: "watching",
    sub: [
      { subNav: "Video", url: ["watching/videos", "watching/video"] },
      { subNav: "History", url: ["watching/History"] },
    ],
  },
  {
    mainNav: "Mentoring",
    mainUrl: "mentoring",
    sub: [
      {
        subNav: "List",
        url: [
          "mentoring/posts",
          "mentoring/post",
          "mentoring/write",
          "mentoring/edit",
        ],
      },
      { subNav: "Dashboard", url: ["mentoring/dashboard"] },
    ],
  },
  {
    mainNav: "Chatting",
    mainUrl: "chatting",
    sub: [
      {
        subNav: "Open Chatting",
        url: [
          "chatting/rooms",
          "chatting/roomprofile",
          "chatting/room",
          "chatting/create",
        ],
      },
    ],
  },
  {
    mainNav: "My Page",
    mainUrl: "mypage",
    sub: [
      { subNav: "Profile", url: ["mypage/profile", "mypage/profile/fix"] },
      {
        subNav: "Information",
        url: ["mypage/information", "mypage/information/fix"],
      },
    ],
  },
];

export default function GNB() {
  const { currentUrl, selectedmainNav, setselectedMainNav } = useNavState();
  // 로그인 기능 생기기 전까지 임시 로그인 판단 방식
  const [auth, setAuth] = useState(
    window.localStorage.getItem("token") ? true : false
  );
  // api 기능 생기기 전까지 임시 프로필 이미지 경로
  const profileImageUrl =
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400";

  useEffect(() => {
    setselectedMainNav(
      nav.find((val) => val.mainUrl === currentUrl.split("/")[0]).mainNav
    );
  }, [setselectedMainNav, currentUrl]);

  const handleNavMouseLeave = () => {
    setselectedMainNav(
      nav.find((val) => val.mainUrl === currentUrl.split("/")[0]).mainNav
    );
  };

  const handleMainNavClick = (e) => {
    setselectedMainNav(e.target.innerText);
  };

  const handleLogOutClick = () => {
    window.localStorage.removeItem("token");
    setAuth(window.localStorage.getItem("token") ? true : false);
  };

  return (
    <nav
      className="fixed top-0 w-full h-20 bg-white text-green-900"
      onMouseLeave={handleNavMouseLeave}
    >
      {/* 상단GNB */}
      <div className="h-12 px-16 border flex items-center">
        {/* 상단GNB - 상단Nav */}
        <div className="flex-1 flex justify-start space-x-4">
          {nav.map((val) => (
            <button
              key={`mainNav-${val.mainNav}`}
              className={`w-20 h-7 text-center text-sm${
                val.mainNav === selectedmainNav ? " font-bold" : ""
              }${
                currentUrl.includes(val.mainUrl)
                  ? " border-b-2 border-orange"
                  : ""
              }`}
              onClick={handleMainNavClick}
            >
              {val.mainNav}
            </button>
          ))}
        </div>
        {/* 상단GNB - 로고 */}
        <div className="flex-1 flex justify-center">
          <Link className="flex items-center" to="/watching/videos">
            <span className="material-symbols-outlined">deceased</span>
            <span className="text-lg font-semibold">Garden</span>
          </Link>
        </div>
        {/* 상단GNB - 계정 */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          {auth ? (
            <>
              <div>
                <img
                  className="w-7 rounded-full"
                  src={profileImageUrl}
                  alt="기본 프로필 사진"
                ></img>
              </div>
              <Link
                className="pl-1 pr-2 py-[2px] border-2 border-orange rounded"
                to={"/watching/videos"}
                onClick={handleLogOutClick}
              >
                <span className=" flex items-center text-xs text-orange">
                  <span className="material-symbols-outlined">logout</span>
                  Log Out
                </span>
              </Link>
            </>
          ) : (
            <Link
              className="pl-1 pr-2 py-[2px] bg-orange border-2 border-orange rounded"
              to={"/login"}
            >
              <span className="flex items-center text-xs text-white">
                <span className="material-symbols-outlined">login</span>
                <span className="px-1">Log In</span>
              </span>
            </Link>
          )}
          {/* 로그인 기능이 생기기 전까지 임시 로그인 */}
          <div
            className="px-2 py-1 bg-green-500 rounded text-xs text-white"
            onClick={function () {
              if (auth) window.localStorage.removeItem("token");
              else window.localStorage.setItem("token", "Bearer 1234");
              setAuth(window.localStorage.getItem("token") ? true : false);
            }}
          >
            TEST
          </div>
        </div>
      </div>
      {/* 하단 GNB(Nav) */}
      <div className="h-8 px-16 border space-x-4">
        {nav
          .find((val) => val.mainNav === selectedmainNav)
          .sub.map((val) => (
            <Link
              key={`subNav-${val.subNav}`}
              className={`text-xs${
                val.url.includes(currentUrl) ? " text-orange font-semibold" : ""
              }`}
              to={val.url[0]}
            >
              {val.subNav}
            </Link>
          ))}
      </div>
    </nav>
  );
}
