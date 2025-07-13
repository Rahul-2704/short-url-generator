# Short URL Generator

A full-stack URL shortener application built with Node.js, Express, Redis, and Next.js. This application allows users to generate short URLs from long URLs and retrieve the original URLs using the shortened versions.

## Features

- **Generate Short URLs**: Convert long URLs into short, shareable links
- **Retrieve Original URLs**: Get the original URL from a shortened link
- **Redis Storage**: Fast and efficient storage using Redis
- **Base62 Encoding**: Generates human-readable short URLs
- **Modern UI**: Clean and responsive frontend built with Next.js and Tailwind CSS
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Redis** - In-memory data store
- **Base62 Encoding** - URL shortening algorithm

### Frontend
- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Project Structure

```
short-url-generator/
├── server/
│   ├── services/
│   │   └── base62-encoder.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── app/
│   │   └── page.tsx
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- Redis server
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd short-url-generator
```

### 2. Setup Backend
```bash
cd server
npm install
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Start Redis Server
Make sure Redis is running on your local machine:
```bash
redis-server
```
Default Redis URL: `redis://localhost:6379`

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:3000`

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3001` (or next available port)

## API Endpoints

### POST `/shorten`
Generate a short URL from a long URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "status": true,
  "data": "abc123"
}
```

### GET `/get-og-url/:shortUrlId`
Retrieve the original URL from a short URL ID.

**Response:**
```json
{
  "status": true,
  "data": "https://example.com/very/long/url"
}
```

## How It Works

1. **URL Shortening**: 
   - User submits a long URL
   - Backend generates a unique ID using Redis counter
   - ID is encoded using Base62 algorithm
   - Short URL ID and original URL are stored in Redis hash

2. **URL Retrieval**:
   - User provides short URL ID
   - Backend looks up the original URL in Redis
   - Returns the original URL

3. **Base62 Encoding**:
   - Uses characters: `0-9`, `a-z`, `A-Z` (62 total characters)
   - Generates shorter, more readable URLs compared to other encoding methods

## Configuration

### Backend Configuration
- **Port**: 3000 (configurable in `server/index.js`)
- **Redis URL**: `redis://localhost:6379` (configurable in `server/index.js`)
- **CORS**: Enabled for all origins

### Frontend Configuration
- **API Base URL**: `http://localhost:3000` (configurable in `frontend/app/page.tsx`)

## Environment Variables

Create a `.env` file in the server directory for production:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
NODE_ENV=production
```

## Error Handling

The application includes comprehensive error handling:
- Invalid request validation
- Redis connection error handling
- Network error handling on frontend
- Proper HTTP status codes

## Future Enhancements

- [ ] Custom short URL aliases
- [ ] URL expiration dates
- [ ] Click analytics and tracking
- [ ] User authentication
- [ ] URL validation and safety checks
- [ ] Bulk URL shortening
- [ ] QR code generation
- [ ] Database migration from Redis to PostgreSQL/MongoDB

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the
