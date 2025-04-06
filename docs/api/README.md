# API Documentation

This document provides information about the Pentest Hardware Hub API endpoints, request/response formats, and authentication requirements.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.pentesthardwarehub.com/api
```

## Authentication

Most API endpoints require authentication. To authenticate, include an Authorization header with a valid token:

```
Authorization: Bearer <your-token>
```

## API Endpoints

### User Endpoints

#### GET /users/:id

Retrieves user information by ID.

**Request Parameters:**
- `id` (path parameter): User ID

**Response:**
```json
{
  "id": 1,
  "username": "johndoe",
  "isAdmin": false
}
```

#### POST /users

Creates a new user.

**Request Body:**
```json
{
  "username": "newuser",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": 2,
  "username": "newuser",
  "isAdmin": false
}
```

### Hardware Endpoints

#### GET /hardware

Retrieves all hardware items.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Raspberry Pi 4",
    "description": "Single board computer",
    "category": "SBC",
    "price": 35.00
  }
]
```

#### GET /hardware/:id

Retrieves hardware by ID.

**Request Parameters:**
- `id` (path parameter): Hardware ID

**Response:**
```json
{
  "id": 1,
  "name": "Raspberry Pi 4",
  "description": "Single board computer",
  "category": "SBC",
  "price": 35.00
}
```

#### GET /hardware/category/:category

Retrieves hardware by category.

**Request Parameters:**
- `category` (path parameter): Hardware category

**Response:**
```json
[
  {
    "id": 1,
    "name": "Raspberry Pi 4",
    "description": "Single board computer",
    "category": "SBC",
    "price": 35.00
  }
]
```

### Tutorial Endpoints

#### GET /tutorials

Retrieves all tutorials.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Getting Started with Raspberry Pi",
    "content": "...",
    "difficulty": "beginner",
    "hardwareId": 1
  }
]
```

#### GET /tutorials/:id

Retrieves tutorial by ID.

**Request Parameters:**
- `id` (path parameter): Tutorial ID

**Response:**
```json
{
  "id": 1,
  "title": "Getting Started with Raspberry Pi",
  "content": "...",
  "difficulty": "beginner",
  "hardwareId": 1
}
```

### Tool Endpoints

#### GET /tools

Retrieves all security tools.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Wireshark",
    "description": "Network protocol analyzer",
    "category": "Analyzer",
    "hardwareId": 1
  }
]
```

### Project Endpoints

#### GET /projects

Retrieves all community projects.

**Response:**
```json
[
  {
    "id": 1,
    "title": "DIY Network Scanner",
    "description": "Build your own network scanner",
    "authorId": 1,
    "tag": "networking",
    "stars": 42
  }
]
```

## Error Handling

All API endpoints return appropriate HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses include a JSON body with an error message:

```json
{
  "error": "Resource not found"
}
```

## Rate Limiting

API requests are limited to 100 requests per minute per IP address. Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1619123456
```

## Versioning

The API may be versioned in the future. The current version is v1, which is implied in the base URL.
