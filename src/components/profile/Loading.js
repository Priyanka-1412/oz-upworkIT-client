import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  hide: {
    display: "none",
  },
  green: {
    color: "green",
  },
}));

export default function Loading(props) {
  const classes = useStyles();

  return (
    <div className={props.show ? classes.root : classes.hide}>
      <CircularProgress color="secondary" />
      <CircularProgress className={classes.green} />
      <CircularProgress />
    </div>
  );
}
