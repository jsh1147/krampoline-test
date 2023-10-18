const LOGIN = Object.freeze([
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
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!~`<>,./?;:'"\[\]{}\\()|_-])\S{8,16}$/,
        message:
          "Password must be within 8-16, including all English case, numbers, and special characters.",
      },
    },
  },
]);

export default LOGIN;
