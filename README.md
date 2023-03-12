# TETA

## Overview

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
- `POST /refresh-token`: submit a refresh token to obtain a new access token and refresh token pair.
