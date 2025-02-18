import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useSetContact } from "../../../hooks/useSetContact";

function ContactModal({ open, onClose }) {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState(false);

  const {
    setContact,
    isLoading: setContactLoading,
    error: setContactError,
  } = useSetContact();

  const handleAddContact = async () => {
    try {
      await setContact(identifier);
      setError(false);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: 5, p: 1 } }}
    >
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <Alert
          severity="error"
          sx={{ mb: 2, display: error ? "flex" : "none" }}
        >
          {error || "An error occurred"}
        </Alert>
        <TextField
          label="Email or Phone Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          sx={{ width: "100%", mt: 2, mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          disabled={setContactLoading}
          onClick={handleAddContact}
        >
          Add Contact
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;
