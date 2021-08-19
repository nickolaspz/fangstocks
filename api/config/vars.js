module.exports = {
    mongo: {
        uri: process.env.MONGO_URI,
    },
    marketstack: {
        EODUrl: process.env.MARKET_STACK_EOD_URL,
        accessKey: process.env.MARKET_STACK_ACCESS_KEY,
    }
};
