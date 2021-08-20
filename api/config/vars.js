// const path = require("path");

// require("dotenv-safe").config({
//     path: path.join(__dirname, "../.env"),
//     sample: path.join(__dirname, "../.env.example"),
//     allowEmptyValues: true,
// });

module.exports = {
    mongo: {
        uri: process.env.MONGO_URI,
    },
    marketstack: {
        EODUrl: process.env.MARKET_STACK_EOD_URL,
        accessKey: process.env.MARKET_STACK_ACCESS_KEY,
    }
};
