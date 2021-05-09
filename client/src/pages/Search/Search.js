import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import SideBar from '../../views/SideBar/SideBar';
import SearchWall from './SearchWall';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  getSearchTopic,
  setSearchLoading,
  getSearch
} from '../../store/actions/searchActions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = ({
  getSearchTopic,
  debates,
  loading,
  setSearchLoading,
  getSearch
}) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleOpenSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  let query = useQuery();
  let searchQuery;
  let searchTopic;
  if (query.get('topic')) searchTopic = query.get('topic');
  if (query.get('search')) searchQuery = query.get('search');

  useEffect(() => {
    if (searchTopic) {
      setSearchLoading();
      getSearchTopic(searchTopic);
    } else if (searchQuery) {
      setSearchLoading();
      getSearch(searchQuery);
    }
  }, [searchTopic, getSearchTopic, setSearchLoading, searchQuery, getSearch]);

  return (
    <Grid container>
      <Grid item sm={12} md={9}>
        <SearchWall
          debates={debates}
          loading={loading}
          handleOpenSnack={handleOpenSnack}
        />
      </Grid>
      <Box
        component={Grid}
        item
        sm={false}
        md={3}
        display={{ xs: 'none', md: 'block' }}
      >
        <SideBar />
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        //anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnack} severity="info">
          Link Copied to Clipboard!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

Search.propTypes = {
  getSearchTopic: PropTypes.func.isRequired,
  setSearchLoading: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  debates: state.search.debates,
  loading: state.search.loading
});

export default connect(mapStateToProps, {
  getSearchTopic,
  setSearchLoading,
  getSearch
})(Search);
