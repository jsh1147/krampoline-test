import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";

const LoginForm = ({ inputProps }) => {
  const methods = useForm();
  const { watch, control, handleSubmit } = methods;
  const email = watch("email");
  const password = watch("password");

  const [user, setUser] = useAtom(userAtom);

  const onSubmit = (data) => {
    console.log("Email:", email);
    console.log("Password:", password);

    setUser({ email, password });
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
