# TETA

## Overview

## Contract API

[Contract API](https://wild-fan-514.notion.site/Contract-API-ea19e5eac52d4d87a8f0b4e671dfc10c)

## List of API(s)

### Admin API

- `POST /monsters/find`: list all monsters
- `POST /monsters`: create a new monster
- `GET /monsters/:slug`: get details of a specific monster by slug
- `PATCH /monsters/:slug`: update a specific monster by slug
- `DELETE /monsters/:slug`: delete a specific monster by slug

### User / Guest API

- `GET /monsters`: list all monsters with name and image
- `GET /monsters/:id`: get details of a specific monster
- `PATCH /monsters/:id/captured`: mark a specific monster as captured

### User API

- `POST /monsters/find`: search monsters by name and filter by type using body, which in the payload can define sort and filter

### Authorization and Authentication

- `POST /signup`: create a new user account
- `POST /login`: authenticate a user and retrieve an access token

## How to setup in local

1. Recommended: Use nvm v16
2. Copy `.env.example` to `.env` and change accordingy
3. Run `npm install`
4. Run `npm run start`

## How to run Unit tests

1. Copy `.env.test.example` to `.env.test`
2. Run `npm run test`

## Developer remarks:

1. Haven't started for the captured API yet.
2. Haven't finished the sort.
3. I'm using mongodb because of it's:

   - Scalability: Mongodb is designed for scaling horizontally, which means it can handle more traffic and more data, different to mysql, which is more designed vertically
   - Easier to implement / Flexible: Due to using document based storage, when there are some change in the schema, it is not really hard to sync it.
   - Performance: Mongodb has a built in support for sharding and replication, hence improving performance and redundancy.
