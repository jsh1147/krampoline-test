export const navStructure = [
  {
    mainNav: "Watching",
    mainUrl: "watching",
    sub: [
      { subNav: "Video", url: ["watching/videos", "watching/video"] },
      { subNav: "History", url: ["watching/History"] },
    ],
    subPadding: "pl-[3.7rem]",
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
    subPadding: "pl-[9.5rem]",
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
    subPadding: "pl-[16rem]",
  },
  {
    mainNav: "My Page",
    mainUrl: "mypage",
    sub: [
      {
        subNav: "Profile",
        url: ["mypage/profiles/:id", "mypage/profile/fix/:id"],
      },
      {
        subNav: "Information",
        url: ["mypage/information/:id", "mypage/information/fix/:id"],
      },
    ],
    subPadding: "pl-[20.7rem]",
  },
];
