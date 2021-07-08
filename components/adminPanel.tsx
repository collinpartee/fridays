import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Button, TextField, Chip } from '@material-ui/core';
import ChipInput from "material-ui-chip-input";
import { SubData, Subreddits } from '../models/SubData';
import { Post } from './post';
import CustomModal from './modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AppAdminData } from '../pages';
import * as cookie from 'cookie-cutter';


const Container = styled(Box)({
  width: '90%',
  display:"flex",
   flexDirection: 'column'
});

const InputRow = styled(Box)({
  padding: '10px 0',
  // border: '1px solid'
});


function Menu2(data) {

  const addToList = function(key: string, value: string) {
    console.log(key, value)
    data[key].push(value);
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
    <div style={{width: '100%', display: 'flex', flexFlow: 'wrap'}}>
  { Object.keys(data).map( (key, i) => {
      return (
        <InputRow key={i} display='flex' alignItems='baseline' style={{width: i%2 !== 0 ? '20%' :'70%'}}>
          <div>{key} :</div>
          { data[key].map( (value, i) => <Chip style={{margin: '0 8px'}} onDelete={() => {}} key={i} size="small" label={value} />)}
          <TextField label="newValue" onBlur={(e) => {addToList(key, e.target.value)}} />
        </InputRow>
      )
    })}
</div>
    <Button>Save</Button>
</div>
  )
}

type AdminPanelProps = {
  data: AppAdminData
 };

export default function AdminPanel({data}: AdminPanelProps) { //TODO: make into a class component...maybe even finally use CONTEXT!!!!!
  const [loggedIn, setLoginStatus] = React.useState(true); //TODO: change to false when your done dev'ing

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