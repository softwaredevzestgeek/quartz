import { Box } from "@mui/material";
import { MinerStatusIcon } from "renderer/components/atoms/FriendsWorkers/MinersStatus";
import CopperLeftIcon from "renderer/components/atoms/Settings/Settings-I/LevelIcons/CopperLeftIcon";
import { CopperRightIcon } from "renderer/components/atoms/Settings/Settings-I/LevelIcons/CopperRightIcon";
import { SecondaryButton } from "renderer/components/atoms/Settings/Settings-II/SecondaryButton";
import Typography from "renderer/components/atoms/TextStyles";

type FriendsProps = {
  friendName: string;
  isMetrics: boolean;
  mining: string;
};

export const Friends = ({ friendName, isMetrics, mining }: FriendsProps) => {
  return (
    <Box
      sx={{
        padding: "13px 30px 14px 12px",
        width: "438px",
        height: "75px",
        display: "flex",
        gap: "12px",
      }}
    >
      <MinerStatusIcon src="" />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <CopperLeftIcon />
          <Typography>{friendName}</Typography>
          <CopperRightIcon />
        </Box>
        {isMetrics ? (
          <SecondaryButton variant="medium" text="View Metrics" />
        ) : (
          <Typography color="#8C8C8C">Mining for:{mining}</Typography>
        )}
      </Box>
    </Box>
  );
};