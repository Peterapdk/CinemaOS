# Contributing to CinemaOS

Thank you for your interest in contributing to CinemaOS! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CinemaOS.git
   cd CinemaOS
   ```
3. **Set up the development environment**:
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your values
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Making Changes
1. **Make your changes** following the coding standards
2. **Test your changes** thoroughly
3. **Run linting and type checking**:
   ```bash
   npm run lint:fix
   npm run type-check
   ```
4. **Commit your changes** with a descriptive message

### Commit Message Convention
Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(player): add video quality selector
fix(adblocker): resolve false positive blocking
docs(readme): update installation instructions
```

## Code Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict type checking

### React
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement error boundaries where appropriate

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic HTML elements

### File Organization
- Keep components small and focused
- Use descriptive file and component names
- Group related files in appropriate directories
- Follow Next.js conventions

## Testing

### Manual Testing
- Test on different browsers (Chrome, Firefox, Safari)
- Test responsive design on different screen sizes
- Test video streaming functionality
- Verify ad blocking works correctly

### Automated Testing
- Run linting: `npm run lint`
- Run type checking: `npm run type-check`
- Test build process: `npm run build`

## Pull Request Process

1. **Ensure your branch is up to date**:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Push your changes**:
   ```bash
   git push origin your-feature-branch
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title describing the changes
   - Detailed description of what was changed and why
   - Screenshots or videos for UI changes
   - Reference to any related issues

4. **Respond to feedback** and make requested changes

## Code Review Guidelines

### For Contributors
- Be responsive to review feedback
- Make requested changes promptly
- Ask questions if feedback is unclear
- Keep PRs focused and reasonably sized

### For Reviewers
- Be constructive and helpful
- Focus on code quality and functionality
- Test the changes when possible
- Approve when satisfied with the changes

## Issue Reporting

When reporting issues, please include:
- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, Node.js version)
- **Screenshots or videos** if applicable
- **Console errors** if any

## Feature Requests

For feature requests, please:
- Check existing issues first
- Provide clear description of the feature
- Explain the use case and benefits
- Consider implementation complexity
- Be open to discussion and feedback

## Development Environment

### Required Tools
- Node.js 18+
- npm or yarn
- Git
- VS Code or Cursor (recommended)

### Recommended Extensions
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens

## Debugging

### Common Debugging Steps
1. Check browser console for errors
2. Verify environment variables are set
3. Test API endpoints manually
4. Use browser DevTools for network issues
5. Check Docker logs if using containers

### Debug Configuration
Use the provided VS Code debug configurations:
- Server-side debugging
- Client-side debugging
- Full-stack debugging

## Release Process

Releases are managed by maintainers:
1. Features are merged into `develop` branch
2. Testing and QA on `develop`
3. Merge `develop` to `main` for release
4. Create release tags and notes
5. Update Docker images

## Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the code of conduct
- Celebrate contributions and successes

## Getting Help

- Check the [DEVELOPMENT.md](DEVELOPMENT.md) guide
- Search existing issues and discussions
- Ask questions in GitHub Discussions
- Join our community channels (if available)

## License

By contributing to CinemaOS, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to CinemaOS! 🎬
