const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const crypto = require('crypto');
//const multer = require('multer');
const mongoose= require("mongoose");
const app = express();
var encrypt = require('mongoose-encryption');


const dbURI = 'mongodb+srv://jayatiparwani:sutdascendas@ascendasapp.jonfuue.mongodb.net/ascendasapp?retryWrites=true&w=majority';
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>console.log("connected to db"))
.catch((err)=>console.log(err));
app.use(cors());

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true }));
app.use(express.static("public"));
const channelSchema=  new mongoose.Schema({
  name: String,
  number: String,
  address: String, 
  date: String , 
  card_num: String, 
  cvc: String ,
  booking_id: String
  });
  var secret = "enckey";


  channelSchema.plugin(encrypt,  { secret: secret ,  excludeFromEncryption: ['booking_id'] });

// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

  const book = mongoose.model("encrypted_book", channelSchema);






  app.post('/', /*multer().none()*/   (req, res)  => {
    console.log(JSON.stringify("Form Submitted and Uploaded on Database")
    );

    let newbook= new book({
      name:  JSON.stringify(req.body.name),
      number: JSON.stringify(req.body.phone_num),
      address: JSON.stringify(req.body.address), 
      date: JSON.stringify(req.body.expiry) , 
      card_num: JSON.stringify(req.body.number), 
      cvv: JSON.stringify(req.body.cvc) ,
      booking_id: JSON.stringify(req.body.booking_id)
      })
      newbook.save(function(err){ // encrypted when sent to the database
        // decrypted in the callback
        console.log(newbook.name); // Joe
        console.log(newbook.number); // 42
        console.log(newbook._ct); // undefined
});
});





/*
let application = book.findOne({booking_id:JSON.stringify(req.body.booking_id)},function(err, foundUser){ // encrypted when sent to the database
  if(err){
    console.log(err);
  }else{
    if (foundUser){
      if(foundUser.booking_id==JSON.stringify(req.body.booking_id)){
        console.log(JSON.stringify(req.body));
        return res.status( 200 ).send({ application });
    }
  }
}
  });*/










// note that we are only providing the field we would like to search with

// `messageToSearchWith.name` contains the encrypted string text

// results is an array of length 1 (assuming that there is only 1 message with the name "victor" in the collection)
// and the message in the results array corresponds to the one saved previous
  
app.listen(5000, () => {
    console.log("Server running successfully on 5000");
  });
