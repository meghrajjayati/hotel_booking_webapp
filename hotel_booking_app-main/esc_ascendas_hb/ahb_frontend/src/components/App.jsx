import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import HotelPage from "./HotelInfo/HotelPage";
import DestSearch from "./DestSearch/DestSearch";
import BookingPage from "./Booking/BookingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import HandleBooking from "./Booking/HandleBooking";

function App() {
  const [currentHotel, updateCurrentHotel] = useState(null);
  const [receivedResults, updateResults] = useState(false);
  const [searchState, updateSearchState] = useState(false);
  const [hotelList, updateHotelList] = useState([]);
  const [destInfo, updateDestInfo] = useState({
    destination: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24),
    adults: 0,
    children: 0,
    rooms: 0,
  });
  const [inputDestInfo, updateInputDestInfo] = useState({
    destination: "",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3600 * 1000 * 24),
    adults: 0,
    children: 0,
    rooms: 0,
  });
  const [roomDataArr, updateRoomDataArr] = useState([]);
  const [selectedRoom, updateSelectedRoom] = useState({});
  const handleChange = (name, value) => {
    updateInputDestInfo((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  return (
    <div className="main-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route
              index
              element={
                <DestSearch
                  destInfo={destInfo}
                  hotelList={hotelList}
                  currentHotel={currentHotel}
                  inputDestInfo={inputDestInfo}
                  updateDestInfo={updateDestInfo}
                  handleChange={handleChange}
                  updateHotelList={updateHotelList}
                  updateCurrentHotel={updateCurrentHotel}
                  searchState={searchState}
                  updateSearchState={updateSearchState}
                  receivedResults={receivedResults}
                  updateResults={updateResults}
                />
              }
            />
            <Route
              path="/hotelinfo"
              element={
                <HotelPage
                  currentHotel={currentHotel}
                  hotelList={hotelList}
                  destInfo={destInfo}
                  roomData={roomDataArr}
                  inputDestInfo={inputDestInfo}
                  updateDestInfo={updateDestInfo}
                  handleChange={handleChange}
                  updateHotelList={updateHotelList}
                  updateRoomData={updateRoomDataArr}
                  updateSelectedRoom={updateSelectedRoom}
                  searchState={searchState}
                  updateSearchState={updateSearchState}
                  receivedResults={receivedResults}
                  updateResults={updateResults}
                />
              }
            />
            <Route
              path="/bookingpage"
              element={
                <BookingPage
                  currentHotel={currentHotel}
                  destInfo={destInfo}
                  selectedRoom={selectedRoom}
                />
              }
            />
            <Route path="/handlebooking" element={<HandleBooking />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
