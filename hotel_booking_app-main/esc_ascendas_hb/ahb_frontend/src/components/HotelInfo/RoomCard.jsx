import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import numNights from "../../utilities/numNights";

function RoomCard(props) {
  const breakfast = "hotel_detail_breakfast_included";
  const [roomInfo, updateRoomInfo] = useState(props.roomData);
  const [imgsrc, updateImg] = useState(null);
  const assignRoom = () => {
    props.updateSelectedRoom(roomInfo);
  };
  useEffect(() => {
    try {
      updateImg(roomInfo.images[0].url);
    } catch (e) {
      updateImg("");
    }
  }, []);
  return (
    <Card bg={"Light"} style={{ margin: "1% 0" }}>
      <Card.Header>
        {" "}
        <span data-testid="roomDesc">{roomInfo.roomNormalizedDescription}</span>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col lg={4}>
            <img
              data-testid="image"
              src={imgsrc}
              alt="room image"
              style={{ height: "auto", maxHeight: "200px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./images/img_not_found.png";
              }}
            />
          </Col>
          <Col lg={4}>
            {roomInfo.roomAdditionalInfo.breakfastInfo === breakfast ? (
              <Card.Title>
                <Icon.CupStraw /> Breakfast Included
              </Card.Title>
            ) : (
              <Card.Title>Room Only</Card.Title>
            )}
            <Card.Subtitle>
              {roomInfo.free_cancellation === true ? (
                <span data-testid="is-free" style={{ color: "#4CAF50" }}>
                  Free Cancellation
                </span>
              ) : (
                <span data-testid="is-not-free" style={{ color: "darkorange" }}>
                  Non Refundable
                </span>
              )}
            </Card.Subtitle>
          </Col>
          <Col lg={2}>
            <Card.Title>
              <span data-testid="room-price">
                SGD
                <strong>
                  {Math.floor(
                    (roomInfo.price /
                      numNights(
                        props.destInfo.startDate,
                        props.destInfo.endDate
                      )) *
                      100
                  ) / 100}
                </strong>
              </span>
            </Card.Title>
            <Card.Subtitle>per room per night</Card.Subtitle>
            <br />
            <Card.Title>
              SGD<strong>{roomInfo.price}</strong>
            </Card.Title>
            <Card.Subtitle>in total</Card.Subtitle>
          </Col>
          <Col lg={2}>
            <Link to="/bookingpage">
              <Button data-testid="select" variant="dark" onClick={assignRoom}>
                Reserve
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;
