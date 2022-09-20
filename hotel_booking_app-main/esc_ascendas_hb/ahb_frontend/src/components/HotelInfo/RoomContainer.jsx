import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import RoomCard from "./RoomCard";

function RoomContainer(props) {
  return (
    <div>
      {props.roomData.length > 0 && (
        <div>
          <Row>
            <Col style={{ marginTop: "1%" }}>
              <Card.Title>Room Options</Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              {props.roomData.length > 0 &&
                props.roomData.map((item, index) => (
                  <RoomCard
                    roomData={item}
                    updateSelectedRoom={props.updateSelectedRoom}
                    className="room-card"
                    destInfo={props.destInfo}
                  />
                ))}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default RoomContainer;
