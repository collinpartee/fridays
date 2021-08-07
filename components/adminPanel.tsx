import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Typography, Button, ButtonGroup, TextField, Chip, Checkbox } from '@material-ui/core';
import { AppAdminContext } from '../context/appAdminContext';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Services from '../utils/services'

const Container = styled(Box)({
  width: '100%',
  display: "flex",
  flexDirection: 'column',
  paddingLeft: '16px'
});

const InputRow = styled(Box)({});

type AdminPanelProps = { };

export default function AdminPanel(props: AdminPanelProps) {

  const { adminData, updateData } = React.useContext(AppAdminContext) as ContextType

  const [loggedIn, setLoginStatus] = React.useState(true); //TODO: change to false when your done dev'ing
  const [customDate, setCustomDate] = React.useState(false); 

  const handleChange = () => {
    setLoginStatus((prev) => !prev);
  };

  const removeFromList = (key: string, value: string = '') => {  
    switch(key) {
      case 'countdownLabel':
      case 'countdownDate':
      case 'imageInspiration':
        adminData[key] = []
        console.log('removeFromList', adminData);
        updateData(adminData)
        break;
      default:
        var indexOfValue = adminData[key].indexOf(value)
        adminData[key].splice(indexOfValue, 1)
        updateData(adminData)
        break
    }
  }
  
  const addToList = (key: string, value: string) => {
    if (value.length == 0) return
    
    var _adminData: AppAdminData = Object.assign({}, adminData)

    _adminData[key].push(value)
    updateData(_adminData)
  }

  const BigOne = (key: string, onBlur: Function, arrayLength: number) => {
    if(arrayLength >= 7) return;

    var value = '';

    function updateValue(e) {
      value = e;
    }

    return (
      <React.Fragment>
      <TextField label="" onBlur={(e) => { updateValue(e.target.value) }} style={{width: '80px'}}/>
      <IconButton onClick={() => onBlur(key, value)}>
        <CheckIcon />
      </IconButton>
      </React.Fragment>
    )
  }

  const SmallOne = (key: string, onBlur: Function, arrayLength: number) => {
    if(arrayLength > 0) return;

      var value = '';

      function updateValue(e) {
        value = e;
      }

    return (
      <React.Fragment>
        <TextField label="" onBlur={(e) => { updateValue(e.target.value) }} />
        <IconButton onClick={() => onBlur(key, value)}>
          <CheckIcon />
        </IconButton>
      </React.Fragment>
    )
  }

  const CountdownInput = (key: string, onBlur: Function, arrayLength: number) => {
    if(arrayLength > 0) return;

    let customLabelValue = '';

    function megaBlur(key: string, day: string): void {
      let daysTill = '';
      removeFromList('countdownLabel')
      removeFromList('countdownDate')
      switch(day) {
        case 'monday':
          daysTill = Services.getCountdown('1');
          break
        case 'tuesday':
          daysTill = Services.getCountdown('2');
          break
        case 'wednesday':
          daysTill = Services.getCountdown('3');
          break
        case 'thursday':
          daysTill = Services.getCountdown('4');
          break
        case 'friday':
          daysTill = Services.getCountdown('5');
          break
        case 'saturday':
          daysTill = Services.getCountdown('6');
          break
        case 'sunday':
          daysTill = Services.getCountdown('7');
          break
      }
      onBlur('countdownDate', daysTill)
      onBlur('countdownLabel', day)
    }

    function handleCheckbox(e) {
      setCustomDate(e.target.checked)
    }

    function handleDateChange(e) {
      removeFromList('countdownDate')
      var daysTill = Services.getCountdown(e);
      console.log(daysTill)
      onBlur('countdownDate', daysTill)
    }
    function handleLabelChange(value: string) {
      customLabelValue = value
    }
  
    return (
      <Container>
       { customDate 
       ? <Container>
         <div>
          <TextField
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}
          style={{ width: '160px' }}/>
          <TextField label="" onBlur={(e) => { handleLabelChange(e.target.value) }}/>
          <IconButton onClick={() => onBlur('countdownLabel', customLabelValue)}>
          <CheckIcon />
        </IconButton>
        </div> 
         </Container>
        : <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={() => megaBlur(key, "monday")}>M</Button>
            <Button onClick={() => megaBlur(key, 'tuesday')}>T</Button>
            <Button onClick={() => megaBlur(key, 'wednesday')}>W</Button>
            <Button onClick={() => megaBlur(key, 'thursday')}>Th</Button>
            <Button onClick={() => megaBlur(key, 'friday')}>F</Button>
          </ButtonGroup> }
        <div><Checkbox size="small" checked={customDate} onChange={handleCheckbox}/> Custom Date</div>
      </Container>
    )
  }

  const SwitchOnDataType = (key: string, onBlur: Function, arrayLength: number) => {
    switch(key) {
      case 'countdownLabel':
        // removeFromList('countdownDate')
        return CountdownInput(key, onBlur, arrayLength)
      case 'imageInspiration':
        return SmallOne(key, onBlur, arrayLength)
      case 'subredditList':
      case 'tickerList':
        return BigOne(key, onBlur, arrayLength)
    }
  }

  const formatValue = (key: string, value: string): string => {
    if(key == 'subredditList')
      return 'r/'+value;

    if(key == 'tickerList')
      return value.toUpperCase();

    return value;
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
          if(key !== 'countdownDate') {
            return (
              <InputRow key={i} display='flex' alignItems='baseline' style={{ width: i % 2 !== 0 ? '30%' : '50%' }}>
                <div style={{width: i % 2 !== 0 ? '35%' : '15%'}}>{key} :</div>
                <div style={{display: adminData[key].length > 0 ? 'flex' : 'none', width: i % 2 !== 0 ? '65%' : '85%', flexWrap: 'wrap'}}>{ adminData[key].map((value, j) =><Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} key={j} size="small" label={formatValue(key, value)} />)}</div>
                              
                {SwitchOnDataType(key, addToList, adminData[key].length)}
  
              </InputRow>
            )
          }
        })}


      </div>}
    </Container>
  );
}