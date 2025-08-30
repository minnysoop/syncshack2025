'use client'

import React, { useState } from "react";
import { TextField, Input, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onSearch && query != "") {
        onSearch(query);
      }
      setQuery("")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <TextField
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      placeholder="Search..."
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
        padding: "8px 12px",
        border: "2px solid #1976d2",
        borderRadius: "8px",
        "&:hover": {
          borderColor: "#115293",
        },
        "&.Mui-focused": {
          borderColor: "#0d47a1",
        },
      },
      }}
      slots={{
        input: Input,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
