import { Button, Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 0 , width:"100%"}}>
      <TextField
        id="search"
        type="search"
        label="Search"
        fullWidth
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button><SearchIcon /></Button>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}