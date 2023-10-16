import React, { useState } from "react";

const CheckBox = ({ children, ...props }) => {
  return (
    <label>
      <input
        type={props.type}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      {children}
    </label>
  );
};

export default CheckBox;
