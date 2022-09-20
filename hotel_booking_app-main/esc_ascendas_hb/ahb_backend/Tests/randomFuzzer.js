const Axios = require("axios");
const cardGen = require('creditcard-generator');
const emails = require('email-generator');
const mongoose = require("mongoose");
const assert = require("assert");
var encrypt = require('mongoose-encryption');

function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
}

function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function get_dest_list(value){
    let list = await Axios.post("http://localhost:4000/searchfilter", {
        value: value,
      });
    return list;
}

async function feature1(){
    let num_adults = Math.floor(Math.random() * 3)+1;
    let num_children = Math.floor(Math.random() * 4);
    let num_rooms = Math.floor(Math.random() * 3);
    let start = randomDate(new Date(), new Date("2022-10-22"));
    let end = randomDate(new Date(start), new Date("2022-10-22"));
    let destination_str = "";
    let dest_text = "";
    let dest_list = [];

    while(dest_list.length == 0){
        dest_text = generateString(3);  
        // console.log(dest_text)      
        let response = await get_dest_list(dest_text);
        dest_list = response.data;
        // console.log(dest_list);
    };
    destination_str = get_random(dest_list);
    // console.log(destination_str)

    const body = {
        destination: destination_str,
        startDate: start,
        endDate: end,
        adults: num_adults,
        children: num_children,
        rooms: num_rooms
    };
    return body;
}

async function feature2(body){
    const res = await Axios.post(
        "http://localhost:4000/searchdata",
        body
      );
      let hotelArr = res.data.filter((item) => {
        return "name" in item ? true : false;
      });
      return hotelArr;
}

async function feature3(body){
    const res = await Axios.post("http://localhost:4000/roomInfo", body);
    return res.data;
}

async function feature4_prepare(body, selected_hotel, select_room){
    name_length = Math.floor(Math.random()*20)+1;
    addr_length = Math.floor(Math.random()*200)+1;
    const Customer = {
        name: generateString(name_length),
        phone_num: Math.floor(10000000 + Math.random() * 90000000),
        address: generateString(name_length),
        email: emails.generateEmail().toString(),
        expiry: randomDate(new Date(), new Date("2022-10-22")),
        number: cardGen.GenCC().toString(),
        cvc: Math.floor(9900 + Math.random() * 100),
        booking_id: Math.floor(10000 + Math.random() * 90000),
        destInfo : body,
        selectedRoom : select_room,
        currentHotel : selected_hotel
    }; 
    return Customer;
}

async function feature4(Customer, book){
    const res = await Axios.post("http://localhost:4000/booking", Customer);
    const data = await book.find({booking_id: Customer.booking_id})
    if(data === undefined){
        return False;
    } else{
        let deleteCount = await book.deleteOne({booking_id: Customer.booking_id});
        return deleteCount.deletedCount == 1;
    }
    // return res.data;
}

async function setUpDB(){
    //MONGODB
    const dbURI =
    "mongodb+srv://jayatiparwani:sutdascendas@ascendasapp.jonfuue.mongodb.net/ascendasapp?retryWrites=true&w=majority";
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => console.log(err));
    
    console.log("connected to db");
    

    const channelSchema=  new mongoose.Schema ({
    name: String,
    number: String,
    address: String,
    date: String,
    card_num: String,
    cvv: String,
    destInfo: String ,
    selectedRoom: String,
    currentHotel: String,
    booking_id: String
    });
    var secret = "enckey";


    channelSchema.plugin(encrypt,  { secret: secret ,  excludeFromEncryption: ['booking_id','selectedRoom','destInfo','currentHotel'] });

    // This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
    // and encrypt, decrypt, sign, and authenticate instance methods

    const book = mongoose.model("encrypted_book", channelSchema);

    return book;
}

async function run(n){
    const book = await setUpDB();
    for(let i = 0; i<n;i++){
        console.log(`Start Run: ${i+1}`)
        let start = new Date();

        let body = await feature1();
        console.log(`Destination Search:`);
        console.log(body);

        let hotel_list = await feature2(body);
        console.log(`Hotel list:`);
        console.log(hotel_list);
        if(hotel_list.length == 0){
            console.log("No Hotels found Available for the query conditions at the location");
            continue;
        }
        let selected_hotel = get_random(hotel_list);
        console.log(`Selected Hotel:`);
        console.log(selected_hotel);
        body.hotel_id = selected_hotel.id;

        let room_list = await feature3(body);
        console.log(`Room List:`);
        console.log(room_list);

        let select_room = get_random(room_list);
        console.log(`Selected Room :`);
        console.log(select_room);

        let Customer = await feature4_prepare(body, selected_hotel, select_room);
        console.log(`Customer Summary`);
        console.log(Customer);

        let result = await feature4(Customer, book);
        console.log(`Check Insertion, Query and Deletion to DB`);
        console.log(result);
        assert(result);

        let end = new Date();
        let duration = (end - start)/1000;

        console.log(`Completed Run: ${i+1} in ${duration}s`)
        await delay(1000);
    };
    console.log("exit_loop");
    await mongoose.connection.close()
    console.log("closed DB");
    return true;
}

run(5);