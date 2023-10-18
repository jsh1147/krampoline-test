export const mockUsers = {
  "user@example.com": {
    email: "user@example.com",
    password: "password123!",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    country: "US",
    interest: null,
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
