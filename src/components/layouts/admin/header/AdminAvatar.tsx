import { stringAvatar } from "@/helper";
import { useStore } from "@/store";
import { Avatar, Box, Typography } from "@mui/material";

interface IAdminAvatar {
  username: string,
  avatar: string,
}

const AdminAvatar = () => {
  const { UserSlice } = useStore();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Typography color='#343A40' fontWeight='500' fontSize='14'>{ UserSlice.user.username }</Typography>
      <Avatar {...stringAvatar(UserSlice.user?.username || 'U')}></Avatar>
    </Box>
  );
}

export default AdminAvatar;