import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div>
      <h1>401 - Unauthorized</h1>

      <p>You are not authorized to access this page.</p>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Login Page
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
