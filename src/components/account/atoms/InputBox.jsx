import React, { forwardRef } from "react";
import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { useController } from "react-hook-form";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5A906E",
      backgroundColor: "#F2F7F5",
    },
    secondary: {
      main: "#F9BC60",
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&.errorRequired": {
            color: "#FF8C00",
          },
          "&.helperTextSize": {
            fontSize: "0.8rem",
          },
        },
      },
    },
  },
});

export const InputBox = forwardRef((props, ref) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });

  let errorClass = "";
  if (error) {
    if (error?.type === "required") {
      errorClass = "errorRequired";
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <TextField
        onChange={(e) => {
          onChange(e);
          props.triggerValidation?.(props.name);
        }}
        onBlur={onBlur}
        value={value}
        inputRef={ref}
        label={props.label}
        id={props.id}
        type={props.type}
        variant={props.variant}
        name={props.name}
        multiline={props.multiline}
        rows={props.rows}
        color="secondary"
        error={invalid}
        helperText={error ? error.message : null}
        FormHelperTextProps={{ className: `${errorClass} helperTextSize` }}
        sx={{
          width: "100%",
          marginTop: 3,
          marginBottom: 2,
          ...(props.variant === "filled" && {
            "& .MuiFilledInput-root": {
              backgroundColor: `rgba(4, 180, 4, 0.02)`, //green with opacity
              "&.Mui-focused": {
                backgroundColor: theme.palette.primary.backgroundColor,
              },
            },
          }),
          ...(props.variant === "outlined" && {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.secondary.main,
              },
            },
          }),
        }}
      />
    </ThemeProvider>
  );
});

export const InputOnly = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        value={props.value}
        label={props.label}
        id={props.id}
        InputProps={{ readOnly: props.readOnly }}
        type={props.type}
        variant="outlined"
        color="secondary"
        onChange={props.onChange}
        sx={{
          width: "100%",
          marginTop: 3,
          marginBottom: 2,
        }}
      />
    </ThemeProvider>
  );
};
