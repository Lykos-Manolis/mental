import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function ContactModal({ open, onClose }) {
  const [identifier, setIdentifier] = useState("");

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "black",
          width: "70%",
          borderRadius: 10,
          filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))",
          textAlign: "center",
          p: 5,
        }}
      >
        <Typography variant="h6" sx={{ mb: 5 }}>
          Add Contact
        </Typography>
        <TextField
          label="Email or Phone Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          sx={{ width: "100%", mb: 5 }}
        />
        <Button variant="contained" sx={{ width: "100%" }}>
          Add Contact
        </Button>
      </Box>
    </Modal>
  );
}

export default ContactModal;
