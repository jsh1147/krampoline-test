import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import VideoGrid from "../organisms/VideoGrid";
import { getVideos } from "../../../apis/watching/videos";
import { useInView } from "react-intersection-observer";
import Error from "../../account/atoms/Error";
import { Suspense } from "react";
import VideoSkeleton from "../atoms/Skeleton";
import { ErrorBoundary } from "react-error-boundary";
import Dropdown from "../../common/Dropdown";
import { CATEGORY } from "../../account/constants/TAGLIST";
import Title from "../../account/atoms/Title";
import { nameToCategoryId } from "../utils/categoryId";

const VideoList = () => {
  const { ref, inView } = useInView();
  const [category, setCategory] = useState("IDOL");

  const handleOptionChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["getVideos", category],
      ({ pageParam = 0 }) => {
        const categoryId = nameToCategoryId(category);
        return getVideos(pageParam, categoryId);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          if (!lastPage.isLast) return lastPage.nextPage;
          return undefined;
        },
        onSuccess: (data) => {
          console.log(data);
        },

        retry: false,
      }
    );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetchingNextPage, hasNextPage]);

  const videos = data?.pages.map((page) => page.videos).flat();

  return (
    <>
      <Title className="mt-20 text-base text-paragraph">
        You can choose a video
      </Title>
      <Title className="mb-20">Videos by Category</Title>
      <main className="w-[70%]">
        <ErrorBoundary
          fallback={<Error errorMessage="Failed to load video list" />}
        >
          {error ? (
            <Error errorMessage={error.message} />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<VideoSkeleton />}>
                <div>
                  <Dropdown
                    name="category"
                    options={CATEGORY.map((c) => c.category)}
                    selected={category}
                    onSelectedChange={handleOptionChange}
                    className="border-2 bg-white mb-10"
                  />
                  <VideoGrid
                    videos={videos}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    ref={ref}
                    error={error}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
};

export default VideoList;
