# Fangstock APP
iOS mobile app to display stocks for a chosen date.

### Requirements
 - Node 12.x
 - Docker
 - Serverless installed globally: ```npm install -g serverless```


## Start APP
From project root
```
CD app/

RUN npm install

SET .env variables

RUN npm run start
```
Note: running **npm run start** will execute the following:
```
expo start
```
  

## Start API Backend
From project root
```
CD api/

RUN npm install

SET .env variables

RUN npm run start
```
Note: running **npm run start** will execute the following:
```
docker-compose up -d & serverless offline
```

## Sync db
Synchronize marketstock api to local docker database.
```
node api/scripts/sync-stocks.js
```
