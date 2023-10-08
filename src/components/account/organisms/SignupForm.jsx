import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import COUNTRIES from "../constants/COUNTRY";

const SignupForm = ({ inputProps }) => {
  const [selectedOption, setSelectedOption] = useState("the United States");

  const handleOptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-[500px]">
          <div className="flex gap-10">
            {inputProps
              .filter(
                (props) => props.id === "FirstName" || props.id === "LastName"
              )
              .map((props) => (
                <InputBox
                  key={props.id}
                  id={props.id}
                  label={props.label}
                  type={props.type}
                  placeholder={props.placeholder}
                  className={props.className}
                />
              ))}
          </div>
          {inputProps
            .filter(
              (props) => props.id !== "FirstName" && props.id !== "LastName"
            )
            .map((props) => (
              <InputBox
                key={props.id}
                id={props.id}
                label={props.label}
                type={props.type}
                placeholder={props.placeholder}
                className={props.className}
              />
            ))}
          <Dropdown
            options={COUNTRIES.map((index) => index.name)}
            selected={selectedOption}
            onSelectedChange={handleOptionChange}
          />

          <Button color="orange" size="xl">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
