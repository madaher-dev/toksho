import React from 'react';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/components/commentStyle';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(styles);

const CommentCard = ({ comment, user, deleteComment }) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  let mycomment;
  if (comment.user._id === user) mycomment = true;
  let profileImage;
  if (comment.user) {
    profileImage =
      comment.user.photo === 'null'
        ? '/static/images/avatars/default-profile.png'
        : `/static/images/avatars/${comment.user.photo}`;
  } else {
    profileImage = '/static/images/avatars/default-profile.png';
  }
  const handleDelete = () => {
    deleteComment(comment._id);
  };
  return (
    <GridContainer direction="row" className={classes.cardContainer}>
      <GridItem xs={2} className={classes.image}>
        <img src={profileImage} alt="..." className={imageClasses} />
      </GridItem>
      <GridItem xs={10}>
        <GridContainer className={classes.innerContainer}>
          <GridItem className={classes.name}>
            <a href={`/${comment.user.handler}`} className={classes.link}>
              <strong>{comment.user.name}</strong>
            </a>
          </GridItem>
          <GridItem className={classes.handler}>
            @{comment.user.handler}
          </GridItem>

          <GridItem className={classes.bio}>
            <p>{comment.comment}</p>
          </GridItem>
          {mycomment && (
            <GridItem className={classes.deleteContainer}>
              <IconButton
                aria-label="delete"
                className={classes.deleteIcon}
                onClick={handleDelete}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
};

export default CommentCard;
