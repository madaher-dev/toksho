import React from 'react';
import TagCloud from './TagCloud';
import SearchBar from './SearchBar';
import Filters from './Filters';

const SideBar = () => {
  return (
    <div>
      <SearchBar />
      <Filters />
      <TagCloud />
    </div>
  );
};

export default SideBar;
