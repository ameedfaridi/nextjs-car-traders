import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import { CarModel } from "../../models/car";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export interface CarProps {
  car: CarModel[] | undefined | null;
}

export default function Card(props) {
  const classes = useStyles();

  const {
    photoUrl,
    make,
    model,
    price,
    power,
    year,
    details,
    fuelType,
    averagePrice,
  } = props.data;

  const sd = props.showDetails;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={7} lg={sd ? 6 : 4}>
            <img
              alt={`${make} ${model}`}
              src={photoUrl}
              className={classes.image}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            lg={sd ? 6 : 8}
            direction="column"
            container
            spacing={2}
          >
            <Typography gutterBottom variant="h5">
              <b>{`${make} ${model}`}</b>
            </Typography>
            <Typography gutterBottom variant="h6">
              {price}
            </Typography>
            <Divider style={{ margin: "1rem 0", color: "rgb(25,133,123)" }} />
            <Grid>
              <Grid className={classes.flex}>
                <Typography variant="body1">Power</Typography>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  {power}
                </Typography>
              </Grid>
              <Grid className={classes.flex}>
                <Typography variant="body1">Fuel Type</Typography>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  {fuelType}
                </Typography>
              </Grid>
              <Grid className={classes.flex}>
                <Typography variant="body1">Year</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {year}
                </Typography>
              </Grid>
              <Grid className={classes.flex}>
                <Typography variant="body1">Avrg Price</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  ₹ {averagePrice}/-
                </Typography>
              </Grid>
              <Divider style={{ marginTop: "0.7rem" }} />
              {sd && (
                <Grid style={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Details</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {details}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
