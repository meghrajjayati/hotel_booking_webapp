import React, { useEffect, useState } from "react";
import DatePicker from "react-widgets/DatePicker";
import "react-widgets/styles.css";
const Datepick = (props) => {
  useEffect(() => {
    props.handleChange(
      props.name,
      new Date(props.date).toISOString().slice(0, 10)
    );
  }, []);
  return (
    <div className="inputs" style={{ display: "inline-block" }}>
      <p className="input-title" style={{ textAlign: "left" }}>
        {props.title}
      </p>
      <DatePicker
        name={props.name}
        defaultValue={props.minDate}
        value={new Date(props.global)}
        min={new Date(props.minDate)}
        onChange={(value) => {
          props.handleChange(props.name, value.toISOString().slice(0, 10));
          // check date if startDate has changed//
          console.log("changed");
          if (props.altDate !== null) {
            console.log(value.getTime());
            if (value.getTime() > new Date(props.altDate).getTime())
              console.log("changing");
            props.handleChange(
              "endDate",
              new Date(value.getTime() + 3600 * 1000 * 24)
                .toISOString()
                .slice(0, 10)
            );
          }
        }}
        placeholder="dd/mm/yy"
      />
    </div>
  );
};

export default Datepick;
