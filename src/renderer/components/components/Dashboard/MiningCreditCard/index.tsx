import { Box } from "@mui/material";
import React from "react";
import { DecreaseIcon } from "renderer/components/atoms/Settings/Settings-I/MiningCreditsCard/DecreaseIcon";
import { IncreaseArrowIcon } from "renderer/components/atoms/Settings/Settings-I/MiningCreditsCard/IncreaseIcon";
import { CreditCardI } from "renderer/components/molecules/Settings-I/MIningCreditsCard/CreditCardI";
import { CreditCardII } from "renderer/components/molecules/Settings-I/MIningCreditsCard/CreditCardII";
import { MiningRefreshButton } from "renderer/components/molecules/Settings-I/MIningCreditsCard/MiningRefreshButton";

type Props = {};

export const MiningCreditCard = (props: Props) => {
  return (
    <Box sx={{ display: "flex", padding: "8px 8px 12px 8px" }}>
      <Box sx={{ display: "flex" }}>
        <CreditCardI />
        <Box sx={{ alignSelf: "flex-end" }}>
          <MiningRefreshButton />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <DecreaseIcon />
        <CreditCardII />
        <IncreaseArrowIcon />
      </Box>
    </Box>
  );
};
