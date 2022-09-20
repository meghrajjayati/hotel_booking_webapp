const api = require("./fetch_api");

async function getHotelData(hotel_id) {
  // Storing response
  let data = {};
  let url = `https://hotelapi.loyalty.dev/api/hotels/${hotel_id}`;
  try {
    data = await api.fetch_info_url(url);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
  return data;
}
// getHotelData("diH7")

async function getHotelPrice(uid, body) {
  // Storing response
  let num_guests = body.adults + body.children
  let guests = num_guests;
  for (let i = 1; i < body.rooms; i++) {
    guests += "|" + num_guests;
  }
  let data = {};
  let url = `https://hotelapi.loyalty.dev/api/hotels/${body.hotel_id}/price?destination_id=${uid}&checkin=${body.startDate}&checkout=${body.endDate}&lang=en_US&currency=SGD&landing_page=&partner_id=1&country_code=SG&guests=${guests}`;
  console.log(url);
  try {
    data = await api.fetch_prices_url(url); 
  } catch (e) {
    console.log(e);
    data.rooms = [];
  }
  return data.rooms;
}

// getHotelPrice(uid,body).then(data => console.log(data[0].lowest_price));

module.exports = { getHotelData, getHotelPrice };
