import { Link, useLocation } from "react-router-dom";
import { navStructure } from "./navStructure";
import useLogin from "../components/account/hooks/useLogin";
import React from "react";
import { useAtom } from "jotai";
import { profileImageAtom } from "../store/index";
import { useQuery } from "@tanstack/react-query";
import { simpleUserInfo } from "../apis/mypage";

export default function GNB({ profileImage }) {
  const { logoutUser } = useLogin();
  const [defaultProfileImage] = useAtom(profileImageAtom);

  const auth = window.localStorage.getItem("isLogin");

  const { isLoading, data } = useQuery({
    queryKey: ["simpleUserInfo"],
    queryFn: simpleUserInfo,
    enabled: !!auth,
  });

  const currentUrl = useLocation()
    .pathname.replace(/\d/g, "")
    .replace(/^\/+|\/+$/g, "");

  return (
    (!auth || !isLoading) && (
      <nav className="fixed z-20 top-0 w-full h-20 bg-white text-green-900">
        {/* 상단GNB */}
        <div className="h-12 px-16 border flex items-center">
          {/* 상단GNB - 상단Nav */}
          <div className="flex-1 flex justify-start space-x-4">
            {navStructure.map((val) => (
              <Link
                key={val.mainNav}
                className={`w-20 h-7 text-center hover:text-green-700 hover:font-bold text-sm${
                  currentUrl.includes(val.mainUrl)
                    ? " border-b-2 border-orange font-bold"
                    : ""
                }`}
                to={val.sub[0].url[0]}
              >
                {val.mainNav}
              </Link>
            ))}
          </div>
          {/* 상단GNB - 로고 */}
          <div className="flex-1 flex justify-center">
            <Link className="flex items-center" to="/watching/videos">
              <span className="material-symbols-outlined">psychiatry</span>
              <span className="text-lg font-semibold">Garden</span>
            </Link>
          </div>
          {/* 상단GNB - 계정 */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {auth ? (
              <>
                <div>
                  <img
                    className="object-fill w-7 h-7 rounded-full"
                    src={data.data.data.profileImage || defaultProfileImage}
                    alt="profile"
                  ></img>
                </div>
                <Link
                  className="pl-1 pr-2 py-[2px] border-2 border-orange rounded"
                  to={"/videos"}
                  onClick={logoutUser}
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
                to={"/users/login"}
              >
                <span className="flex items-center text-xs text-white">
                  <span className="material-symbols-outlined">login</span>
                  <span className="px-1">Log In</span>
                </span>
              </Link>
            )}
          </div>
        </div>
        {/* 하단 GNB(Nav) */}
        <div
          className={`h-8 ${
            navStructure.find((val) => currentUrl.includes(val.mainUrl))
              .subPadding
          } border space-x-4`}
        >
          {navStructure
            .find((val) => currentUrl.includes(val.mainUrl))
            .sub.map((val) => (
              <Link
                key={val.subNav}
                className={`text-xs hover:text-orange  ${
                  val.url.includes(currentUrl)
                    ? " text-orange font-semibold"
                    : ""
                }`}
                to={val.url[0]}
              >
                {val.subNav}
              </Link>
            ))}
        </div>
      </nav>
    )
  );
}
