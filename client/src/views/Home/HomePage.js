import React from 'react';
import Grid from '@material-ui/core/Grid';
import DebateWall from '../Components/DebateWall/DebateWall';
import SideBar from '../Components/SideBar/SideBar';
import Box from '@material-ui/core/Box';
const HomePage = () => {
  return (
    <Grid container>
      <Grid item sm={12} md={9}>
        <DebateWall />
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
    </Grid>
  );
};

export default HomePage;
