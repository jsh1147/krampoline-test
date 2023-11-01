import React from "react";
import Radio from "@mui/material/Radio";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9BC60",
    },
  },
});

const RadioButton = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <label>
        <Radio
          type={props.type}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
          inputProps={props.inputProps}
        />
        {children}
      </label>
    </ThemeProvider>
  );
};

export default RadioButton;
