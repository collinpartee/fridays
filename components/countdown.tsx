import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DashboardData from '../models/DashboardData';


const H6 = styled('h6')({
  fontSize: '1.25rem',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontWeight: '400',
  lineHeight: '1.6',
  letterSpacing: '0.0075em',
  margin: '0'
});

type CountdownProps = {
  data: DashboardData,
  textColor: string
};


export const Countdown = ({ data, textColor }: CountdownProps) => (
  <Box display="flex" alignItems='center'>
    {data.loading
      ? <Skeleton width={210} height={72} animation="wave" variant="rect" />
      : <>
        <Typography variant="h2">
          {data.value}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems='center' padding='0 8px'>
          <H6>
            days
        </H6>
          <H6>
            till
        </H6>
        </Box>
        <Typography variant="h2">
          friday
        </Typography>
      </>}
  </Box>);
