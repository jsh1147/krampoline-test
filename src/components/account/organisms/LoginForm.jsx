import { useState } from "react";
import InputBox from "../atoms/InputBox";
import Button from "../../common/Button";

const LoginForm = ({ inputProps, inputGroup }) => {
  // jotai로 전역상태만 관리

  //핸들러는 hook으로 빼기
  // const [email, setEmail] = useState("");
  // const [pw, setPw] = useState("");

  // const handleChange = (event) => {
  //   const id = event.target.id;
  //   if (id === "email") {
  //     setEmail(event.target.value);
  //     console.log(event.target.value);
  //   }
  //   if (id === "pw") {
  //     setPw(event.target.value);
  //     console.log(event.target.value);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <main className="max-w-[500px]">
          {inputProps.map((props) => (
            <InputBox
              key={props.id}
              id={props.id}
              label={props.label}
              type={props.type}
              placeholder={props.placeholder}
            />
          ))}

          <Button color="orange" size="xl">
            Log In
          </Button>
        </main>
      </form>
    </>
  );
};

export default LoginForm;
