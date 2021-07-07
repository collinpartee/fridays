import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import { SubData, Subreddits } from '../models/SubData';
import { Post } from './post';
import CustomModal from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AppAdminData } from '../pages';


const Container = styled(Box)({
  width: '90%',
  display:"flex",
   flexDirection: 'column'
});

const Menu = (data: AppAdminData) => (
<div>
  Menu stifff - 
  { Object.keys(data).map( (key, i) => {
    console.log(key)
    return (
      <Box key={i} display='flex'>
        <div>{key} :</div>
        {data[key].split(',').map( (value, j) => {
          return (
            <div>{value}</div>
          );
        })}
      </Box>
    )})}
</div>
);

function Menu2(data) {

  return (
    <div>
  { Object.keys(data).map( (key, i) => {
    console.log(key)
    return (
      <Box key={i} display='flex'>
        <div>{key} :</div>
        {data[key].split(',').map( (value, j) => {
          return (
            <div key={j}>{value}</div>
          );
        })}
      </Box>
    )})}
</div>
  )
}

type AdminPanelProps = {
  data: AppAdminData
 };

export default function AdminPanel({data}: AdminPanelProps) {
  const [loggedIn, setLoginStatus] = React.useState(false);
console.log(data)
  const handleChange = () => {
    setLoginStatus((prev) => !prev);
  };
  return (
    <Container alignItems={loggedIn ? 'flex-start' : 'center'}>
      {!loggedIn && <><Typography variant='h4'>
        Welcome!
        </Typography>

        <div>
          <Button onClick={handleChange} >Sign In</Button>
          <Button onClick={handleChange}>Sign Up</Button>
        </div></>}

        { loggedIn &&  Menu2(data)}
    </Container>
  );
}