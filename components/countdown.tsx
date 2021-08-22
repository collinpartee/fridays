import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';


const H6 = styled('h6')({
  fontSize: '1.25rem',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontWeight: 'lighter',
  lineHeight: '1.6',
  letterSpacing: '0.0075em',
  margin: '0'
});

type CountdownProps = {
  data: Countdown,
  textColor: string
};

var loading = true;

// setTimeout(() => {
//   loading = false
// }, 2000);


export const Countdown = ({ data, textColor }: CountdownProps) => {
  if(!data.label)
    return null

  return  (
    <Box display="flex" alignItems='center'>
      {/* {loading
        ? <Skeleton width={210} height={72} animation="wave" variant="rect" />
        : <> */}
          <Typography variant="h2">
            {data.date}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems='center' padding='0 8px'>
            <H6>
              {data.date != '1' ? 'days' : 'day'}
          </H6>
            <H6>
              till
          </H6>
          </Box>
          <Typography variant="h2">
            {data.label}
          </Typography>
        {/* </>} */}
    </Box>);
}
