import * as React from "react";
import { Typography, Grid } from "@mui/material";
import { ActionButton } from "../lib/styles";
import Link from "next/link";

interface StatsProps {
  investorsNum: string;
}

export default function Stats(props: StatsProps) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2" align="left" gutterBottom>
          Overall Stats
        </Typography>
      </Grid>
      <Grid item xs={8} top="50%" alignSelf="center" padding="0">
        <Typography variant="h4" gutterBottom top="50%">
          Number of Investors:
        </Typography>
      </Grid>
      <Grid item xs={4} top="50%" padding="0">
        <Typography variant="caption" gutterBottom>
          {props.investorsNum}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Link href="/invest">
          <a>
            <ActionButton
              style={{
                marginBottom: "20px",
                width: "100%",
                textTransform: "uppercase",
              }}
            >
              Invest Now
            </ActionButton>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
}
