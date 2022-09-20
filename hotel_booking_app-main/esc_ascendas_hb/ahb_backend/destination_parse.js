const jsonData = require("./destinations.json");

function parse_dest(text) {
  term_array = [];
  if (text != null) {
    for (let i = 0; i < jsonData.length; i++) {
      var strData = String(jsonData[i].term);
      var strDataCompare = strData.toLowerCase();
      strDataCompare.includes(text.toLowerCase())
        ? term_array.push(strData)
        : null;
      //   term_array.push(strData);
    }
  }
  return term_array.slice(0, 20);
}
//function fetch_uid(x){
//dest_arr= parse_dest();
//index= dest_arr.indexOf(x);
// return (jsonData[index].uid);

//}
module.exports = { parse_dest };
//module.exports = { fetch_uid };
// console.log(parse_dest());
//console.log(fetch_uid());
