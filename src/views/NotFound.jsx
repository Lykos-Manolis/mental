import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home Page
      </Button>
    </div>
  );
};

export default NotFound;
