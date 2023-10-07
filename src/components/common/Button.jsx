const btnColor = {
  orange: "bg-orange text-white border-orange",
  white: "bg-white text-orange border-orange",
};

const btnSize = {
  sm: "py-1 px-2 text-sm min-w-[4.5rem]",
  base: "py-2 px-4 text-base min-w-[6rem]",
  lg: "py-3 px-6 text-lg min-w-[7.5rem]",
};

const Button = ({ color, size, onClick, children }) => {
  const btnStyle = `${btnColor[color]} ${btnSize[size]} border-2 rounded-lg`;

  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
