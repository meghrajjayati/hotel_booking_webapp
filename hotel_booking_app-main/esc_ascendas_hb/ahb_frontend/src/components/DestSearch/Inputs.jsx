import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import DestDropdown from "./DestDropdown";
import Datepick from "./Datepick";
import Numberpicker from "./Numberpicker";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { Link } from "react-router-dom";

function Inputs(props) {
  const [isComplete, updateComplete] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  function updateInfo() {
    props.updateDestInfo(props.inputDestInfo);
  }
  async function onSub() {
    console.log("updated dest info");
    props.updateResults(false);
    props.updateSearchState(true);
    props.updateHotelList([]);
    const res = await Axios.post(
      "http://localhost:4000/searchdata",
      props.destInfo
    );
    let hotelArr = res.data.filter((item) => {
      return "name" in item ? true : false;
    });
    // console.log(hotelArr);
    props.updateResults(true);
    props.updateHotelList(hotelArr);
  }

  useEffect(() => {
    if (!isRendered) setIsRendered(true);
    else if (isRendered) onSub();
  }, [props.destInfo]);
  return (
    <Container className="inputs-container">
      <Row>
        <Col lg={3} className="destDrop">
          <DestDropdown
            handleChange={props.handleChange}
            title="Destination"
            name="destination"
            updateComplete={updateComplete}
            destinationName={props.inputDestInfo.destination}
          />
        </Col>
        <Col lg={2}>
          <Datepick
            handleChange={props.handleChange}
            date={new Date()}
            altDate={props.inputDestInfo.endDate}
            global={props.inputDestInfo.startDate}
            title="Check In"
            name="startDate"
            minDate={new Date()}
          />
        </Col>
        <Col lg={2}>
          <Datepick
            handleChange={props.handleChange}
            altDate={null}
            global={props.inputDestInfo.endDate}
            date={props.inputDestInfo.endDate}
            title="Check Out"
            name="endDate"
            minDate={
              Date.parse(props.inputDestInfo.startDate) + 3600 * 1000 * 24
            }
          />
        </Col>
        <Col lg={1}>
          <Numberpicker
            title="Adults"
            data={[1, 2, 3, 4]}
            handleChange={props.handleChange}
            defaultValue={2}
            name="adults"
          />
        </Col>
        <Col lg={1}>
          <Numberpicker
            title="Children"
            data={[0, 1, 2, 3, 4]}
            handleChange={props.handleChange}
            defaultValue={0}
            name="children"
          />
        </Col>
        <Col lg={1}>
          <Numberpicker
            handleChange={props.handleChange}
            title="Rooms"
            data={[1, 2, 3, 4]}
            defaultValue={1}
            name="rooms"
          />
        </Col>
        <Col lg={1}>
          {isComplete && (
            <Link to="/">
              <Button
                onClick={updateInfo}
                style={{ marginTop: "24px", height: "50px" }}
                variant="dark"
              >
                Search
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Inputs;
