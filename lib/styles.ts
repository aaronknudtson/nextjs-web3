import { COLORS } from "./constants";
import { SxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const actionButtonStyle = {
  backgroundColor: COLORS.lightGreen,
  color: COLORS.lighterDarkPurp,
  borderRadius: "50px",
  borderColor: COLORS.lightGreen,
  fontWeight: 500,
  fontSize: "16px",
  letterSpacing: "4",
  minHeight: "50px",
  minWidth: "100px",
};

export const nonActionButtonStyle = {
  backgroundColor: COLORS.lighterDarkPurp,
  color: COLORS.lightGreen,
  borderRadius: "50px",
  borderColor: COLORS.lightGreen,
  fontWeight: 500,
  fontSize: "16px",
  letterSpacing: "4",
  minHeight: "30px",
  minWidth: "70px",
};

export const modalStyle: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: COLORS.lighterDarkPurp,
  borderRadius: "30px",
  boxShadow: 24,
  p: 8,
};

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: COLORS.lightGreen,
  color: COLORS.lighterDarkPurp,
  borderRadius: "50px",
  borderColor: COLORS.lightGreen,
  fontWeight: 500,
  fontSize: "16px",
  letterSpacing: "4",
  minHeight: "50px",
  minWidth: "100px",
  textTransform: "none",
  width: "100%",
  "&:hover": {
    backgroundColor: COLORS.mediumPurp,
  },
}));

export const NonActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: COLORS.lighterDarkPurp,
  color: COLORS.lightGreen,
  borderRadius: "50px",
  borderColor: COLORS.lightGreen,
  fontWeight: 500,
  fontSize: "16px",
  letterSpacing: "4",
  minHeight: "50px",
  minWidth: "100px",
  textTransform: "none",
  width: "100%",
}));
