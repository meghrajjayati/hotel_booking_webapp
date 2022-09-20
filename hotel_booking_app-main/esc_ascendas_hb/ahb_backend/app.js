//imports
const dest_array = require("./destination_parse");
const fetchid = require("./fetch_uid");
const hotel_list = require("./fetch_hotel_list");
const hotel_info = require("./fetch_hotel_info");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
var encrypt = require('mongoose-encryption');
const { Book } = require("react-bootstrap-icons");
const { func, string } = require("prop-types");
var sum;

//MONGODB
const dbURI =
  "mongodb+srv://jayatiparwani:sutdascendas@ascendasapp.jonfuue.mongodb.net/ascendasapp?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());





var destinationArray = [];
const portNumber = 4000;
//for axios
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//////////DESTINATION SEARCH FILTER START//////////////////
app.post("/searchfilter", (req, res) => {
  destinationArray = dest_array.parse_dest(req.body.value);
  console.log(destinationArray);
  res.send(destinationArray); //test send
});

//////////DESTINATION SEARCH FILTER END////////////////////

//////////RECEIVE DESTINATION DATA//////////////////
app.post("/searchdata", (req, res) => {
  let uid = fetchid.get_uid(req.body.destination, destinationArray);
  console.log(req.body);
  try {
    hotel_list.fetch_hotel_list(uid, req.body).then((data) => {
      // console.log(data);
      res.send(data);
    });
  } catch (e) {
    console.error(e);
  }
  //  res.send(data);
});
////////////////////room info//////////////////////////
app.post("/roominfo", (req, res) => {
  let uid = fetchid.get_uid(req.body.destination, destinationArray);
  console.log(req.body);
  try {
    hotel_info.getHotelPrice(uid, req.body).then((data) => {
      // console.log(data);
      res.send(data);
    });
  } catch (e) {
    console.error(e);
  }
  //  res.send(data);
});

/////////////////// Feature 4 //////////////////////////

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



app.post(
  "/booking", (req, res) => {
    console.log(JSON.stringify("Form Submitted and Uploaded on Database"));
    let newbook = new book({
      name: JSON.stringify(req.body.name),
      number: JSON.stringify(req.body.phone_num),
      address: JSON.stringify(req.body.address),
      date: JSON.stringify(req.body.expiry),
      card_num: JSON.stringify(req.body.number),
      cvv: JSON.stringify(req.body.cvc),
      destInfo: JSON.stringify(req.body.destInfo), 
      selectedRoom: JSON.stringify(req.body.selectedRoom),
      currentHotel: JSON.stringify(req.body.currentHotel),
      booking_id: JSON.stringify(req.body.booking_id)

    });
    newbook.save();
    res.send(JSON.stringify(req.body));


  }
);
// let booking_id=null;
// app.post(
//   "/handlebooking",(req, res) => {
    
//       booking_id= JSON.stringify(req.body.booking_id)
//     }
// );



  app.post(
    "/handlebooking",(req, res) => {
      booking_id= JSON.stringify(req.body.booking_id)
      console.log(booking_id)
      book.findOne({booking_id : booking_id }).then(function(doc) { 
        sum=doc;
        if (doc==null){
          sum=JSON.stringify({booking_status:"Booking not Found"})
        }
        try{

         
          topData= JSON.parse(sum.destInfo)
          bottomData= JSON.parse(sum.currentHotel)
          //hotel= JSON.parse(sum.selectedHotel)
          var newObj = Object.assign({}, topData, bottomData)

        } catch (error) {
          newObj= "No Booking"
        }

          res.send((newObj));
          return(newObj)
  
        });

      });

      app.post(
        "/deletebooking",(req, res) => {
          booking_id= JSON.stringify(req.body.booking_id)
          const query= {booking_id : booking_id }
          book.deleteOne(query,function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
          });
       
          console.log(booking_id)
          str=JSON.stringify({booking_id:"Booking not Found"})
          res.send(str)
    
            });
    


      

      // app.get(
      //   "/handle",(req, res) => {
      //     try{

         
      //       topData= JSON.parse(sum.destInfo)
      //       bottomData= JSON.parse(sum.currentHotel)
      //       id= JSON.stringify(sum.booking_id)
      //       console.log(id)
      //       var newObj = Object.assign({}, topData, bottomData)

      //     } catch (error) {
      //       newObj= "No Booking"

      //     }
          
          
      //     console.log(newObj);
      //     res.send((newObj));

      //         //console.log(JSON.parse(sum.destInfo));
      //       });

           

//console.log(book.find({}));
// const query = { };
// const options = {
//   // sort matched documents in descending order by rating
//   // Include only the `title` and `imdb` fields in the returned document
//   projection: { _id: 0, destInfo: 1, booking_id: 1 }
// };
// // book.findOne({ query ,options},function (err, docs) {
// //    console.log(docs)
// //  });

// book.findOne({booking_id : '\"aab3b45c-498e-40b7-b3cf-16cd4e23e6dd\"'}).then(function(doc) { 
//   console.log(doc)
//   if (doc==null){
//     string_data="hi"
//     console.log(string_data)
//   }
// });


//////////SEARCH BOOKINg//////////////////






// /////////////////// beds.com //////////////////////////
// app.post("/beds", (req, res) => {
//   let hotel_id = req.body.hotel_id;
//   let url = `https://ascendahotels.mocklab.io/api/hotels/${hotel_id}/prices/bedscom`;
//   try {
//     hotel_info.getHotelPrice(url).then((data) => {
//       // console.log(data);
//       res.send(data);
//     });
//   } catch (e) {
//     // console.error(e);
//   }
// });

// //////////////////// wgl ////////////////////////////////////
// app.post("/wgl", (req, res) => {
//   let hotel_id = req.body.hotel_id;
//   let url = `https://ascendahotels.mocklab.io/api/hotels/${hotel_id}/prices/wgl`;
//   console.log(url);
//   try {
//     hotel_info.getHotelPrice(url).then((data) => {
//       // console.log(data);
//       res.send(data);
//     });
//   } catch (e) {
//     // console.error(e);
//   }
// });

// ///////////////////// EAN ///////////////////////////
// app.post("/ean", (req, res) => {
//   let hotel_id = req.body.hotel_id;
//   let url = `https://ascendahotels.mocklab.io/api/hotels/${hotel_id}/prices/ean`;
//   try {
//     hotel_info.getHotelPrice(url).then((data) => {
//       // console.log(data);
//       res.send(data);
//     });
//   } catch (e) {
//     // console.error(e);
//   }
// });

//set up server
app.listen(portNumber, () => {
  console.log("Server started at port " + portNumber);
});
