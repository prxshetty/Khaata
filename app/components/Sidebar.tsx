import { useSession } from 'next-auth/react';
import { Box, Typography } from '@mui/material';
export default function Sidebar() {
  const { data: session } = useSession();

  return (
    // ... existing JSX ...
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">{session?.user?.name}</Typography>
      <Typography variant="body2">{session?.user?.email}</Typography>
    </Box>
    // ... rest of the JSX ...
  );
}