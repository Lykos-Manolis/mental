import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function ContactModal({ open, onClose }) {
  const [identifier, setIdentifier] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: "black", borderRadius: 5, p: 1 } }}
    >
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Email or Phone Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          sx={{ width: "100%", mt: 2, mb: 2 }}
        />
        <Button variant="contained" sx={{ width: "100%" }}>
          Add Contact
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ContactModal;
