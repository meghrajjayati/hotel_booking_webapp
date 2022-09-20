import React from "react";
import Map from "./HotelInfo/Map";
import Axios from "axios";
function Test() {
  const [mapDetails, updateMap] = React.useState({
    lat: 1.3521,
    long: 103.8198,
  });
  //get data from backend
  async function getMapData(event) {
    const res = await Axios.post("http://localhost:4000/Map", { code: 1 }); //we can decide on what msgs to pass later
    console.log(res.data);
    updateMap(res.data);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Map lat={mapDetails.lat} long={mapDetails.long} />
        <button onClick={getMapData} type="submit">
          Press Me
        </button>
      </form>
    </div>
  );
}

export default Test;
