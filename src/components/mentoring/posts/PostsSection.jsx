import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../../apis/mentoring/post";
import { useInputsState } from "../../../hooks/useInputsState";
import { RoleType } from "../../../constants/user";

import Fallback from "../../common/Fallback";
import Error from "../../common/Error";
import PostCardSkeletons from "./PostCardSkeletons";
import PostList from "./PostList";

export default function PostsSection() {
  const { data } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const [searchValue, setSearchValue] = useState({
    category: "title",
    search: "",
  });

  const { inputValue, handleInputChange } = useInputsState({
    category: "title",
    search: "",
  });

  const handleSerchChange = (e) => {
    const search = e.target.value;
    if (search.length > 50) e.target.value = search.slice(0, 50);
    handleInputChange(e);
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) setSearchValue(inputValue);
  };

  return (
    <div className="w-[58rem] mx-auto my-16 flex flex-col space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="inline-block text-4xl font-bold text-green-700">
          Mentoring List
        </h1>
        {data.data.response.role === RoleType.MENTOR && (
          <Link
            className="px-2 py-1 border-2 rounded-lg border-orange text-lg text-orange font-semibold"
            to="/mentoring/write"
          >
            Write
          </Link>
        )}
      </div>
      <div className="p-2 border-b-2 bg-white flex items-center space-x-2 text-sm">
        <select
          className="focus:outline-none"
          name="category"
          onChange={handleInputChange}
          value={inputValue.category}
        >
          {["Title", "Writer", "Interest"].map((val) => (
            <option
              key={`category-${val.toLowerCase()}`}
              value={val.toLowerCase()}
            >
              {val}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined">search</span>
        <input
          className="w-full focus:outline-none"
          name="search"
          placeholder="Search"
          onChange={handleSerchChange}
          onKeyUp={handleSearchEnter}
          value={inputValue.search}
        ></input>
      </div>
      <Fallback
        Loader={PostCardSkeletons}
        Error={Error}
        errorMessage="Failed to load mentoring list"
      >
        <PostList category={searchValue.category} search={searchValue.search} />
      </Fallback>
    </div>
  );
}
