import React, { useEffect, useState } from "react";
import Axios from "axios";
import DropdownList from "react-widgets/DropdownList";

const DestDropdown = (props, { toggle, displayText }) => {
  const [destArr, updateArr] = useState([]);
  //send typed data to backend for processing
  async function onType(value) {
    const res = await Axios.post("http://localhost:4000/searchfilter", {
      value: value,
    });
    updateArr(res.data);
  }

  return (
    <div style={{ display: "inline-block" }} className="inputs">
      <p className="input-title" style={{ textAlign: "left" }}>
        {props.title}
      </p>
      <DropdownList
        name={props.name}
        placeholder="Destination"
        data={destArr}
        filter="contains"
        //when a value has been chosen or changed
        onChange={(value) => {
          props.handleChange(props.name, value);
          value === ""
            ? props.updateComplete(false)
            : props.updateComplete(true);
        }}
        //when user is typing in the filter box
        onSearch={(value) => {
          onType(value);
        }}
      />
    </div>
  );
};

export default DestDropdown;
