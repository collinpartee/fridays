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

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange(checked);
  };

console.log('color', color)

  return (
    <div style={{position: 'absolute', top: 0, right: 20, display: 'flex', alignItems: 'center'}}>
    <FontAwesomeIcon icon={faSun} color= {color} />
    <Switch size="small" checked={checked} onChange={handleChange} name="checkedC" style={{color: color}} />
    <FontAwesomeIcon icon={faMoon} color={color} />
  </div>
  );
}
