const axios =  require('axios');
const hotel_info = require("../fetch_hotel_info")

jest.mock('axios');

test("fetching Hotel Information with valid hotel_id", async () => {
    const rooms = [{id : "1"}, {id : "2"}, {id : "3"}, {id : "4"}, {id : "5"}]
    const data = {"rooms": rooms};
    const resp = {"data": data};
    axios.get.mockResolvedValue(resp);
    const hotel_id = "dih7";
    const result = await hotel_info.getHotelData(hotel_id);
    return expect(result).toBe(data);
});

test("fetching Hotel room prices at selected hotel with valid Parameters", () => {
    const rooms = [{id : "1", lowest_price: 0.10}, {id : "2", lowest_price: 510}, {id : "3", lowest_price: 103}, {id : "4", lowest_price: 120}, {id : "5", lowest_price: 101}]
    const data = {"completed": true, "rooms": rooms};
    const resp = {"data": data};
    axios.get.mockResolvedValue(resp);
    uid = "RsBU";
    body = body = {
    hotel_id: "diH7",
    destination: "Rome, Italy",
    startDate: "2022-07-20",
    endDate: "2022-07-21",
    adults: 2,
    children: 0,
    rooms: 1,
    };
    return hotel_info.getHotelPrice(uid,body).then(result => expect(result).toEqual(rooms));
});