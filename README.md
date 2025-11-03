# CinemaOS

A Netflix-style media library app built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Netflix-style UI with responsive design
- TMDB API integration for movie data
- Video streaming with ad blocking
- Comprehensive ad blocking system
- Docker deployment ready

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for production deployment)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

- `NEXT_PUBLIC_TMDB_API_KEY`: TMDB API key for movie data
- `NEXT_PUBLIC_VIDORA_BASE_URL`: Video streaming service URL
- `NEXT_PUBLIC_SITE_NAME`: Site name for branding

## Production Deployment

The project includes a Docker image (`cinemaos.tar`) ready for production deployment.

### Docker Deployment

```bash
# Load the Docker image
docker load -i cinemaos.tar

# Run the container
docker run -d \
  --name cinemaos \
  --restart unless-stopped \
  -p 80:3000 \
  -e NEXT_PUBLIC_TMDB_API_KEY="6fa37dcf7b0643cde49a5c99dd06f715" \
  -e NEXT_PUBLIC_VIDORA_BASE_URL="https://vidora.su" \
  -e NEXT_PUBLIC_SITE_NAME="CinemaOS" \
  -v /opt/cinemaos/data:/app/data \
  cinemaos:latest
```

## Project Structure

- `app/`: Next.js 13+ app directory with pages and layouts
- `components/`: Reusable React components
- `lib/`: Utility functions and configurations
- `public/`: Static assets
- `data/`: Application data storage

## Ad Blocking

The app includes comprehensive ad blocking that blocks:
- Common ad domains (stummelguider.top, google ads, facebook, etc.)
- Tracking scripts and analytics
- Popup windows and iframes
- Social media embeds

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.
# CinemaOS Netflix Frontend - Deployment Trigger
