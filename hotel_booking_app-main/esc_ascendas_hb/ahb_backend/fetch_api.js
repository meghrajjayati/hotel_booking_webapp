const axios = require("axios");

function delay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

async function fetch_prices_url(url){
    let data = {};
    let completed = false;
    let count =0;
    while (!completed && count <3) {
        count++;
        const response = await axios.get(url);

        data = await response.data;
        completed = data.completed;

        await delay(2000);
    }
    // console.log(data);
    // show(data);
    if(count < 3){
        console.log("Search Successfully Completed")
    }else{
        const response = await axios.get(url);
        data = await response.data;
        console.log("Timeout")
    }

    return data;
}

async function fetch_info_url(url){
    const response = await axios.get(url);
    let data = await response.data;

    return data;
}

module.exports = { fetch_info_url, fetch_prices_url };