const tagType = {
  Sport: "bg-blue-500 text-white",
  Game: "bg-teal-500 text-white",
  BTS: "bg-red-500 text-white",
  Drama: "bg-yellow-500 text-white",
  Soccer: "bg-purple-500 text-white",
  "K-pop": "bg-pink-500 text-white",
  Baseball: "bg-rose-500 text-white",
  LOL: "bg-lime-500 text-white",
  Youtuber: "bg-emerald-500 text-white",
  Mentor: "bg-blue-400 text-black",
  Mentee: "bg-yellow-100 text-black",
};

const Tag = ({ children, ...props }) => {
  const tagStyle = `${
    tagType[children]
  } py-1 px-2 text-xs rounded-lg border-2 ${
    children.includes("Ment") ? "border-black" : "border-[#0000]"
  }`;

  return (
    <span className={tagStyle} {...props}>
      {children}
    </span>
  );
};

export default Tag;
