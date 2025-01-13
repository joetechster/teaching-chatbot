import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { User as UserType } from "../utils/auth";

export const User = ({ user }: { user: UserType | null | undefined }) => {
  if (!user) return null;
  return (
    <Box display="flex" alignItems="center" lineHeight={1}>
      <Avatar src={user.passport || undefined} />
      <Box ml={2} lineHeight={1}>
        <Typography display="block" fontWeight="medium">
          {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography variant="caption">
          {user.type === "instructor" ? "Instructor" : user.username}
        </Typography>
      </Box>
    </Box>
  );
};
