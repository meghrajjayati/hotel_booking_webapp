const { default: axios } = require("axios");
const hotel_list = require("../fetch_hotel_list")

test("using Invalid dates return empty list", () => {
    const body = {
        destination: "Rome, Italy",
        startDate: "2022-07-26",
        endDate: "2022-08-10",
        adults: 2,
        children: 0,
        rooms: 1,
      };
    const uid_1 ="A6Dz";
    return hotel_list.fetch_hotel_list(uid_1, body).then(result=> expect(result).toEqual([]));
});

test("using Invalid uid will throw error", () => {
    const body_2 = {
        destination: "Rome, Italy",
        startDate: "2022-08-29",
        endDate: "2022-09-10",
        adults: 2,
        children: 0,
        rooms: 1,
      };
    const uid = "A000";
    return hotel_list.fetch_hotel_list(uid, body_2).then(result => expect(result).toEqual([]));
});

test("using Valid Parameters will return a non empty list of objects", () => {
    jest.setTimeout(20000);
    const body_2 = {
        destination: "Rome, Italy",
        startDate: "2022-08-29",
        endDate: "2022-09-10",
        adults: 2,
        children: 0,
        rooms: 1,
      };
    const uid_2 = "WD0M";
    return hotel_list.fetch_hotel_list(uid_2, body_2).then(result => expect(result).not.toEqual([]));
});
