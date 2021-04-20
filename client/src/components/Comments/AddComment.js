import React, { useState } from 'react';
import GridContainer from '../../material/Grid/GridContainer.js';
import GridItem from '../../material/Grid/GridItem.js';
import TextField from '@material-ui/core/TextField';
import Button from '../../material/CustomButtons/Button.js';

const AddComment = ({ addComment, debate }) => {
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
        <Button
          color="primary"
          round
          style={{ margin: 5, padding: 12 }}
          onClick={handleAdd}
        >
          Have your say
        </Button>
      </GridItem>
    </GridContainer>
  );
};

export default AddComment;
