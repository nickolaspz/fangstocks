# Fangstock APP 

## Start APP
CD app/

RUN npm install

SET .env variables

RUN npm start


## Start API Backend
CD api/

RUN npm install

SET .env variables

RUN npm start

  
## Sync db
node api/scripts/sync-stocks.js