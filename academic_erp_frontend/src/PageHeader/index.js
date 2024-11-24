import { Typography, Grid } from "@mui/material";

function PageHeader({ pagename, description }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {pagename}
        </Typography>
        <Typography variant="subtitle2">
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
