import React from "react";
import Link from "next/link";
import cssStyles from "./index.module.scss";
import styled from "styled-components";
import { COLORS } from "../../lib/constants";
import Image from "next/image";
import Logo from "../../public/images/LogoSideFooter.svg";
import TwitterLogo from "../../public/images/TwitterLogo.svg";
import DiscordLogo from "../../public/images/DiscordLogo.svg";
import TelegramLogo from "../../public/images/TelegramLogo.svg";
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
    path: "https://www.sch0lar.io/",
    name: "The Sch0lar Solution",
    order: 0,
  },
  {
    path: "https://www.sch0lar.io/our-team/",
    name: "Our Team",
    order: 1,
  },
  {
    path: "https://www.sch0lar.io/partnerships/",
    name: "Partnerships",
    order: 2,
  },
  {
    path: "https://www.sch0lar.io/community/",
    name: "Community",
    order: 3,
  },
  {
    path: "/whitepaper.pdf",
    name: "Whitepaper",
    order: 5,
  },
  {
    path: "https://www.sch0lar.io/#contact-us",
    name: "Contact Us",
    order: 6,
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
  const classes = useStyles();
  const user = useUser({});
  const isDesktop = useMediaQuery(appTheme.breakpoints.up("md"));
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
          sx={{ backgroundColor: COLORS.lighterDarkPurp }}
          elevation={0}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: isDesktop ? "left" : "center",
                  }}
                >
                  <Box
                    sx={{
                      // width: "10%",
                      // height: "100px",
                      mr: 2,
                      display: "flex",
                    }}
                  >
                    <Link href="/">
                      <a>
                        <Image
                          src={Logo}
                          alt="Sch0lar logo"
                          layout="intrinsic"
                          height="110%"
                        />
                      </a>
                    </Link>
                  </Box>
                  {!isDesktop ? (
                    <div className={cssStyles.flex_break} />
                  ) : (
                    <></>
                  )}
                  {/* This is for mobile */}
                  {/* <Box
                sx={{
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "right",
                  display: {
                    xs: "flex",
                    sm: "flex",
                    md: "flex",
                    lg: "none",
                    xl: "none",
                  },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="primary"
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
                          <a target="_blank">
                            <Typography
                              textAlign="center"
                              style={{ order: link.order }}
                              className={classes.navLink}
                            >
                              {link.name}
                            </Typography>
                          </a>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </ThemeProvider>
              </Box> */}
                  {/* This is for Desktop */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: isDesktop ? "right" : "center",
                      display: "flex",
                      flexWrap: "wrap",
                      margin: "30px 0",
                    }}
                  >
                    {LINKS.map(({ path, name, order }) => {
                      return (
                        <>
                          {!isDesktop ? (
                            <div className={cssStyles.flex_break} />
                          ) : (
                            <></>
                          )}
                          <Link href={path} key={name}>
                            <a target="_blank">
                              <Typography
                                className={classes.navLink}
                                style={{ ...styles.navLink, order: order }}
                                variant="h6"
                              >
                                {name}
                              </Typography>
                            </a>
                          </Link>
                        </>
                      );
                    })}
                  </Box>{" "}
                  <div className={cssStyles.flex_break} />
                  <Box
                    sx={{
                      flexGrow: 1,
                      alignItems: "center",
                      justifyContent: isDesktop ? "right" : "center",
                      display: "flex",
                      flexWrap: "wrap",
                      marginBottom: "30px",
                    }}
                  >
                    <h3 className={cssStyles.follow_us}>Follow us:</h3>
                    <div>
                      {[
                        {
                          link: "https://twitter.com/Sch0larIO",
                          logo: TwitterLogo,
                        },
                        {
                          link: "https://discord.gg/VWyPakt85G",
                          logo: DiscordLogo,
                        },
                        {
                          link: "https://t.me/Scholario",
                          logo: TelegramLogo,
                        },
                      ].map(({ link, logo }) => (
                        <Link href={link} key={link}>
                          <a target="_blank" style={{ margin: "0 5px" }}>
                            <Image src={logo} alt="logo" key={link} />
                          </a>
                        </Link>
                      ))}
                    </div>
                  </Box>{" "}
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
