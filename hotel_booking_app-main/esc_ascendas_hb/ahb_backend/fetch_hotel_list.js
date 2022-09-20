const api = require("./fetch_api");

async function getPricesData(url) {
  // Storing response
  let data = {};
  try {
    data = await api.fetch_prices_url(url);
    data.hotels.sort(function (a, b) {
      return Number(a.lowest_price) - Number(b.lowest_price);
    });
  } catch (e) {
    console.log(e);
  }
  // show(data);
  return data;
}

async function getNameData(url) {
  // Storing response
  let data = {};
  try {
    data = await api.fetch_info_url(url);
  } catch (e) {
    console.log(e);
  }
  // console.log(data);
  return data;
}

// Defining async function
async function fetch_hotel_list(uid, body) {
  let num_guests = body.adults + body.children;
  let guests = num_guests;
  for (let i = 1; i < body.rooms; i++) {
    guests += "|" + num_guests;
  }

  let url_prices = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${uid}&checkin=${body.startDate}&checkout=${body.endDate}&lang=en_US&currency=SGD&country_code=SG&guests=${guests}&partner_id=1`;
  // `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${uid}&checkin=${body.startDate}&checkout=${body.endDate}&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=${guests}`;
  let url_hotel = `https://hotelapi.loyalty.dev/api/hotels?destination_id=${uid}`;
  console.log(url_prices);
  console.log(url_hotel);
  let hotel_data = await getNameData(url_hotel);
  console.log("loaded hotel data");
  let prices_data = await getPricesData(url_prices);
  console.log("loaded hotel prices");
  let prices = prices_data.hotels;
  let result = [];
  try {
    result = await prices.map((price) => {
      let hotel = hotel_data.find((element) => element.id === price.id);
      return { ...price, ...hotel };
    });
  } catch (err) {
    console.log(err);
    // throw new Error();
    // result = [];
  }
  // console.log(result);
  return result;
}
// fetch_hotel_list('WD0M').then(data => {console.log(data[0].lowest_price);});
body = {
  destination: "Rome, Italy",
  startDate: "2022-07-29",
  endDate: "2022-08-1",
  adults: 2,
  children: 0,
  rooms: 1,
};
// fetch_hotel_list('A6Dz', body).then(data => {console.log(data[0].lowest_price);});
// getPricesData('WD0M', body).then(data => {console.log(data[0].lowest_price);})
module.exports = { fetch_hotel_list, getNameData, getPricesData };
