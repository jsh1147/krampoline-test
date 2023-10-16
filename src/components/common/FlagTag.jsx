import ReactCountryFlag from "react-country-flag";

const FlagTag = ({ children }) => {
  return (
    <span
      className={`py-1 px-2 bg-white border-2 border-black rounded-lg text-xs }`}
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
