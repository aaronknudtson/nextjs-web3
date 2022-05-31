import { Typography, Grid, Modal, Box } from "@mui/material";
import Link from "next/link";
import { NonActionButton, ActionButton, modalStyle } from "../../lib/styles";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { COLORS } from "../../lib/constants";
interface StatsProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AccInvestorModal(props: StatsProps) {
  //   const handleOpen = () => props.setOpen(true);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const handleClose = () => props.setOpen(false);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const main = async () => {
      // const res = await fetch("https://ipapi.co/country/");
      const res = await fetch("/api/ip");
      const data = await res.json();
      console.log(data);
      setCountry(data.country);
    };
    main();
  }, []);

  const handleCountryClick = () => {
    setCountry("US");
  };
  return (
    <Modal
      open={props.open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          top: "50vh",
          left: "50vw",
          transform: "translate(-50%, -50%)",
          width: isDesktop ? 650 : "90vw",
          bgcolor: COLORS.lighterDarkPurp,
          borderRadius: "30px",
          boxShadow: 24,
          p: isDesktop ? 8 : 4,
        }}
      >
        {country !== "US" ? (
          <>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              The Sch0lar presale is available only for non-US citizens and
              non-US residents
            </Typography>
            <Typography
              variant="body1"
              id="modal-modal-description"
              sx={{ mt: 2, mb: 2 }}
            >
              {
                'By clicking "I am not a US resident" you confirm you are not a citizen of or residing in the United States of America.'
              }
            </Typography>
            <Grid container textAlign="center">
              <Grid item xs={12}>
                <ActionButton
                  onClick={handleClose}
                  variant="outlined"
                  style={{ marginBottom: "20px", width: "100%" }}
                >
                  {/* <ActionButton component={Link} to="/invest" style={{marginBottom:'20px', width:'240px'}}> */}
                  I am not a US resident
                </ActionButton>
                <Typography
                  variant="body2"
                  textAlign="left"
                  id="modal-modal-description"
                  sx={{ mb: 4 }}
                >
                  The Purchaser is an accredited investor as defined in Rule
                  501(a)(3) of Regulation D promulgated under the Securities
                  Act.
                </Typography>
                <NonActionButton
                  // component={Link}
                  // to="/"
                  onClick={handleCountryClick}
                  style={{ marginBottom: "20px", width: "100%" }}
                  variant="outlined"
                >
                  {/* <NonActionButton onClick={handleClose} variant="outlined" style={{marginBottom:'20px', width:'240px'}}> */}
                  I am a US resident
                </NonActionButton>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              gutterBottom
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              {
                "We're sorry, but the Sch0lar presale is available only for non-US citizens and non-US residents. Please come back to our platform in the future."
              }
            </Typography>
            <Link href="https://sch0lar.io/">
              <a>
                <NonActionButton
                  // component={Link}
                  // to="/"
                  style={{ marginBottom: "20px", width: "100%" }}
                  variant="outlined"
                >
                  {/* <NonActionButton onClick={handleClose} variant="outlined" style={{marginBottom:'20px', width:'240px'}}> */}
                  I understand
                </NonActionButton>
              </a>
            </Link>
          </>
        )}
      </Box>
    </Modal>
  );
}
