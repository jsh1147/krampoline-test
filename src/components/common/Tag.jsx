import { CATEGORY, ROLE } from "../account/constants/TAGLIST";

// const tagType = {
//   Sport: "bg-blue-500 text-white",
//   Game: "bg-sky-500 text-white",
//   BTS: "bg-red-500 text-white",
//   Drama: "bg-yellow-500 text-white",
//   Soccer: "bg-purple-500 text-white",
//   "K-pop": "bg-pink-500 text-white",
//   Baseball: "bg-rose-500 text-white",
//   LOL: "bg-indigo-500 text-white",
//   Youtuber: "bg-fuchsia-500 text-white",
//   Mentor: "border-pink-400 text-pink-400 font-bold",
//   Mentee: "border-green-500 text-green-500 font-bold",
// };

const Tag = ({ children, ...props }) => {
  const tagList = [
    ...CATEGORY.map((item) => ({ ...item, type: "category" })),
    ...ROLE.map((item) => ({ ...item, type: "role" })),
  ];

  const tagInfo = tagList.find(
    (item) => item.category === children || item.role === children
  );

  // 스타일 설정
  const tagStyle = `${
    tagInfo?.style || ""
  } py-1 px-2 text-xs rounded-xl border-2 ${
    children.includes("Ment") ? "" : "border-[#0000]"
  }`;
  return (
    <span className={tagStyle} {...props}>
      {children}
    </span>
  );
};

export default Tag;
