# Gerenciamento de Itens API

## Overview

This API provides a simple interface for managing items. Built with Express.js and Supabase, it allows authenticated users to create, read, update, and delete items seamlessly.

## Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Usage Examples](#usage-examples)
- [Setup](#setup)

## Authentication

All endpoints require authentication using a JWT token. Include the token in the `Authorization` header of your requests:


## Endpoints

| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| POST   | `/signup`      | Create a new user account          |
| POST   | `/signin`      | Authenticate and receive a JWT token |
| POST   | `/items`       | Create a new item                  |
| GET    | `/items`       | Retrieve all items                 |
| GET    | `/items/:id`   | Retrieve a specific item by ID     |
| PUT    | `/items/:id`   | Update a specific item             |
| DELETE | `/items/:id`   | Delete a specific item             |

## Usage Examples

### Sign Up

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

  ### Sign in

  ```bash
  curl -X POST http://localhost:3000/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
  ```

### Create an item

```bash
curl -X POST http://localhost:3000/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "This is a new item"}'
```
### Get all items

```bash
curl -X GET http://localhost:3000/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get a specific item

```bash
curl -X GET http://localhost:3000/items/{itemid} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update an item

```bash
curl -X PUT http://localhost:3000/items/{itemid} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "This item has been updated"}'
```

### Delete an item

```bash
curl -X DELETE http://localhost:3000/items/{itemid} \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Setup

## Install dependencies

```bash
npm install
```

## Set up environmental variables in a new '.env'

```bash
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Run server
```bash
node index.js
```