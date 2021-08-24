import React from 'react';
import { styled } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Popover from '@material-ui/core/Popover';
import { WbSunny, NightsStay, Mood, MoodBad } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

type ThemeSwitchProps = {
  onChange: Function,
  color: string,
  secondColor: string
 };

export function ThemeSwitch ({onChange, color, secondColor}: ThemeSwitchProps) {
  // TODO: having a weird issue where (i think) material ui
  // is converting my hex value to an rgb value. problem
  // happens because all hex values cannot be calculated
  // to rgb values...
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [mainColorAnchorEl, setMainColorAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [secondColorAnchorEl, setSecondColorAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenMainColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMainColorAnchorEl(event.currentTarget);
  };

  const handleCloseMainColor = () => {
    setMainColorAnchorEl(null);
  };

  const mainColorOpen = Boolean(mainColorAnchorEl);
  const mainId = mainColorOpen ? 'main-color-popover' : undefined;


  const handleOpenSecondColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSecondColorAnchorEl(event.currentTarget);
  };

  const handleCloseSecondColor = () => {
    setSecondColorAnchorEl(null);
  };

  const secondColorOpen = Boolean(secondColorAnchorEl);
  const secondId = secondColorOpen ? 'second-color-popover' : undefined;

  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange(checked);
  };

  return (
    <div style={{position: 'absolute', top: '8px', right: 24, display: 'flex'}}>
      <input id="toggle" className='toggle' type="checkbox" onClick={handleChange} style={{color: color}}></input>
      {/* //TODO: add hover over with color codes */}
      {/* <Typography
        aria-owns={mainColorOpen ? 'main-color-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpenMainColor}
      >
        <WbSunny 
      fontSize='small' 
      style={{color: color}} />
      </Typography>
    
    <Switch size="small" checked={checked} onChange={handleChange} name="checkedC" style={{color: color,}} />
    <Typography
        aria-owns={secondColorOpen ? 'second-color-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpenSecondColor}
      >

    <NightsStay fontSize='small' style={{color: color}}/>
    </Typography>

      <Popover
        id={mainId}
        open={mainColorOpen}
        anchorEl={mainColorAnchorEl}
        onClose={handleCloseMainColor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>{color}</Typography>
      </Popover>

      <Popover
        id={secondId}
        open={secondColorOpen}
        anchorEl={secondColorAnchorEl}
        onClose={handleCloseSecondColor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>{secondColor}</Typography>
      </Popover> */}
  </div>
  );
}
