import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Router from "next/router";
import { Box } from "@material-ui/core";
import Head from "next/head";
import { DirectionsCar } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function LayoutAppBar({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Ameed Traders</title>
      </Head>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <DirectionsCar />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ameed Car Traders
            </Typography>
            <Button color="inherit" onClick={() => Router.push("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => Router.push("/faq")}>
              FAQ
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Box margin={3}>{children}</Box>
    </div>
  );
}
