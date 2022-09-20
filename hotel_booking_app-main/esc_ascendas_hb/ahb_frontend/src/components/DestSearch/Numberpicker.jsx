import DropdownList from "react-widgets/DropdownList";
import React, { useState, useEffect } from "react";

const Numberpicker = (props) => {
  const [numberValue, updateValue] = useState(props.defaultValue);

  useEffect(() => {
    props.handleChange(props.name, numberValue);
  }, []);
  return (
    <div
      name={props.name}
      className="inputs"
      style={{ display: "inline-block" }}
    >
      <p className="input-title" style={{ textAlign: "left" }}>
        {props.title}
      </p>
      <DropdownList
        defaultValue={numberValue}
        data={props.data}
        value={numberValue}
        onChange={(value) => {
          props.handleChange(props.name, value);
          updateValue(value);
        }}
      />
    </div>
  );
};

export default Numberpicker;
