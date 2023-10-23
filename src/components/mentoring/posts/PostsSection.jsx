import { useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { getUser } from "../../../apis/mentorPost";
import { useInputsRef } from "../../../hooks/useInputsRef";

import Error from "./Error";
import Loader from "./PostCardSkeleton";
import PostList from "./PostList";

export default function PostsSection() {
  const { data } = useQuery({ queryKey: ["user"], queryFn: getUser });

  const [searchValue, setSearchValue] = useState({
    category: "title",
    search: "",
  });

  const { inputValue, handleInputChange } = useInputsRef({
    category: "title",
    search: "",
  });

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) setSearchValue(inputValue.current);
  };

  return (
    <div className="w-[58rem] mx-auto my-16 flex flex-col space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="inline-block text-4xl font-bold text-green-700">
          Mentoring List
        </h1>
        {data.data.response.role === "mentor" && (
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
          onChange={handleInputChange}
          onKeyUp={handleSearchEnter}
        ></input>
      </div>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary
          fallback={<Error errorMessage="Failed to load mentoring list" />}
        >
          <PostList
            category={searchValue.category}
            search={searchValue.search}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
