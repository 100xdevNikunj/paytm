/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function Heading(props) {
  return (
    <div className='font-bold text-4xl pt-6'>{props.title}</div>
  );
}

export default Heading;