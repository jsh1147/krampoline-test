import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import COUNTRY from "../constants/COUNTRY";
import CheckBox from "../atoms/CheckBox";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { register } from "../../../apis/user";

const SignupForm = ({ inputProps }) => {
  const methods = useForm();
  const { watch, control, handleSubmit } = methods;
  const [user, setUser] = useAtom(userAtom);
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const password = watch("password");

  const [country, setCountry] = useState("the United States");

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [interest, setInterest] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
        role,
        country,
        interest,
      });

      setUser({
        firstName,
        lastName,
        email,
        password,
        role,
        country,
        interest,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="w-[500px]">
            <div className="flex gap-10">
              {inputProps
                .filter(
                  (props) =>
                    props.name === "firstName" || props.name === "lastName"
                )
                .map((inputField) => {
                  return (
                    <Controller
                      name={inputField.name}
                      key={inputField.name}
                      control={methods.control}
                      defaultValue=""
                      rules={inputField.rules}
                      render={({ field, fieldState }) => (
                        <InputBox
                          {...field}
                          id={inputField.name}
                          label={inputField.label}
                          variant={inputField.variant}
                          type={inputField.type}
                          placeholder={inputField.placeholder}
                          error={fieldState.invalid}
                          helperText={
                            fieldState.invalid ? fieldState.error.message : ""
                          }
                          triggerValidation={methods.trigger}
                        />
                      )}
                    />
                  );
                })}
            </div>
            {inputProps
              .filter(
                (inputField) =>
                  inputField.name !== "firstName" &&
                  inputField.name !== "lastName"
              )
              .map((inputField) => {
                return (
                  <Controller
                    name={inputField.name}
                    key={inputField.name}
                    control={methods.control}
                    defaultValue=""
                    rules={inputField.rules}
                    render={({ field, fieldState }) => (
                      <InputBox
                        {...field}
                        id={inputField.name}
                        label={inputField.label}
                        variant={inputField.variant}
                        type={inputField.type}
                        placeholder={inputField.placeholder}
                        error={fieldState.invalid}
                        helperText={
                          fieldState.invalid ? fieldState.error.message : ""
                        }
                        triggerValidation={methods.trigger}
                      />
                    )}
                  />
                );
              })}
            <CheckBox
              name="role"
              value="mentor"
              type="radio"
              checked={role === "mentor"}
              onChange={handleRoleChange}
            >
              Mentor
            </CheckBox>
            <CheckBox
              name="role"
              value="mentee"
              type="radio"
              checked={role === "mentee"}
              onChange={handleRoleChange}
            >
              Mentee
            </CheckBox>
            <Dropdown
              name="country"
              options={COUNTRY.map((country) => country.name)}
              selected={country}
              onSelectedChange={handleOptionChange}
            />
            <Button color="orange" size="xl">
              Sign Up
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupForm;
