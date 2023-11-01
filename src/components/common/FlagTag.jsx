import ReactCountryFlag from "react-country-flag";

const FlagTag = ({ children }) => {
  return (
    <span
      className={`py-[2.7px] px-2 border-2 border-white bg-white rounded-xl text-xs }`}
    >
      <ReactCountryFlag
        style={{
          width: "2em",
          height: "1.5em",
          boxShadow: "0px 0px 1px gray",
        }}
        countryCode={children}
        svg
      />
    </span>
  );
};

export default FlagTag;
