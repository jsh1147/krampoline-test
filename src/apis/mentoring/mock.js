// isMock가 true일 경우 통신에 mock 데이터를 사용함
export const isMock = true;

const IMAGE_URL =
  "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400";

export const mockResponse = (data) => ({
  data: { status: "success", data: data, message: null },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
  request: {},
});

export const userData = {
  userId: 1,
  profileImage: IMAGE_URL,
  name: "John Doe",
  country: "US",
  role: "MENTOR",
  interests: ["IDOL", "Game"],
  birthDate: "2002-10-30",
};

export const postsData = [1, 2, 3].map(() => ({
  postId: 1,
  title: "글 제목",
  content: "글 내용의 첫 번째 줄입니다...",
  postState: "ACTIVE",
  writerDTO: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    role: "MENTOR",
    interests: ["IDOL", "Game"],
    birthDate: "2002-10-30",
  },
}));

export const postData = {
  postId: 1,
  title: "글 제목",
  content: `글 내용의 첫 번째 줄입니다. 두 번째 줄입니다. 세 번째 줄입니다.`,
  postState: "ACTIVE",
  writerDTO: {
    mentorId: 1,
    profileImage: IMAGE_URL,
    name: "John Doe",
    country: "US",
    role: "MENTOR",
    interests: ["IDOL", "Game"],
    birthDate: "2002-10-30",
  },
  connections: [
    {
      connectionId: 1,
      connectionState: "AWAIT",
      menteeDTO: {
        menteeId: 2,
        name: "Jane",
        profileImage: IMAGE_URL,
        country: "DK",
        interests: ["Game", "Sports"],
        role: "MENTEE",
        birthDate: "1999-07-16",
      },
    },
    {
      connectionId: 2,
      connectionState: "ACCEPT",
      menteeDTO: {
        menteeId: 3,
        name: "Miho",
        profileImage: IMAGE_URL,
        country: "JP",
        interests: ["Game", "K-POP"],
        role: "MENTEE",
        birthDate: "2007-03-25",
      },
    },
    {
      connectionId: 3,
      connectionState: "REFUSE",
      menteeDTO: {
        menteeId: 4,
        name: "Michael",
        profileImage: IMAGE_URL,
        country: "US",
        interests: ["Sports", "Movie"],
        role: "MENTEE",
        birthDate: "1985-11-15",
      },
    },
  ],
};

export const mutateRes = { postId: 1 };
