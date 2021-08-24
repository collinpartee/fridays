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
  const [customDate, setCustomDate] = React.useState(adminData.countdown.custom); 
  const [selectedAdminKey, setSelectedAdminKey] = React.useState(null); 

  const handleChange = () => {
    setLoginStatus((prev) => !prev);
  };

  const removeFromList = (key: string, value: string = '') => {  
    switch(key) {
      case 'countdown':
        adminData.countdown.label = '';
        console.log('removeFromList', adminData);
        updateData(adminData)
        break;
      case 'image':
        adminData.image.url = '';
        adminData.image.inpsiration = '';
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
  
  const addToList = (key: string, value: any) => {
    if (value.length == 0) return

    var _adminData: AppAdminData = Object.assign({}, adminData)

    if(Array.isArray(_adminData[key])) {
      _adminData[key].push(value)
      updateData(_adminData)
    } else if (key == 'image') {
      _adminData.image.inpsiration = value
      updateData(_adminData)
    } else if (key == 'countdown') {
      _adminData.countdown = {
        ..._adminData.countdown,
        ...value
      }
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
      <TextField label="" onBlur={(e) => { updateValue(e.target.value) }}/>
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
      let date = ''
      removeFromList('countdown')
      switch(day) {
        case 'monday':
          date = '1';
          daysTill = Services.getCountdown(date);
          break
        case 'tuesday':
          date = '2';
          daysTill = Services.getCountdown(date);
          break
        case 'wednesday':
          date = '3';
          daysTill = Services.getCountdown(date);
          break
        case 'thursday':
          date = '4';
          daysTill = Services.getCountdown(date);
          break
        case 'friday':
          date = '5';
          daysTill = Services.getCountdown(date);
          break
        case 'saturday':
          date = '6';
          daysTill = Services.getCountdown(date);
          break
        case 'sunday':
          date = '';
          daysTill = Services.getCountdown(date);
          break
      }
      let data: Countdown = {date , label: day, custom: false, daysTill}
      onBlur('countdown', data)
    }

    function handleCheckbox(e) {
      setCustomDate(e.target.checked)
    }

    function handleDateChange(e) {
      removeFromList('countdown')
      var daysTill = Services.getCountdown(e);
      console.log(daysTill)
      onBlur('countdown', {daysTill, label: customLabelValue, custom: true, date: e})
    }

    function handleLabelChange(value: string) {
      customLabelValue = value
    }
  
    return (
      <Box style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'baseline'}}>
       { customDate 
       ? <div>
         <div style={{display: 'flex', alignItems: 'baseline', marginRight: '5%'}}>
          <TextField label='Countdown Label' style={{marginLeft: '3rem'}} onBlur={(e) => { handleLabelChange(e.target.value) }}/>
          <IconButton onClick={() => onBlur('countdown', customLabelValue)}>
            <CheckIcon />
          </IconButton>
        <br />
        <TextField
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}/>
        </div> 
         </div>
        : <><ButtonGroup style={{ padding: '1%'}} size="small" aria-label="small outlined button group">
            <Button onClick={() => megaBlur(key, "monday")}>M</Button>
            <Button onClick={() => megaBlur(key, 'tuesday')}>T</Button>
            <Button onClick={() => megaBlur(key, 'wednesday')}>W</Button>
            <Button onClick={() => megaBlur(key, 'thursday')}>Th</Button>
            <Button onClick={() => megaBlur(key, 'friday')}>F</Button>
          </ButtonGroup> <div style={{padding: '0 8px'}}>or</div> </>}
        <div><Checkbox size="small" checked={customDate} onChange={handleCheckbox}/>Custom Date</div>
      </Box>
    )
  }

  const DisplayChips = (key: string, data: AppAdminData) => {
    var isArrayType = Array.isArray(data[key]);
    if(isArrayType) {
      return data[key].map((value: string, j: number) => <Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} key={j} label={formatValue(key, value)} />)
    } else if(key == 'image') {
      let value = data.image.inpsiration;
      return <Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} label={formatValue(key, value)} />
    } else if(key == 'countdown') {
      let value = data.countdown.label;
      return <Chip style={{ margin: '2px 4px' }} onDelete={() => removeFromList(key, value)} label={formatValue(key, value)} />
    }

    return (<div>not an array. need to handle this.</div>)
  }

  const DisplayInputs = (key: string, onBlur: Function) => {
    switch(key) {
      case 'countdown':
        return CountdownInput(key, onBlur)
      case 'image':
        return SingleInput(key, onBlur)
      case 'subreddits':
      case 'stocks':
        return MultiInput(key, onBlur)
    }
  }

  const RenderHelpMessage = (key: string, arrayLength: number) => {
    //TODO: limit subreddits and stocks to 7
    switch(key) {
      case 'countdown':
        return <div>Choose a day and we'll count down together!</div>
      case 'image':
        return <div>Choose a subject that you want to see pictures about. Pics come from unsplash.</div>
      case 'subreddits':
        return <div>You can choose up to 7 subreddits to browse. The first 25 posts are displayed.</div>
      case 'stocks':
        return <div>You can choose up to 7 stocks to follow</div>
    }
  }

  const formatValue = (key: string, value: string): string => {
    if(key == 'subreddits')
      return 'r/'+value;

    if(key == 'stocks')
      return value.toUpperCase();

    return value;
  }

  const RenderAdminValues = (key: string, adminData) => {
    if(!key) return <div style={{ position: 'relative', top: '100%', right: '20%' }}>Choose a category above to customize your experience</div>

    const data = adminData[key]
    return (
      <div style={{width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <div>
          { DisplayChips(key, adminData)}
        </div>
        {DisplayInputs(key, addToList)}
        {RenderHelpMessage(key, adminData[key].length)}
      </div>
      );
  }

  return (
    <Container alignItems={loggedIn ? 'flex-start' : 'center'} style={{height: '11em'}}>
      {!loggedIn && <><Typography variant='h4'>
        Welcome!
        </Typography>

        <div>
          <Button onClick={handleChange} >Sign In</Button>
          <Button onClick={handleChange}>Sign Up</Button>
        </div></>}

      { loggedIn && <div style={{ width: '100%', display: 'flex', flexFlow: 'wrap' }}>

      <div
        style={{paddingBottom: '3%', border: 'none'}}>
        {Object.keys(adminData).map( (data, i) => <Button key={i} style={{color: 'inherit', borderBottom: data === selectedAdminKey ? '1px solid' : 'none'}} onClick={ ()=> setSelectedAdminKey(data)}> { data } </Button>)}
      </div>

      {RenderAdminValues(selectedAdminKey, adminData)}
      </div>}
    </Container>
  );
}