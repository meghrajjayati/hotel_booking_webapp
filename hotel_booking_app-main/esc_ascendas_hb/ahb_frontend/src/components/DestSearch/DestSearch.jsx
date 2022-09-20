import React, { useState, useEffect } from "react";
import Inputs from "./Inputs";
import { Col, Row, Container, Spinner, Card } from "react-bootstrap";
import HotelCard from "./HotelCard";
import numNights from "../../utilities/numNights";
import "react-widgets/styles.css";
function DestSearch(props) {
  return (
    <Container className="ds">
      <Row>
        <Col lg={12}>
          <Inputs
            destInfo={props.destInfo}
            updateDestInfo={props.updateDestInfo}
            inputDestInfo={props.inputDestInfo}
            handleChange={props.handleChange}
            updateSearchState={props.updateSearchState}
            searchState={props.searchState}
            updateHotelList={props.updateHotelList}
            hotelList={props.hotelList}
            receivedResults={props.receivedResults}
            updateResults={props.updateResults}
          />
        </Col>
        {props.hotelList.length == 0 &&
          props.searchState &&
          !props.receivedResults && (
            <Col style={{ textAlign: "center", marginTop: "5%" }}>
              <Spinner animation="grow" variant="light" />
            </Col>
          )}
        {props.receivedResults && props.hotelList.length === 0 && (
          <Card
            className="inputs-container"
            style={{ marginTop: "1%", width: "50%" }}
          >
            <Card.Subtitle>No results were found.</Card.Subtitle>
          </Card>
        )}
        {props.receivedResults && (
          <Col lg={12} style={{ textAlign: "center", fontSize: "30px" }}>
            <ul>
              {props.hotelList.map((item, index) => (
                <HotelCard
                  key={index}
                  adults={props.destInfo.adults}
                  children={props.destInfo.children}
                  rooms={props.destInfo.rooms}
                  img={
                    item.image_details.prefix + "0" + item.image_details.suffix
                  }
                  hotel={item}
                  hotelList={props.hotelList}
                  id={index}
                  night={numNights(
                    props.destInfo.startDate,
                    props.destInfo.endDate
                  )}
                  updateCurrentHotel={props.updateCurrentHotel}
                  currentHotel={props.currentHotel}
                />
              ))}
            </ul>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DestSearch;
