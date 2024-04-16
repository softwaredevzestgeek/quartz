import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ChartProps } from "renderer/interfaces/components/historyChart";

export const HistoryChart = ({ isAnalytics, padding }: ChartProps) => {
  return (
    <Stack>
      <Box padding={padding}>
        <Typography
          fontFamily="Poppins, sans-serif"
          style={{
            color: "#EAEAEA",
            fontSize: "20px",
            fontWeight: "500px",
          }}
        >
          Average Hashrate
        </Typography>
        {isAnalytics && (
          <Typography
            variant="body1"
            fontFamily="Poppins, sans-serif"
            style={{
              color: "#8C8C8C",
              fontSize: "14px",
              fontWeight: "600px",
              marginTop: "5px",
            }}
          >
            See how your hashrate changes over time.
          </Typography>
        )}
      </Box>
      <Box>
        <Card
          style={{
            backgroundColor: "#0F141F",
            backgroundImage: "none",
            backgroundSize: "cover",
            marginRight: "10px",
            zIndex: 2,
            borderRadius: "7px",
            position: "relative",
            minWidth: "400px",
          }}
          sx={{
            height: {
              xs: "45vh",
              sm: "45vh",
              md: "45vh",
              lg: "52 vh",
              xl: "48vh",
            },
          }}
        >
          <img
            src="/assets/img/Historical-Metrics-3-Month-Card.webp"
            alt="Your Image Alt Text"
            style={{
              maxWidth: "-webkit-fill-available",
              height: "100%",
              objectFit: "contain",
              position: "absolute",
              zIndex: 3,
            }}
          />
        </Card>
      </Box>
    </Stack>
  );
};
