import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import COUNTRY from "../constants/COUNTRY";
import CheckBox from "../atoms/CheckBox";
import { register } from "../../../apis/user";

const SignupForm = ({ inputProps }) => {
  const methods = useForm();
  const { watch, control, handleSubmit } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");

  const [country, setCountry] = useState("the United States");

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // const [categoryList, setCategoryList] = useState("");

  const onSubmit = async () => {
    try {
      const response = await register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: role,
        country: country,
        age: 21,
        // categoryList: categoryList,
        categoryList: ["Sports", "IDOL", "K-POP"],
        phone: phone,
        introduction: null,
        profileImage: null,
      });

      if (response.data.success === true) {
        // 성공적으로 회원가입한 경우 메인 페이지로 이동
        alert("정상적으로 회원가입 되었습니다.");
        navigate("/");
      } else {
        // 회원 가입 실패
        console.error("sign up failed");
      }
    } catch (error) {
      // 에러 처리
      console.error(error);
      // 회원 가입 요청 실패
      console.error("register request failed");
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
              value="Mentor"
              type="radio"
              checked={role === "Mentor"}
              onChange={handleRoleChange}
            >
              Mentor
            </CheckBox>
            <CheckBox
              name="role"
              value="Mentee"
              type="radio"
              checked={role === "Mentee"}
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
