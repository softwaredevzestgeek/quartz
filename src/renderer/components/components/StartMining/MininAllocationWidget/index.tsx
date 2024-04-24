import { MINING_ALLOCATION_WIDGET_BOX } from "const";
import Typography from "renderer/components/atoms/TextStyles";
import { MiningAllocationWidgetBox } from "renderer/components/molecules/StartMining-I/MiningAllocationWidgets";

export const MiningAllocationWidget = () => {
  return (
    <Stack
      padding={"12px"}
      gap={"1rem"}
      sx={{
        // flexBasis: "40%",
        backgroundColor: "#0F141F",
        borderRadius: "8px",
      }}
    >
      <Box>
        <Typography variant="bodyLarge" color={"#FFF"}>
          Mining Allocation
        </Typography>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        {MINING_ALLOCATION_WIDGET_BOX.map((element) => {
          return (
            <MiningAllocationWidgetBox
              key={element.label}
              label={element.label}
              points={element.points}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
