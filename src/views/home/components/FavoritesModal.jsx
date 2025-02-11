import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  AvatarGroup,
  Avatar,
  Autocomplete,
  TextField,
  Alert,
} from "@mui/material";

function FavoritesModal({ open, onClose, favoriteContacts, contacts }) {
  const [error, setError] = useState(false);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: "black", borderRadius: 5, p: 1, width: "90%" },
      }}
    >
      <DialogTitle>Edit Favorites</DialogTitle>
      <DialogContent>
        <AvatarGroup max={4} sx={{ justifyContent: "center", mb: 2 }}>
          {favoriteContacts.map((contact) => (
            <Avatar
              key={contact.id}
              alt={contact.full_name}
              src={contact.avatar_url}
            />
          ))}
        </AvatarGroup>
        <Alert
          severity="error"
          sx={{ mb: 2, display: error ? "flex" : "none" }}
        >
          You can only have 4 favorites.
        </Alert>
        <Autocomplete
          sx={{ mb: 2 }}
          multiple
          limitTags={1}
          id="tags-outlined"
          options={contacts}
          getOptionLabel={(option) => option.full_name}
          defaultValue={favoriteContacts}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Favorites" placeholder="Add more" />
          )}
          onChange={(event, newValue) => {
            if (newValue.length > 4) {
              setError(true);
            } else if (newValue.length <= 4 && error) {
              setError(false);
            }
          }}
        />
        <Button variant="contained" disabled={error} sx={{ width: "100%" }}>
          Change Favorites
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default FavoritesModal;
