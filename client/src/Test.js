import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTopicsCloud } from './store/actions/searchActions';

const Test = ({ getTopicsCloud }) => {
  useEffect(() => {
    getTopicsCloud();
  }, [getTopicsCloud]);
  return <div>Test</div>;
};

Test.propTypes = {
  topics: PropTypes.array
};

const mapStateToProps = state => ({
  topics: state.search.topics
});
export default connect(mapStateToProps, {
  getTopicsCloud
})(Test);
