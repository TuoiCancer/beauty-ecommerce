import { stringAvatar } from "@/helper";
import { Avatar, Box, Typography } from "@mui/material";

interface IAdminAvatar {
  username: string,
}

const AdminAvatar = ({ username }: IAdminAvatar) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Typography color='#343A40' fontWeight='500' fontSize='14'>{ username }</Typography>
      <Avatar {...stringAvatar(username || 'A')}></Avatar>
    </Box>
  );
}

export default AdminAvatar;