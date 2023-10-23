import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useInputsRef } from "../../../hooks/useInputsRef";

import Error from "../posts/Error";
import Loader from "../posts/Loader";
import MentorCard from "./MentorCard";
import Button from "../../common/Button";
import { addPostReq } from "../../../apis/mentorPost";

export default function WriteSection() {
  const navigate = useNavigate();
  const { inputValue, handleInputChange } = useInputsRef({
    title: "",
    content: "",
  });

  const { mutate } = useMutation({ mutationFn: addPostReq });

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length > 300) e.target.value = content.slice(0, 300);
    handleInputChange(e);
  };

  const handlePostClick = () => {
    if (inputValue.current.title && inputValue.current.content) {
      mutate(inputValue.current, {
        onSuccess: (res) => {
          alert("Successfully written.");
          navigate(`/mentoring/post/${res.data.response.pid}`);
        },
      });
    } else alert("No title or content has been written.");
  };

  const handleCancelClick = () => {
    if (inputValue.current.title || inputValue.current.content) {
      if (
        confirm(
          "There's something you're writing.\nDo you really want to go back?"
        )
      )
        navigate("/mentoring/posts");
    } else navigate("/mentoring/posts");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-12 p-12 bg-white flex flex-col">
        <h1 className="pb-4 text-center font-bold text-green-700">MENTORING</h1>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary
            fallback={<Error errorMessage="Failed to load mentoring list" />}
          >
            <MentorCard />
          </ErrorBoundary>
        </Suspense>

        <div>
          <input
            name="title"
            className="block w-full p-3 border focus:outline-none text-xl"
            placeholder="Title"
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            className="block w-full h-96 resize-none p-3 border focus:outline-none"
            style={{}}
            placeholder="Find your study mate by writing a post that identifies you! (Maximum 300 characters)"
            onChange={handleContentChange}
          />
        </div>
        <div className="py-3 space-x-2">
          <Button color="white" size="sm" onClick={handlePostClick}>
            Post
          </Button>
          <Button color="orange" size="sm" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
