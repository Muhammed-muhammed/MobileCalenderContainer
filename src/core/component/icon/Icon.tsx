import React from 'react';
import IconType from './IconType';

const Icon = ({ type, style = {} }) => {
  return <span style={style}>🔔 ({type})</span>;
};

export default Icon;