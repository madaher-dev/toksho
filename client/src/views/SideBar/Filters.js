import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomDropdown from '../../material/CustomDropdown/CustomDropdown.js';
import Button from '../../material/CustomButtons/Button.js';

import { setLanguageFilter } from '../../store/actions/searchActions';

const Filters = ({ setLanguageFilter }) => {
  const [filters, setFilters] = useState({ language: 'All', duration: 'All' });

  return (
    <div>
      <h3>Filter Debates</h3>
      <CustomDropdown
        style={{ width: 150 }}
        buttonText="Language"
        dropdownList={['All', 'عربي', 'English', 'Français']}
        onClick={v => setFilters({ ...filters, language: v })}
      />
      {<p>{filters.language}</p>}
      <CustomDropdown
        style={{ width: 150 }}
        buttonText="Duration"
        dropdownList={['All', '30 mins', '45 mins', '1 hr']}
        onClick={v => setFilters({ ...filters, duration: v })}
      />
      {<p>{filters.duration}</p>}
      <Button
        simple
        color="primary"
        onClick={() => setFilters({ language: 'All', duration: 'All' })}
      >
        Clear
      </Button>
      <Button color="primary" onClick={() => setLanguageFilter(filters)}>
        Apply
      </Button>
    </div>
  );
};

Filters.propTypes = {
  setLanguageFilter: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps, {
  setLanguageFilter
})(Filters);
