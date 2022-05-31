import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";
import { COLORS } from "../lib/constants";
import { numberWithCommas } from "../lib/helpers";

interface DoughnutInterface {
  labels: string[];
  data: number[];
  remaining: string;
  title1: string;
  title2: string;
}
export default function DoughnutChart(props: DoughnutInterface) {
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      display: true,
      position: "chartArea",
    },
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: COLORS.chartColors,
        hoverBackgroundColor: COLORS.chartColors,
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: "chartArea",
    },

    elements: {
      // arc: {
      //   borderColor: COLORS.darkPurp,
      //   borderWidth: 2,
      //   color: COLORS.lighterDarkPurp,
      // },
    },
    maintainAspectRatio: false,
  };

  const styles = {
    relative: {
      position: "relative",
    } as React.CSSProperties,
    chartContainer: {
      position: "relative",
      height: "100%",
      width: "100%",
    } as React.CSSProperties,
    pieContainer: {
      color: COLORS.lightPurp,
      width: "50%",
      height: "20%",
      top: "50%",
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
    } as React.CSSProperties,
  };

  return (
    <>
      <Typography variant="h2" align="left">
        Token Status
      </Typography>
      <div style={styles.chartContainer}>
        <Doughnut data={data} options={options} />
        <div style={styles.pieContainer}>
          <Typography variant="subtitle1">{props.title1}</Typography>
          <Typography variant="h3">
            {numberWithCommas(props.remaining)}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {props.title2}
          </Typography>
        </div>
      </div>
    </>
  );
}
