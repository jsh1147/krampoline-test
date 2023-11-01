import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CATEGORY } from "../constants/TAGLIST";
import Title from "./Title";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9BC60",
    },
  },
});

export default function SelectTag() {
  const [selectedOptions, setSelectedOptions] = React.useState([
    CATEGORY[0],
    CATEGORY[1],
  ]);

  const handleOnChange = (event, newValue) => {
    if (newValue.length <= 3) {
      setSelectedOptions(newValue);
    }
  };

  return (
    <div className="justify-center items-center mt-10 mb-20">
      <Title className="mb-10">Chooese Your Favorites! </Title>
      <ThemeProvider theme={theme}>
        <Autocomplete
          multiple
          fullWidth={true}
          includeInputInList={true}
          id="categorylist"
          options={CATEGORY}
          value={selectedOptions}
          getOptionLabel={(option) => option.category}
          onChange={handleOnChange}
          color="main"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Favorites"
              placeholder="Choose your favorites!"
            />
          )}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </ThemeProvider>
    </div>
  );
}
