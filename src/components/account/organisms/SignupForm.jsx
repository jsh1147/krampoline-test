import { InputBox } from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import COUNTRY from "../constants/COUNTRY";
import { register, emailCheck } from "../../../apis/user";
import RadioButton from "../atoms/RadioButton";
import BasicDatePicker from "../atoms/DatePicker";
import SelectTag from "../atoms/SelectTag";

const SignupForm = ({ inputProps }) => {
  const methods = useForm();
  const { watch, control, handleSubmit, setError, clearErrors } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const phone = watch("phone");
  const password = watch("password");
  const passwordCheck = watch("passwordcheck");
  const age = watch("age");

  const [country, setCountry] = useState("the United States");

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // const [categoryList, setCategoryList] = useState("");

  const handleEmailConfirm = async () => {
    const response = await emailCheck({ email: email });
    if (response.data.success === false) {
      setError(
        "email",
        { message: "Can't use this email" },
        { shouldFocus: true }
      );
      return false;
    } else {
      return true;
    }
  };

  const handlePasswordConfirm = () => {
    if (password && passwordCheck) {
      if (password !== passwordCheck) {
        setError(
          "passwordcheck",
          { message: "Passwords do not match" },
          { shouldFocus: true }
        );
        return false;
      } else {
        clearErrors("passwordcheck");
        return true;
      }
    }
  };

  const onSubmit = async () => {
    try {
      //email과 password 값 유효 먼저 체크
      const emailIsValid = await handleEmailConfirm(); //
      const passwordIsValid = await handlePasswordConfirm();

      if (emailIsValid && passwordIsValid) {
        const response = await register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
          country: country,
          age: age,
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
      } else {
        console.error("email is not valid");
      }
    } catch (error) {
      // 에러 처리
      console.error(error);
      // 회원 가입 요청 실패
      console.error("register request failed");
    }
  };

  const renderController = (inputField) => {
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
            helperText={fieldState.invalid ? fieldState.error.message : ""}
            triggerValidation={methods.trigger}
          />
        )}
      />
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="max-w-[500px]">
            <div className="flex gap-10">
              {inputProps
                .filter(
                  (props) =>
                    props.name === "firstName" || props.name === "lastName"
                )
                .map(renderController)}
            </div>
            {inputProps
              .filter(
                (inputField) =>
                  inputField.name !== "firstName" &&
                  inputField.name !== "lastName"
              )
              .map(renderController)}
            <Controller
              name="age"
              control={methods.control}
              render={(field) => (
                <BasicDatePicker
                  {...field}
                  control={methods.control}
                  name="age"
                  value={age}
                />
              )}
            />
            <RadioButton
              name="role"
              value="Mentor"
              type="radio"
              checked={role === "Mentor"}
              onChange={handleRoleChange}
              inputProps={{ "aria-label": "Mentor" }}
            >
              Mentor
            </RadioButton>
            <RadioButton
              name="role"
              value="Mentee"
              type="radio"
              checked={role === "Mentee"}
              onChange={handleRoleChange}
              inputProps={{ "aria-label": "Mentee" }}
            >
              Mentee
            </RadioButton>
            <Dropdown
              name="country"
              options={COUNTRY.map((country) => country.name)}
              selected={country}
              onSelectedChange={handleOptionChange}
            />

            <SelectTag />
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
