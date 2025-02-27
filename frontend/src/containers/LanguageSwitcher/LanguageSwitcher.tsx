import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";

const languageOptions = [
  { value: "en", flag: "GB" },
  { value: "de", flag: "DE" },
];

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = window.location.hash.replace("#lang=", "") || "en"; // Use URL hash

  const handleChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    window.location.hash = `#lang=${lang}`; // Update language in the URL hash

    i18n.changeLanguage(lang); // Dynamically change language without reload
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth variant="standard">
        <Select
          value={currentLang}
          onChange={handleChange}
          displayEmpty
          size="small"
          sx={{ width: 80 }}
          renderValue={(selected) => {
            const selectedLang = languageOptions.find(
              (option) => option.value === selected,
            );
            return selectedLang ? (
              <Flag
                code={selectedLang.flag}
                style={{ width: 20, height: 15 }}
              />
            ) : null;
          }}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Flag
                  code={option.flag}
                  style={{ width: 20, height: 15, marginRight: 8 }}
                />
                {t(
                  `SidePanel.LanguageSwitcher.${option.value === "en" ? "English" : "German"}`,
                )}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
