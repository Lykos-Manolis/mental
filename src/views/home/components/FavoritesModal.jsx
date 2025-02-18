import React, { useState, useEffect } from "react";
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
import { useSetFavoriteContacts } from "../../../hooks/useSetFavoriteContacts";

function FavoritesModal({
  open,
  onClose,
  favoriteContacts,
  contacts,
  setFavoriteContacts,
}) {
  const [error, setError] = useState(false);
  const [newFavoriteContacts, setNewFavoriteContacts] = useState([]);
  const { setFavoriteContacts: updateFavorites, isLoading } =
    useSetFavoriteContacts();

  useEffect(() => {
    setNewFavoriteContacts(favoriteContacts);
  }, [favoriteContacts]);

  const handleChangeFavorites = async () => {
    try {
      await updateFavorites(newFavoriteContacts);
      setFavoriteContacts(newFavoriteContacts);
      onClose(true);
    } catch (err) {
      // Handle error if needed
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 5, p: 1, width: "90%" },
      }}
    >
      <DialogTitle>Edit Favorites</DialogTitle>
      <DialogContent>
        <AvatarGroup max={4} sx={{ justifyContent: "center", mb: 2 }}>
          {newFavoriteContacts.map((contact) => (
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
          value={newFavoriteContacts}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Favorites" placeholder="Add more" />
          )}
          onChange={(event, newValue) => {
            if (newValue.length > 4 && !error) {
              setError(true);
              return;
            } else if (newValue.length <= 4 && error) {
              setError(false);
            }
            setNewFavoriteContacts(newValue);
          }}
        />
        <Button
          variant="contained"
          disabled={error || isLoading}
          onClick={handleChangeFavorites}
          sx={{ width: "100%" }}
        >
          {isLoading ? "Updating..." : "Change Favorites"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default FavoritesModal;
