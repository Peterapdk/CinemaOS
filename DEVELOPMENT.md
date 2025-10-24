# CinemaOS Development Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Required Variables
- `NEXT_PUBLIC_TMDB_API_KEY`: Your TMDB API key for movie data
- `NEXT_PUBLIC_VIDORA_BASE_URL`: Video streaming service URL
- `NEXT_PUBLIC_SITE_NAME`: Site name for branding

### Optional Variables
- `NODE_ENV`: Environment (development/production)
- `NEXT_PUBLIC_DEBUG`: Enable debug mode (true/false)

## Development Scripts

- `npm run dev` - Start development server
- `npm run dev:debug` - Start development server with debugging enabled
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## Debugging

### VS Code/Cursor Debugging
1. Open the project in VS Code/Cursor
2. Go to Run and Debug (Ctrl+Shift+D)
3. Select one of the debug configurations:
   - **Next.js: debug server-side** - Debug server-side code
   - **Next.js: debug client-side** - Debug client-side code in Chrome
   - **Next.js: debug full stack** - Debug both client and server

### Browser Debugging
1. Open Chrome DevTools (F12)
2. Use the Sources tab to set breakpoints
3. Use the Console tab for debugging logs

### Common Debugging Scenarios

#### TMDB API Issues
- Check if `NEXT_PUBLIC_TMDB_API_KEY` is set correctly
- Verify API key has proper permissions
- Check network tab for API call errors

#### Video Streaming Issues
- Verify `NEXT_PUBLIC_VIDORA_BASE_URL` is accessible
- Check browser console for CORS errors
- Test video URLs manually

#### Ad Blocker Issues
- Check browser console for blocked requests
- Verify blocked domains list in `AdBlocker.tsx`
- Test with ad blocker disabled

## Project Structure

```
CinemaOS/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   └── AdBlocker.tsx     # Ad blocking functionality
├── lib/                   # Utility functions
├── public/               # Static assets
├── data/                 # Application data
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

#### Build Errors
```bash
# Clean and rebuild
npm run clean
rm -rf .next
npm run build
```

#### TypeScript Errors
```bash
# Check types
npm run type-check
```

#### Dependency Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Performance Issues

#### Slow Build Times
- Use `npm run dev` instead of `npm run build` for development
- Consider using `npm run dev:debug` for debugging

#### Memory Issues
- Restart development server periodically
- Check for memory leaks in browser DevTools

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Commit with descriptive message
5. Push to GitHub
6. Create a pull request

## Docker Development

### Build Docker Image
```bash
docker build -t cinemaos:latest .
```

### Run Docker Container
```bash
docker run -d \
  --name cinemaos \
  -p 3000:3000 \
  -e NEXT_PUBLIC_TMDB_API_KEY="your_key" \
  cinemaos:latest
```

### Debug Docker Container
```bash
# View logs
docker logs cinemaos

# Access container shell
docker exec -it cinemaos sh
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
