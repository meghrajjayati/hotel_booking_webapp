const { default: axios } = require("axios");
const hotel_info = require("../fetch_hotel_info")

test("using Invalid hotel id return empty hotel description", async () => {
    const hotel_id ="d0h7";
    const result = await hotel_info.getHotelData(hotel_id);
    return expect(result).toEqual({});
});

// test("using Invalid hotelid will return empty room list", async () => {
//     jest.setTimeout(1000000);

//     const body_2 = {
//         hotel_id: "d0h7",
//         destination: "Rome, Italy",
//         startDate: "2022-07-25",
//         endDate: "2022-07-29",
//         adults: 2,
//         children: 0,
//         rooms: 1,
//       };
//     const uid = "RsBU";
//     const result = await hotel_info.getHotelPrice(uid, body_2);
//     return expect(result).toEqual([]);
// });
jest.setTimeout(40000);
test("using Valid Parameters will return a non empty list of rooms", async () => {
    const body_2 = {
        hotel_id: "Hwwg",
        destination: "Rome, Italy",
        startDate: "2022-08-29",
        endDate: "2022-09-10",
        adults: 2,
        children: 0,
        rooms: 1,
      };
    const uid_2 = "WD0M";
    const result = await hotel_info.getHotelPrice(uid_2, body_2);
    return expect(result).not.toEqual([]);
});
