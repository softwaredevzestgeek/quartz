import { Box } from "@mui/material";
import { TextElement } from "renderer/components/atoms/Settings/Settings-I/MiningCreditsCard/TextElement";
import MCIcon from "renderer/components/atoms/Settings/Settings-I/MiningCreditsCard/MCIcon";
type CreditCardIProps = {
  info: number;
};

export const CreditCardI = ({ info }: CreditCardIProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#0F141F",
        display: "flex",
        flexDirection: "row",
        gap: "14px",
        position: "relative",
        width: "84%",
      }}
    >
      <MCIcon rectangleColor="0F141F" pathColor="#EAEAEA" />
      <TextElement label="Mining Credits" info={String(info)} />
    </Box>
  );
};
