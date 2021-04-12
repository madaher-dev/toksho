import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { setChallengeLoading } from '../../../store/actions/debateActions';
import styles from '../../../assets/jss/material-kit-react/views/DebateWall/debateWallStyle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles(styles);

const LikeButton = ({ like, unlike, user, debate, likeLoading }) => {
  const classes = useStyles();
  let liked;

  if (debate.likes) liked = debate.likes.includes(user._id);
  let loading;
  if (likeLoading === debate._id) loading = true;

  return (
    <div>
      {liked ? (
        <IconButton
          // color="transparent"
          className={classes.socials_filled}
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            unlike();
          }}
          disabled={loading}
          edge="start"
        >
          <i className={'fas fa-heart'} />
        </IconButton>
      ) : (
        <IconButton
          //color="transparent"
          className={classes.socials}
          disabled={loading}
          edge="start"
          onClick={event => {
            event.stopPropagation();
            event.preventDefault();
            like();
          }}
        >
          <i className={'far fa-heart'} />
        </IconButton>
      )}
    </div>
  );
};

LikeButton.propTypes = {
  debate: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  unlike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.users.user,
  likeLoading: state.debates.likeLoading
});
export default connect(mapStateToProps, {})(LikeButton);
