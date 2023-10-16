const SIGNUP = Object.freeze([
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "first Name",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).*$/,
        message: "Names cannot contain special characters and numbers.",
      },
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Last Name",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^(?![!@#$%^&*()\-_+=]).*$/,
        message: "Names cannot contain special characters and numbers.",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "email address",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "You must keep the format of the e-mail.",
      },
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "password",
    variant: "filled",
    rules: {
      required: "The input box must not be empty.",
      pattern: {
        value:
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[a-zA-Z0-9!@#$%^&*()\-_+=]{8,20}$/,
        message:
          "Password must be within 8-20, including all English case, numbers, and special characters.",
      },
    },
  },
]);

export default SIGNUP;
