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
  firstName: "Kevin",
  lastName: "",
  profileImage: IMAGE_URL,
  country: "US",
  interest: ["Game", "LOL"],
  role: "mentor",
};

export const postsData = [1, 2, 3].map(() => ({
  pid: 1,
  title: "글 제목",
  summary: "글 내용의 첫 번째 줄입니다...",
  writer: {
    uid: 1,
    firstName: "Kevin",
    lastName: "",
    profileImage: IMAGE_URL,
    country: "US",
    interest: ["Game", "LOL"],
    role: "mentor",
  },
}));

export const postData = {
  pid: 1,
  title: "글 제목",
  content: `글 내용의 첫 번째 줄입니다. 두 번째 줄입니다. 세 번째 줄입니다.`,
  writer: {
    uid: 1,
    firstName: "Kevin",
    lastName: "",
    profileImage: IMAGE_URL,
    country: "US",
    interest: ["Game", "LOL"],
    role: "mentor",
  },
  mentees: [
    {
      uid: 2,
      firstName: "Jane",
      lastName: "",
      profileImage: IMAGE_URL,
      country: "DK",
      interest: ["Game", "Soccer"],
      role: "mentor",
      state: "await",
    },
    {
      uid: 3,
      firstName: "Miho",
      lastName: "",
      profileImage: IMAGE_URL,
      country: "JP",
      interest: ["Game", "K-pop"],
      role: "mentor",
      state: "accept",
    },
    {
      uid: 4,
      firstName: "Michael",
      lastName: "",
      profileImage: IMAGE_URL,
      country: "US",
      interest: ["Soccer", "LOL"],
      role: "mentor",
      state: "refuse",
    },
  ],
};

export const addEditPostRes = { pid: 1 };
