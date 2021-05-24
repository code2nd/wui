import React from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'succedd' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('w-icon', className, {
    [`w-icon-${theme}`]: theme
  });
  
  return (
    <FontAwesomeIcon className={classes} { ...restProps } />
  )
}

export default Icon;