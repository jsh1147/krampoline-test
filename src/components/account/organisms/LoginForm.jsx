import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "../../../store";
import { login } from "../../../apis/user";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ inputProps }) => {
  const navigate = useNavigate();
  const methods = useForm();
  const { watch, control, handleSubmit } = methods;
  const email = watch("email");
  const password = watch("password");
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);

  const onSubmit = async () => {
    try {
      const response = await login({
        email: email,
        password: password,
      });

      if (response.data.success === true) {
        setUser(response.data.user);
        setToken(response.headers.authorization);
        console.log("login success");
        navigate("/");
      } else {
        // 로그인 실패
        console.error("login failed");
      }
    } catch (error) {
      // 로그인 요청 실패
      console.error("Error during login:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <main className="max-w-[500px]">
          {inputProps.map((inputField) => (
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
          ))}
          <Button color="orange" size="xl" type="submit">
            Log In
          </Button>
        </main>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
