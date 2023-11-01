import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useInputsState } from "../../../hooks/useInputsState";
import { editPostReq, getPostReq, getUser } from "../../../apis/mentoring/post";

import MentorCard from "./MentorCard";
import Button from "../../common/Button";

export default function EditSection() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostReq(postId),
  });

  const { data: userData } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const { mutate } = useMutation({ mutationFn: editPostReq });

  const { inputValue, handleInputChange } = useInputsState({
    title: data.data.response.title,
    content: data.data.response.content,
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (title.length > 50) e.target.value = title.slice(0, 50);
    handleInputChange(e);
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    if (content.length > 300) e.target.value = content.slice(0, 300);
    handleInputChange(e);
  };

  const handleEditClick = () => {
    if (userData.data.response.uid !== data.data.response.writer.uid) {
      toast("You are not the writer.");
      navigate(`/mentoring/post/${postId}`);
    } else if (inputValue.title && inputValue.content) {
      mutate(inputValue, {
        onSuccess: () => {
          toast("Successful edit.");
          navigate(`/mentoring/post/${postId}`);
        },
      });
    } else toast("No title or content has been written.");
  };

  const handleCancelClick = () => {
    if (confirm("All edits will be cancelled.\nDo you really want to go back?"))
      navigate(`/mentoring/post/${postId}`);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[58rem] m-12 p-12 bg-white flex flex-col">
        <h1 className="pb-4 text-center font-bold text-green-700">MENTORING</h1>
        <MentorCard info={data.data.response.writer} />
        <div>
          <input
            name="title"
            className="block w-full p-3 border focus:outline-none text-xl"
            placeholder="Title"
            onChange={handleTitleChange}
            value={inputValue.title}
          />
          <textarea
            name="content"
            className="block w-full h-96 resize-none p-3 border focus:outline-none"
            style={{}}
            placeholder="Find your study mate by writing a post that identifies you! (Maximum 300 characters)"
            onChange={handleContentChange}
            value={inputValue.content}
          />
        </div>
        <div className="py-3 space-x-2">
          <Button color="white" size="sm" onClick={handleEditClick}>
            Edit
          </Button>
          <Button color="orange" size="sm" onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
