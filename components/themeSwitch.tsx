import React from 'react';
import { styled } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

type ThemeSwitchProps = {
  onChange: Function,
  color: string,
 };


export function ThemeSwitch ({onChange, color}: ThemeSwitchProps) {
  // TODO: having a weird issue where (i think) material ui
  // is converting my hex value to an rgb value. problem
  // happens because all hex values cannot be calculated
  // to rgb values...
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange(checked);
  };

  return (
    <div style={{position: 'absolute', top: 0, right: 20, display: 'flex', alignItems: 'center'}}>
    <FontAwesomeIcon icon={faSun} color= {color} />
    <Switch size="small" checked={checked} onChange={handleChange} name="checkedC" style={{color: color}} />
    <FontAwesomeIcon icon={faMoon} color={color} />
  </div>
  );
}
