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
  const [selectedAdminKey, setSelectedAdminKey] = React.useState(null); 

  const handleChange = () => {
    setLoginStatus((prev) => !prev);
  };

  const removeFromList = (key: string, value: string = '') => {  
    switch(key) {
      case 'countdownLabel':
      case 'countdownDate':
      case 'mainImage':
        adminData.mainImage.url = '';
        adminData.mainImage.inpsiration = '';
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

    if(Array.isArray(_adminData[key])) {
      _adminData[key].push(value)
      updateData(_adminData)
    } else if (key == 'mainImage') {
      _adminData.mainImage.inpsiration = value
      updateData(_adminData)
    }
  }

  const MultiInput = (key: string, onBlur: Function) => {

    var value = '';

    function updateValue(e) {
      value = e;
    }

    return (
      <div>
      <TextField label="" onBlur={(e) => { updateValue(e.target.value) }} style={{width: '80px'}}/>
      <IconButton onClick={() => onBlur(key, value)}>
        <CheckIcon />
      </IconButton>
      </div>
    )
  }

  const SingleInput = (key: string, onBlur: Function) => {

      var value = '';

      function updateValue(e) {
        value = e;
      }

    return (
      <div>
        <TextField label="" onBlur={(e) => { updateValue(e.target.value) }} />
        <IconButton onClick={() => onBlur(key, value)}>
          <CheckIcon />
        </IconButton>
      </div>
    )
  }

  const CountdownInput = (key: string, onBlur: Function) => {

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
      <Container alignItems='center'>
       { customDate 
       ? <Container>
         <div>
          <TextField label='Countdown Event' style={{marginLeft: '3rem'}} onBlur={(e) => { handleLabelChange(e.target.value) }}/>
          <IconButton onClick={() => onBlur('countdownLabel', customLabelValue)}>
          <CheckIcon />
        </IconButton>
        <br />
        <TextField
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}/>
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

  const DisplayChips = (key: string, data: AppAdminData) => {
    var isArrayType = Array.isArray(data[key]);
    if(isArrayType) {
      return data[key].map((value: string, j: number) => <Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} key={j} size="small" label={formatValue(key, value)} />)
    } else if(key == 'mainImage') {
      let value = data.mainImage.inpsiration;
      return <Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} size="small" label={formatValue(key, value)} />
    }

    return (<div>not an array. need to handle this.</div>)
  }

  const DisplayInputs = (key: string, onBlur: Function) => {
    switch(key) {
      case 'countdownLabel':
        // removeFromList('countdownDate')
        return CountdownInput(key, onBlur)
      case 'mainImage':
        return SingleInput(key, onBlur)
      case 'subredditList':
      case 'tickerList':
        return MultiInput(key, onBlur)
    }
  }

  const RenderHelpMessage = (key: string, arrayLength: number) => {
    switch(key) {
      case 'countdownLabel':
        return <div>Choose a day and we'll count down together!</div>
      case 'mainImage':
        return <div>Choose a subject that you want to see pictures about. Pics come from unsplash.</div>
      case 'subredditList':
        return <div>You can choose up to 7 subreddits to browse. The first 25 posts are displayed.</div>
      case 'tickerList':
        return <div>You can choose up to 7 stocks to follow. They are updated almost never</div>
    }
  }

  const formatValue = (key: string, value: string): string => {
    if(key == 'subredditList')
      return 'r/'+value;

    if(key == 'tickerList')
      return value.toUpperCase();

    return value;
  }

  const RenderAdminValues = (key: string, adminData) => {
    if(!key) return

    const data = adminData[key]
    return (
      <div style={{width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div>
          { DisplayChips(key, adminData)}
        </div>
        {DisplayInputs(key, addToList)}
        {RenderHelpMessage(key, adminData[key].length)}
      </div>
      );
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

      <ButtonGroup
        size='small'
        orientation="vertical"
        variant="text">
        {Object.keys(adminData).map( (data, i) => data === 'countdownDate' 
        ? null 
        : <Button key={i} onClick={ ()=> setSelectedAdminKey(data)}> { data === selectedAdminKey ? '*'+data : data } 
            </Button>)}
      </ButtonGroup>

      {RenderAdminValues(selectedAdminKey, adminData)}
      </div>}
    </Container>
  );
}