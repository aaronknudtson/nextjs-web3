import * as React from "react";
import { Typography, Grid, Modal, Box } from "@mui/material";
import { ActionButton, modalStyle } from "../lib/styles";
import { ActiveUser } from "../hooks/useUser";
declare let window: any;

export default function ConnectModal(user: ActiveUser) {
  //   const handleOpen = () => props.setOpen(true);
  console.log(user.provider);
  const changeNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xA86A" }],
    });
  };

  return (
    <Modal
      open={true}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="body1"
          id="modal-modal-description"
          sx={{ mt: 2, mb: 2 }}
          align="center"
        >
          The Sch0lar presale is being held on the Avalanche C-Chain
        </Typography>
        <Grid container textAlign="center">
          <Grid item xs={12}>
            <ActionButton
              onClick={changeNetwork}
              variant="outlined"
              style={{ marginBottom: "20px", width: "100%" }}
            >
              Switch to Avalanche C-Chain
            </ActionButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
