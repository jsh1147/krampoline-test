import Title from "../atoms/Title";
import Footer from "../../../layouts/Footer";
import SignupForm from "../organisms/SignupForm";
import SIGNUP from "../constants/SIGNUP";
import { Link } from "react-router-dom";
const SignupTemplate = () => {
  return (
    <>
      <main className="justify-center items-center flex flex-col">
        <Title className="mb-10">Sign Up</Title>
        <SignupForm inputProps={SIGNUP} />
        <div className="mt-4">
          <p className="text-sm text-blue-900 ml-2">
            Already have an account?{" "}
            <Link to="/login" className="text-sm font-bold ml-2 text-blue-900">
              Log In
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignupTemplate;
