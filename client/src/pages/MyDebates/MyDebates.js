import React from 'react';
import Grid from '@material-ui/core/Grid';
import MyDebatesWall from './MyDebatesWall';
import SideBar from '../../views/SideBar/SideBar';
import Box from '@material-ui/core/Box';
const MyDebates = () => {
  return (
    <Grid container>
      <Grid item sm={12} md={9} style={{ paddingLeft: 10 }}>
        <MyDebatesWall />
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

export default MyDebates;
