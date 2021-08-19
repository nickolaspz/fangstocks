const { default: axios } = require('axios');
const { marketstack } = require('../config/vars');
const connectToDB = require('../config/mongodb');

const STOCK_WATCH_LIST = ['FB', 'AMZN', 'NFLX', 'GOOG'];

async function fetchStocks() {
    let data = [];
    for (const stock of STOCK_WATCH_LIST) {
        let limit = 100;
        let offset = 0;
        let results = 0;
        do {
            const response = await axios.get(
                `${marketstack.EODUrl}?access_key=${marketstack.accessKey}&symbols=${stock}&limit=${limit}&offset=${offset}`
            );
            data.push(...response.data.data);

            results = response.data.data.length;
            limit = limit + 100;
            offset = offset + 100;
        } while (results > 0);
    }
    
    return data;
}

(async () => {
    const stocks = await fetchStocks();

    const db = await connectToDB();
    const collection = db.collection('stocks')

    for (const stock of stocks) {
        const upsert = await collection.updateOne(
            { symbol: stock.symbol, date: stock.date },
            {
                $set: {
                    "open": stock.open,
                    "high": stock.high,
                    "low": stock.low,
                    "close": stock.close,
                    "volume": stock.volume,
                    "adj_high": stock.adj_high,
                    "adj_low": stock.adj_low,
                    "adj_close": stock.adj_close,
                    "adj_open": stock.adj_open,
                    "adj_volume": stock.adj_volume,
                    "split_factor": stock.split_factor,
                    "symbol": stock.symbol,
                    "exchange": stock.exchange,
                    "date": stock.date,
                }
            },
            { upsert: true }
        );

        console.log('Upserted document =>', upsert)
    }

    process.exit(0);
})();