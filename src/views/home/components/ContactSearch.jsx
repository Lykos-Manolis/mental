import { Autocomplete, Grid2, TextField } from "@mui/material";
import { styled, lighten, darken } from "@mui/system";
import React from "react";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

function ContactSearch({ userContacts }) {
  const options = userContacts.map((contact) => {
    const firstLetter = contact.full_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      title: contact.full_name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    };
  });

  return (
    <Grid2 container size={12}>
      <Autocomplete
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter),
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.title}
        sx={{ width: "50%" }}
        renderInput={(params) => (
          <TextField {...params} label="Search Contacts" />
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </Grid2>
  );
}

export default ContactSearch;
