import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, TextField } from "@mui/material";

const BaseSearch = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx" label="With sx" variant="standard" />
    </Box>
  );
}

export default BaseSearch;