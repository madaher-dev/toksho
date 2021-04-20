import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  container: {
    display: 'flex',
    //flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //width: '100vh'
    height: '100vh'
  }
});

export default function NotFound() {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="404 Not Found!"
              height="140"
              image="/resources/images/login.jpg"
              title="404 Not Found!"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Oops!
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                We can't seem to find the page you are looking for!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" component={Link} to="/home">
              Back to Home Page
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
