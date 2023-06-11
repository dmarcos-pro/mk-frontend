import React, { useState, useEffect } from 'react';
import { Box, Pagination, Grid } from '@mui/material';
import axios from 'axios';

type NavProps = {
  page: number;
  limit: number;
  updatePage: (value: number) => void;
}
const Nav = (props: NavProps) => {
  const [pagination, setPagination] = useState<number>(0);

  useEffect(() => {
    axios.get('http://localhost:3001/creatives').then(function(response){
      const lengthAds = response.data.length;
      const count = Math.ceil(lengthAds/props.limit);
        setPagination(count);
    });
  });

  const changePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    props.updatePage(value);
  };

  return (
    <Box padding={4}>
      <Grid container justifyContent="center">
        <Pagination
          count={pagination}
          page={props.page}
          onChange={changePagination}
        />
      </Grid>
    </Box>
  );
};

export default Nav;