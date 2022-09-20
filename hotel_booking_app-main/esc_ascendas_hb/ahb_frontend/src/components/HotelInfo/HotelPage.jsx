import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Card,
  Placeholder,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Inputs from "../DestSearch/Inputs";
import Map from "./Map";
import RoomContainer from "./RoomContainer";
import Axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Range from "../../utilities/Range";
import findLowestPrice from "../../utilities/findLowest";
import HotelDetails from "./HotelDetails";

function HotelPage(props) {
  const maxRating = 5;
  const mapRef = useRef(null);
  const roomRef = useRef(null);
  const [minPrice, updateMinPrice] = useState(0);
  const [fetched, updateFetchState] = useState(false);
  const [rating, nonRating] = Range(0, props.currentHotel.rating, maxRating);
  async function requestRoomInfo() {
    try {
      const res = await Axios.post("http://localhost:4000/roomInfo", {
        destination: props.destInfo.destination,
        hotel_id: props.currentHotel.id,
        startDate: props.destInfo.startDate,
        endDate: props.destInfo.endDate,
        adults: props.destInfo.adults,
        children: props.destInfo.children,
        rooms: props.destInfo.rooms,
      });
      props.updateRoomData(res.data);
      updateFetchState(true);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  const handleMapClick = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleRoomClick = () => {
    roomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    requestRoomInfo();
  }, []);
  useEffect(() => {
    updateMinPrice(findLowestPrice(props.roomData));
  }, [props.roomData]);

  return (
    <Container className="ds">
      <Row>
        <Col lg={12}>
          <Inputs
            destInfo={props.destInfo}
            inputDestInfo={props.inputDestInfo}
            updateDestInfo={props.updateDestInfo}
            handleChange={props.handleChange}
            updateSearchState={props.updateSearchState}
            searchState={props.searchState}
            updateHotelList={props.updateHotelList}
            receivedResults={props.receivedResults}
            updateResults={props.updateResults}
          />
        </Col>
      </Row>
      <HotelDetails
        currentHotel={props.currentHotel}
        destInfo={props.destInfo}
        fetched={fetched}
        rating={rating}
        nonRating={nonRating}
        minPrice={minPrice}
        handleRoomClick={handleRoomClick}
        handleMapClick={handleMapClick}
      />
      <Row className="description">
        <ListGroup
          horizontal="md"
          style={{ marginLeft: "5px", marginTop: "1%" }}
        >
          <ListGroupItem>
            <div
              dangerouslySetInnerHTML={{
                __html: props.currentHotel.description,
              }}
            ></div>
          </ListGroupItem>
          <ListGroupItem className="amenities">
            <div>
              <p>
                <strong>Amenities:</strong>
              </p>
              <ul style={{ listStyle: "none" }}>
                {Object.keys(props.currentHotel.amenities).map((value) => {
                  return (
                    <li>
                      <Icon.Check2Circle />{" "}
                      {value
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, function (str) {
                          return str.toUpperCase();
                        })}
                    </li>
                  );
                })}
              </ul>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Row>
      <Row className="description">
        <Col ref={roomRef}>
          {fetched ? (
            <RoomContainer
              roomData={props.roomData}
              updateSelectedRoom={props.updateSelectedRoom}
              destInfo={props.destInfo}
            />
          ) : (
            <Card.Body>
              <Card.Title>Fetching Room Data...</Card.Title>
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </Card.Body>
          )}
        </Col>
      </Row>
      <Row className="description" ref={mapRef}>
        <Map
          lat={props.currentHotel.latitude}
          long={props.currentHotel.longitude}
          height={"600px"}
          width={"100%"}
        />
      </Row>
      <Row style={{ marginBottom: "50px" }}></Row>
    </Container>
  );
}

export default HotelPage;
