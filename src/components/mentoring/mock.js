const IMAGE_URL =
  "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400";

export const mockResponse = (data) => ({
  data: { success: true, response: data, error: null },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
  request: {},
});

export const userData = {
  uid: 1,
  firstName: "John",
  lastName: "Doe",
  profileImage: IMAGE_URL,
  country: "US",
  interest: ["Game", "LOL"],
  role: "mentor",
};

export const postsData = Array(4)
  .fill(null)
  .map((_, index) => ({
    pid: index,
    title: `글${index} 제목`,
    summary: `글${index} 내용의 첫 번째 줄입니다...`,
    writer: {
      uid: 1,
      firstName: "John",
      lastName: "Doe",
      profileImage: IMAGE_URL,
      country: "US",
      interest: ["Game", "LOL"],
      role: "mentor",
    },
  }));

export const addPostRes = { pid: 1 };
