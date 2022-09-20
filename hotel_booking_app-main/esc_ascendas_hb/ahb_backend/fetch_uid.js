const jsonData = require("./destinations.json");
function get_uid(x) {
  var dest_array = [];
  for (let i = 0; i < jsonData.length; i++) {
    var strData = String(jsonData[i].term);
    dest_array.push(strData);
  }
  index = dest_array.indexOf(x);
  if (index == -1){
    return false;
  }
  return jsonData[index].uid;
}
module.exports = { get_uid };
