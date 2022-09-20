const axios =  require('axios');
const hotel_list = require("../fetch_hotel_list")

jest.mock('axios');

test("fetching Hotel List at destination with valid Parameters", () => {
    const hotels = [{id : "1"}, {id : "2"}, {id : "3"}, {id : "4"}, {id : "5"}]
    const data = {"hotels": hotels};
    const resp = {"data": data};
    axios.get.mockResolvedValue(resp);
    const url_hotel = `https://hotelapi.loyalty.dev/api/hotels?destination_id=A6Dz`;
    return hotel_list.getNameData(url_hotel).then(result => expect(result).toBe(data));
});

test("fetching Sorted Hotel prices at destination with valid Parameters", async () => {
    const hotels = [{id : "1", lowest_price: 0.10}, {id : "2", lowest_price: 510}, {id : "3", lowest_price: 103}, {id : "4", lowest_price: 120}, {id : "5", lowest_price: 101}]
    const hotels_sorted = [{id : "1", lowest_price: 0.10}, {id : "5", lowest_price: 101}, {id : "3", lowest_price: 103}, {id : "4", lowest_price: 120}, {id : "2", lowest_price: 510}]
    const data = {"completed": true, "hotels": hotels};
    const data_sorted = {"completed": true, "hotels": hotels_sorted};
    const resp = {"data": data};
    axios.get.mockResolvedValue(resp);
    let url_prices = `https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=A6Dz&checkin=2022-07-21&checkout=2022-07-22&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=2`;
    const result = await hotel_list.getPricesData(url_prices);
    return expect(result).toEqual(data_sorted);
});