import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TagCloud as CloudBlock } from 'react-tagcloud';
import { useHistory } from 'react-router-dom';

import { getTopicsCloud } from '../../store/actions/searchActions';

const TagCloud = ({ getTopicsCloud, topics }) => {
  const history = useHistory();

  useEffect(() => {
    getTopicsCloud();
  }, [getTopicsCloud]);

  const options = {
    luminosity: 'dark',
    hue: '#A74A5A'
  };
  return (
    <div>
      <h3>Hot Topics</h3>
      <CloudBlock
        minSize={20}
        maxSize={45}
        tags={topics}
        style={{ paddingRight: 20, cursor: 'pointer' }}
        colorOptions={options}
        onClick={topic => history.push(`/search?topic=${topic.value}`)}
      />
    </div>
  );
};

TagCloud.propTypes = {
  topics: PropTypes.array
};

const mapStateToProps = state => ({
  topics: state.search.topics
});
export default connect(mapStateToProps, {
  getTopicsCloud
})(TagCloud);
