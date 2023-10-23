import MentorCard from "./MentorCard";
import Button from "../../common/Button";

export default function EditSection() {
  const handleButtonClick = () => {};

  return (
    <div className="m-4 p-4 bg-white flex flex-col">
      <h1>MENTORING</h1>
      <MentorCard />
      <div>
        <input />
        <textarea />
      </div>
      <div>
        <Button color="white" size="sm" onClick={handleButtonClick}>
          Edit
        </Button>
        <Button color="orange" size="sm" onClick={handleButtonClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
