import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUsers } from '../../store/actions/searchActions';

const SearchBar = ({ getUsers, users }) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setQuery(string);
    getUsers(string);
  };

  // const handleOnHover = result => {
  //   // the item hovered
  // };

  const handleOnSelect = item => {
    // the item selected
    if (item.id === 9999999999999) {
      history.push(`/search?search=${item.handler}`);
    } else {
      history.push(`/${item.handler}`);
    }
  };

  // const handleOnFocus = () => {};

  return (
    <div
      style={{
        paddingTop: 20,
        paddingRight: 20
      }}
    >
      <ReactSearchAutocomplete
        items={users}
        onSearch={handleOnSearch}
        //onHover={handleOnHover}
        onSelect={handleOnSelect}
        //onFocus={handleOnFocus}
        fuseOptions={{ keys: ['name', 'handler', 'bio'], shouldSort: false }}
        placeholder="Search Toksho"
        styling={{ iconColor: '#A74A5A', zIndex: 1000 }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  users: PropTypes.array
};

const mapStateToProps = state => ({
  users: state.search.users
});
export default connect(mapStateToProps, {
  getUsers
})(SearchBar);
