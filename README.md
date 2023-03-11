# TETA

## Overview

## List of API(s)
### Admin API

- GET /monsters: list all monsters
- POST /monsters: create a new monster
- GET /monsters/:id: get details of a specific monster
- PATCH /monsters/:id: update a specific monster
- DELETE /monsters/:id: delete a specific monster

### User / Guest API
GET /monsters: list all monsters with name and image
GET /monsters/:id: get details of a specific monster
PATCH /monsters/:id/captured: mark a specific monster as captured

### User API
- GET /monsters/search?name={name}&type={type}: search monsters by name and filter by type
- GET /monsters/sort?by={name|id}&order={asc|desc}: sort monsters by name or id in ascending or descending order

### Authorization and Authentication
- POST /signup: create a new user account
- POST /login: authenticate a user and retrieve an access token
- POST /refresh-token: submit a refresh token to obtain a new access token and refresh token pair.