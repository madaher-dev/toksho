import React from 'react';
import Grid from '@material-ui/core/Grid';
import DebateWall from '../Components/DebateWall/DebateWall';
import SideBar from '../Components/SideBar/SideBar';
const HomePage = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={9}>
        <DebateWall />
      </Grid>
      <Grid item xs={false} sm={3}>
        <SideBar />
      </Grid>
    </Grid>
  );
};

export default HomePage;
