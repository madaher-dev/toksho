import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import TextField from '@material-ui/core/TextField';
import Button from '../../material/CustomButtons/Button.js';
import { Link } from 'react-router-dom';

const AddComment = ({ addComment, debate, isAuthenticated }) => {
  const [state, setstate] = useState({
    comment: ''
  });

  const updateInput = event => {
    const { name, value } = event.target;

    setstate({
      [name]: value
    });
  };
  const handleAdd = event => {
    event.preventDefault();
    addComment(debate, state.comment);
    setstate({ comment: '' });
  };

  return (
    <GridContainer>
      <GridItem>
        <TextField
          id="comment"
          label="Comment:"
          placeholder="Comment..."
          multiline
          variant="outlined"
          onChange={updateInput}
          value={state.comment}
          fullWidth
          name="comment"
          type="text"
        />
      </GridItem>
      <GridItem
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '10px',
          paddingBottom: '10px'
        }}
      >
        {isAuthenticated ? (
          <Button
            color="primary"
            round
            style={{ margin: 5, padding: 12 }}
            onClick={handleAdd}
          >
            Have your say
          </Button>
        ) : (
          <Link to="/login">
            <Button color="primary" round style={{ margin: 5, padding: 12 }}>
              Login to Comment
            </Button>
          </Link>
        )}
      </GridItem>
    </GridContainer>
  );
};

AddComment.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated
});
export default connect(mapStateToProps, {})(AddComment);
