export const mockUsers = {
  "user@example.com": {
    firstName: "John",
    lastName: "Doe",
    email: "user@example.com",
    password: "password123!",
    profileImage:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400",
    role: "Mentor",
    categoryList: ["Sports", "IDOL", "K-POP"],
    country: "IL",
    phone: "010-1111-1111",
    age: 21,
    introduction: "Hi! I'm John Doe",
  },
};

export const mockResponse = (data) => ({
  data: data,
  status: 200,
  statusText: "OK",
  headers: {
    authorization: "Bearer {JWT Token}",
  },
  config: {},
  request: {},
});
