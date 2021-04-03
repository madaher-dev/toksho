import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridContainer from '../../../components/Grid/GridContainer.js';
import GridItem from '../../../components/Grid/GridItem.js';
import Button from '../../../components/CustomButtons/Button.js';
import Card from '../../../components/Card/Card.js';
import CardBody from '../../../components/Card/CardBody.js';
import CardFooter from '../../../components/Card/CardFooter.js';
import classNames from 'classnames';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import team1 from '../../../assets/img/faces/avatar.jpg';

const useStyles = makeStyles(styles);

const DebateWall = () => {
  const classes = useStyles();
  const theme = useTheme();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <GridContainer style={{ paddingLeft: 10 }}>
      <GridItem xs={12}>
        <Card plain>
          <GridContainer>
            <GridItem xs={2} sm={3} md={2} lg={1} xl={1}>
              <img src={team1} alt="..." className={imageClasses} />
            </GridItem>
            <GridItem>
              <h4>
                <strong>Mohamad Ali Daher </strong>@madaher12345678 4h
              </h4>
            </GridItem>
            <GridItem>@madaher</GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={1}>Hello</GridItem>
            <GridItem xs={1}>Hello</GridItem>
            <GridItem xs={1}>Hello</GridItem>
          </GridContainer>
          <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
            <img src={team1} alt="..." className={imageClasses} />
          </GridItem>
          <h4 className={classes.cardTitle}>
            Gigi Hadid
            <br />
            <small className={classes.smallTitle}>Model</small>
          </h4>
          <CardBody>
            <p className={classes.description}>
              You can write here details about one of your team members. You can
              give more details about what they do. Feel free to add some{' '}
              <a href="#pablo">links</a> for people to be able to follow them
              outside the site.
            </p>
          </CardBody>
          <CardFooter className={classes.justifyCenter}>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-twitter'} />
            </Button>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-instagram'} />
            </Button>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-facebook'} />
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card plain>
          <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
            <img src={team1} alt="..." className={imageClasses} />
          </GridItem>
          <h4 className={classes.cardTitle}>
            Gigi Hadid
            <br />
            <small className={classes.smallTitle}>Model</small>
          </h4>
          <CardBody>
            <p className={classes.description}>
              You can write here details about one of your team members. You can
              give more details about what they do. Feel free to add some{' '}
              <a href="#pablo">links</a> for people to be able to follow them
              outside the site.
            </p>
          </CardBody>
          <CardFooter className={classes.justifyCenter}>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-twitter'} />
            </Button>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-instagram'} />
            </Button>
            <Button justIcon color="transparent" className={classes.margin5}>
              <i className={classes.socials + ' fab fa-facebook'} />
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default DebateWall;
