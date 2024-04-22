import { Box } from "@mui/material";
import React from "react";
import Typography from "renderer/components/atoms/TextStyles";

type TabNavigationHeaderProps = {
  title: string;
};

export const TabNavigationHeader = ({ title }: TabNavigationHeaderProps) => {
  return (
    <Box
      sx={{
        width: "180px",
        height: "52px",
        borderRadius: "7px 7px 0 0",
        padding: "14px 20px",
        background: "#080A0F",
      }}
    >
      <Typography variant="body">{title}</Typography>
    </Box>
  );
};
