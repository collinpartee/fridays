import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Button, TextField, Chip } from '@material-ui/core';
import * as cookie from 'cookie-cutter';
import { AppAdminContext } from '../context/appAdminContext';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

const Container = styled(Box)({
  width: '90%',
  display: "flex",
  flexDirection: 'column'
});

const InputRow = styled(Box)({
  // padding: '4px 0',
  // border: '1px solid'
});

type AdminPanelProps = {
};

export default function AdminPanel(props: AdminPanelProps) { //TODO: make into a class component...maybe even finally use CONTEXT!!!!!

  const { adminData, updateData } = React.useContext(AppAdminContext) as ContextType

  const [loggedIn, setLoginStatus] = React.useState(true); //TODO: change to false when your done dev'ing

  const handleChange = () => {
    setLoginStatus((prev) => !prev);
  };

  const removeFromList = (key: string, value: string, position: number) => { //TODO: position to see if its imageInspiration or countdownDate
    var _adminData: AppAdminData = Object.assign({}, adminData)
    var indexOfValue = _adminData[key].indexOf(value)
    _adminData[key].splice(indexOfValue, 1)
    console.log('removeFromList', _adminData);
    updateData(_adminData)
  }
  
  const addToList = (key: string, value: string) => {
    if (value.length == 0)
      return
    var _adminData: AppAdminData = Object.assign({}, adminData)

    _adminData[key].push(value)
    console.log('addToList', _adminData);
    updateData(_adminData)
  }
  const BigOne = (key: string, onBlur: Function, arrayLength: number) => {
    if(arrayLength >= 7)
      return;

    return (
      <React.Fragment>
      <TextField label="newValue" onBlur={(e) => { onBlur(key, e.target.value) }} />
      <IconButton aria-label="delete">
        <CheckIcon />
      </IconButton>
      </React.Fragment>
    )
  }
  const SmallOne = (key: string, onBlur: Function, arrayLength: number) => {
    if(arrayLength > 0)
      return;
      
    return (
      <React.Fragment>
        <TextField label="newValue" onBlur={(e) => { onBlur(key, e.target.value) }} />
        <IconButton aria-label="delete">
          <CheckIcon />
        </IconButton>
      </React.Fragment>
    )
  }

  return (
    <Container alignItems={loggedIn ? 'flex-start' : 'center'}>
      {!loggedIn && <><Typography variant='h4'>
        Welcome!
        </Typography>

        <div>
          <Button onClick={handleChange} >Sign In</Button>
          <Button onClick={handleChange}>Sign Up</Button>
        </div></>}

      { loggedIn && <div style={{ width: '100%', display: 'flex', flexFlow: 'wrap' }}>
        {Object.keys(adminData).map((key: string, i) => {
          return (
            <InputRow key={i} display='flex' alignItems='baseline' style={{ width: i % 2 !== 0 ? '20%' : '70%' }}>
              <div>{key} :</div>
              { adminData[key].map((value, j) => <Chip style={{ margin: '0 4px' }} onDelete={() => removeFromList(key, value, i)} key={j} size="small" label={value} />)}
              
              { i % 2 !== 0 ? SmallOne(key, addToList, adminData[key].length) : BigOne(key, addToList, adminData[key].length)}
              
            </InputRow>
          )
        })}
      </div>}
    </Container>
  );
}