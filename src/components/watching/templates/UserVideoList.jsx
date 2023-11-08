import Title from "../../account/atoms/Title";
import Error from "../../account/atoms/Error";
import { Suspense } from "react";
import VideoGrid from "../organisms/VideoGrid";
import { useQuery } from "@tanstack/react-query";
import { getUserVideos } from "../../../apis/watching/videos";
import { ErrorBoundary } from "react-error-boundary";
import VideoSkeleton from "../atoms/Skeleton";
import Grid from "../atoms/Grid";
import VideoCard from "../molecules/VideoCard";

const UserVideoList = () => {
  const { data, isError, error } = useQuery(["getUserVideos"], getUserVideos, {
    suspense: true,
  });

  const videos = data?.data?.data?.response;

  if (error) {
    return <Error errorMessage={error.errorMessage}></Error>;
  }
  if (!videos || videos.length === 0) {
    return <p>유효한 데이터가 없습니다.</p>;
  }

  return (
    <>
      <Title className="mb-20">Videos for you</Title>
      <main className="w-[70%] mb-20 ">
        <ErrorBoundary
          fallback={<Error errorMessage="Failed to load video list" />}
        >
          {isError ? (
            <Error errorMessage={error.message} />
          ) : (
            <>
              <Suspense fallback={<VideoSkeleton />}>
                <div>
                  <Grid>
                    {videos.map((video) => (
                      <VideoCard key={video.videoId} video={video} />
                    ))}
                  </Grid>
                </div>
              </Suspense>
            </>
          )}
        </ErrorBoundary>
      </main>
    </>
  );
};

export default UserVideoList;
