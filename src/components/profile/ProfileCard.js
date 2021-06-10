import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 299,
    minHeight: 300,
    border: '1px solid #CED5DD'
  },

  media: {
    height: 250,
  },

  fontStyle: {
    fontWeight: 800,
    fontSize: 14,
  },

  bodyFontStyle: {
    fontSize: 10,
  },
});

export default function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {props.image ? (
          <CardMedia className={classes.media} image={props.image} />
        ) : null}
        {props.children}

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            className={classes.fontStyle}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.bodyFontStyle}
          >
            <h7>My SKills: </h7>
            {props.skills}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={"/" + props.redirect} rel="noopener">
          About me...
        </Link>
      </CardActions>
    </Card>
  );
}
