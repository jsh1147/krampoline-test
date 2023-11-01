import React, { forwardRef } from "react";
import { useController } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material";
import dayjs from "dayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9BC60",
    },
  },
});

const maxDate = dayjs("2023-10-22");

const BasicDatePicker = forwardRef((props, ref) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { required: "Birth date must not be empty." },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onBlur={onBlur}
          value={value || null}
          inputRef={ref}
          label="Birth"
          id="age"
          name={props.name}
          format="YYYY-MM-DD"
          maxDate={maxDate}
          slotProps={{
            textField: {
              variant: "outlined",
              error: invalid,
              helperText: error ? error.message : "",
            },
          }}
          onChange={(data) => {
            onChange(data);
          }}
          sx={{
            marginTop: 2,
            marginBottom: 2,
            backgroundColor: `rgba(4, 180, 4, 0.02)`,
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export default BasicDatePicker;
