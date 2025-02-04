import { Autocomplete, TextField } from "@mui/material";
import React from "react";

function ContactSearch({ userContacts }) {
  return (
    <Autocomplete
      sx={{ mt: 5 }}
      options={userContacts.map(
        (contact) =>
          `${contact.name} - ${contact.phoneNumber || contact.email}`,
      )}
      renderInput={(params) => (
        <TextField {...params} size="small" variant="filled" label="Search" />
      )}
    />
  );
}

export default ContactSearch;
