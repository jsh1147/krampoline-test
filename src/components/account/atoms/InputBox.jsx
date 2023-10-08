const InputBox = ({ className, ...props }) => {
  return (
    <>
      <label htmlFor={props.id} className={`${className}`}>
        {props.label}
        <input
          id={props.id}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          className="border-b-2 border-orange focus:border-b-0 focus:outline-none focus:ring focus:ring-orange  mt-4 mb-4 p-4 w-[100%] text-base"
        ></input>
      </label>
    </>
  );
};

export default InputBox;
