import { Box, Button } from "@mui/material";
import React, { startTransition } from "react";
import { User } from "./User";
import { getUser, signOut } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAlert } from "react-alert";

export default function Header() {
  const auth = getUser();
  const navigate = useNavigate();
  const alert = useAlert();

  return (
    <Box display="flex" p={2} justifyContent="flex-end" gap={2} position="relative" zIndex={1}>
      <User user={auth?.user} />
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => {
          signOut();
          alert.success("Signed out successfully");
          startTransition(() => navigate("/sign-in"));
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
