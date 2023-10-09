import Title from "../atoms/Title";
import Footer from "../../../layouts/Footer";
import LoginForm from "../organisms/LoginForm";
import LOGIN from "../constants/LOGIN";
import { Link } from "react-router-dom";

const LoginTemplate = () => {
  return (
    <>
      <main className="mt-20 justify-center items-center flex flex-col">
        <Title>Log In</Title>
        <LoginForm inputProps={LOGIN} />
        <div className="mt-4">
          <p className="text-sm text-blue-900 ml-2">
            No account yet?{" "}
            <Link to="/signup" className="text-sm font-bold ml-2 text-blue-900">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default LoginTemplate;
