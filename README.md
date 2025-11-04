# CinemaOS

A Netflix-style media library app built with Next.js 14, TypeScript, and Tailwind CSS, optimized for Vercel deployment.

## Features

- Netflix-style UI with responsive design
- TMDB API integration for movie data
- Video streaming with ad blocking
- Comprehensive ad blocking system
- Vercel-optimized deployment

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

This project is optimized for Vercel deployment with zero configuration required.

### Vercel Deployment

1. **Connect to Vercel:**
   - Fork this repository
   - Import to [Vercel Dashboard](https://vercel.com/dashboard)
   - Connect your GitHub account

2. **Environment Variables:**
   Set these in Vercel Dashboard > Project Settings > Environment Variables:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_VIDORA_BASE_URL=https://vidora.su
   NEXT_PUBLIC_SITE_NAME=CinemaOS
   ```

3. **Deploy:**
   - Vercel will automatically detect Next.js and deploy
   - Your site will be live at `https://your-project.vercel.app`

### Local Production Build

```bash
# Build the project
npm run build

# Start production server
npm start
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
