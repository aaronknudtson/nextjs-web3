import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { COLORS } from "../../lib/constants";
import Image from "next/image";
import Logo from "../../public/images/LogoSide.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { appTheme } from "../../lib/themes";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ActionButton } from "../../lib/styles";
import { useUser } from "../../hooks/useUser";

const LINKS = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/buy_now",
    name: "Buy SCLR",
  },
  {
    path: "/whitepaper.pdf",
    name: "Whitepaper",
  },
  {
    path: "https://sch0lar.io",
    name: "Information on Sch0lar",
  },
];

const menuTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.mediumPurp,
    },
    secondary: {
      main: COLORS.bgPurp,
    },
  },
  // override paper to have a background of COLORS.darkPurp
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.darkPurp,
        },
      },
    },
  },
});

const useStyles = makeStyles({
  navLink: {
    color: "white",
    fontSize: "18px",
    fontWeight: 400,
    textDecoration: "none",
    marginLeft: "12px",
    marginRight: "12px",
    "&:hover": {
      color: COLORS.mediumPurp,
    },
  },
  menu: {
    backgroundColor: COLORS.darkPurp,
    color: COLORS.darkPurp,
  },
  menuItem: {
    backgroundColor: COLORS.darkPurp,
  },
});

const styles = {
  navLink: {
    fontSize: "18px",
    fontWeight: 400,
    textDecoration: "none",
    marginLeft: "12px",
    marginRight: "12px",
  },
};

export default function Navbar(props: any) {
  const isDesktop = useMediaQuery(appTheme.breakpoints.up("md"));
  const classes = useStyles();
  const user = useUser({});
  // const isDesktop = useMediaQuery(appTheme.breakpoints.up("md"));
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  if (!user) return <></>;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: COLORS.bgPurp }}
          elevation={0}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  mt: 1,
                  order: 0,
                  flex: "none",
                }}
              >
                <Link href="/">
                  <a>
                    <Image src={Logo} alt="Sch0lar logo" />
                  </a>
                </Link>
              </Box>
              {!isDesktop ? ( // this is for mobile
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="primary"
                    style={{ maxWidth: "50px" }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <ThemeProvider theme={menuTheme}>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", sm: "block", md: "block" },
                      }}
                    >
                      {LINKS.map((link) => (
                        <MenuItem
                          key={link.name}
                          onClick={handleCloseNavMenu}
                          // className={classes.menuItem}
                        >
                          <Link href={link.path}>
                            <a>
                              <Typography
                                textAlign="center"
                                className={classes.navLink}
                              >
                                {link.name}
                              </Typography>
                            </a>
                          </Link>
                        </MenuItem>
                      ))}
                      <MenuItem
                        key="logout"
                        onClick={handleCloseNavMenu}
                        // className={classes.menuItem}
                      >
                        <Link href="/api/logout">
                          <a>
                            <Typography
                              textAlign="center"
                              className={classes.navLink}
                            >
                              Logout
                            </Typography>
                          </a>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </ThemeProvider>
                </Box> // this is for desktop
              ) : (
                <Box
                  sx={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "right",
                    display: "flex",
                  }}
                >
                  {LINKS.map(({ path, name }) => {
                    return (
                      <Link href={path} key={name}>
                        <a>
                          <Typography
                            className={classes.navLink}
                            style={styles.navLink}
                            variant="h6"
                          >
                            {name}
                          </Typography>
                        </a>
                      </Link>
                    );
                  })}
                  <Link href="/api/logout">
                    <a>
                      <ActionButton style={{ marginLeft: "20px" }}>
                        Logout
                      </ActionButton>
                    </a>
                  </Link>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
