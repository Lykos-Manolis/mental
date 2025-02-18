import { Grid2, Typography } from "@mui/material";
import React from "react";

function Heading({ alignment, variant, content }) {
  return (
    <Grid2 size={12}>
      <Typography textAlign={alignment} variant={variant}>
        {content}
      </Typography>
    </Grid2>
  );
}

export default Heading;
