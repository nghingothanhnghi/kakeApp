import React, { forwardRef, useImperativeHandle } from 'react';

export default (props) => {
  const country = props.valueFormatted ? props.valueFormatted : props.value;
  return (
    <span className="total-value-renderer">
      <span>{country}</span>
    </span>
  );
};
