import React, { useEffect } from 'react';
import Pusher from 'pusher-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getComments,
  deleteComment,
  addComment,
  pushComments,
  setLoading,
  pullComments
} from '../../store/actions/commentActions';
import GridItem from '../../components/Grid/GridItem.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommentCard from './CommentCard';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../assets/jss/material-kit-react/components/commentStyle';
import AddComment from './AddComment';
const useStyles = makeStyles(styles);

const Comments = ({
  debate,
  getComments,
  addComment,
  deleteComment,
  pushComments,
  pullComments,
  comments,
  loading,
  setLoading,
  user
}) => {
  const classes = useStyles();

  useEffect(() => {
    const pusher = new Pusher('3112d5ae0257895cff95', {
      cluster: 'eu',
      encrypted: true
    });
    setLoading();
    getComments(debate);

    const channel = pusher.subscribe('comments');
    channel.bind('new-comment', data => {
      if (data.comment.debate === debate) pushComments(data.comment);
    });

    channel.bind('delete-comment', data => {
      if (data.comment.debate === debate) pullComments(data.comment._id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const updateInput = (e) => {
  //   setstate({ ...state, [e.target.name]: e.target.value });
  // };

  return (
    <div style={{ paddingBottom: 30 }}>
      <GridItem style={{ marginTop: 30 }}>
        <AddComment addComment={addComment} debate={debate} />
      </GridItem>
      <GridItem>
        {comments !== [] && !loading ? (
          <GridItem xs={12}>
            {comments.map(comment => (
              <CommentCard
                key={comment._id + 1}
                comment={comment}
                user={user}
                deleteComment={deleteComment}
              />
            ))}
          </GridItem>
        ) : loading ? (
          <GridItem
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <CircularProgress className={classes.wallLoader} />
          </GridItem>
        ) : (
          <GridItem xs={12}> </GridItem>
        )}
      </GridItem>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  debate: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  pushComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.comments.loading,
  comments: state.comments.comments,
  user: state.users.user._id
});
export default connect(mapStateToProps, {
  getComments,
  deleteComment,
  pushComments,
  addComment,
  setLoading,
  pullComments
})(Comments);
