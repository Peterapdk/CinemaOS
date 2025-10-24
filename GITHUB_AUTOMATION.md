# CinemaOS GitHub Automation Guide

## 🚀 Quick Start

### 1. Authenticate with GitHub
```bash
./github-automation.sh auth
```
Follow the prompts to authenticate with GitHub CLI.

### 2. Create Repository and Push Code
```bash
./github-automation.sh create
```
This will:
- Create a public GitHub repository named "CinemaOS"
- Add remote origin
- Push both main and develop branches

### 3. Check Status
```bash
./github-automation.sh status
```

## 📋 Available Commands

### Authentication
```bash
./github-automation.sh auth
```
Authenticate with GitHub CLI (required for most operations)

### Repository Management
```bash
./github-automation.sh create    # Create repository and push code
./github-automation.sh push      # Push current code to GitHub
./github-automation.sh sync      # Sync with remote repository
./github-automation.sh status    # Show repository status
```

### Development Workflow
```bash
./github-automation.sh feature <name>                    # Create feature branch
./github-automation.sh pr "Title" "Description"         # Create pull request
```

### CI/CD Setup
```bash
./github-automation.sh actions   # Setup GitHub Actions workflow
```

## 🔧 NPM Scripts Integration

You can also use npm scripts for convenience:

```bash
npm run github:auth      # Authenticate with GitHub
npm run github:create    # Create repository
npm run github:push      # Push to GitHub
npm run github:feature   # Create feature branch
npm run github:pr        # Create pull request
npm run github:sync      # Sync repository
npm run github:status    # Show status
npm run github:actions   # Setup GitHub Actions
```

## 🎯 Typical Workflow

### 1. Initial Setup
```bash
# Authenticate with GitHub
./github-automation.sh auth

# Create repository and push code
./github-automation.sh create

# Setup GitHub Actions
./github-automation.sh actions
```

### 2. Feature Development
```bash
# Create feature branch
./github-automation.sh feature new-video-player

# Make your changes...
git add .
git commit -m "feat: add new video player component"

# Push feature branch
git push origin feature/new-video-player

# Create pull request
./github-automation.sh pr "Add New Video Player" "Implements a new video player with enhanced controls"
```

### 3. Daily Development
```bash
# Sync with remote
./github-automation.sh sync

# Check status
./github-automation.sh status

# Push changes
./github-automation.sh push
```

## 🔐 GitHub Authentication

The script uses GitHub CLI for authentication. You have several options:

### Option 1: Browser Authentication (Recommended)
```bash
./github-automation.sh auth
# Select "Login with a web browser"
# Follow the browser prompts
```

### Option 2: Token Authentication
```bash
gh auth login --with-token < your_token.txt
```

### Option 3: SSH Authentication
```bash
gh auth login --git-protocol ssh
```

## 📊 GitHub Actions Integration

The automation script can set up a complete CI/CD pipeline:

```bash
./github-automation.sh actions
```

This creates `.github/workflows/ci.yml` with:
- ✅ Node.js setup
- ✅ Dependency installation
- ✅ TypeScript type checking
- ✅ ESLint linting
- ✅ Build process
- ✅ Artifact upload

### Required Secrets
Add these secrets to your GitHub repository:
- `TMDB_API_KEY`: Your TMDB API key

## 🛠️ Troubleshooting

### GitHub CLI Not Authenticated
```bash
./github-automation.sh auth
```

### Repository Already Exists
The script will detect existing repositories and skip creation.

### Permission Issues
Make sure your GitHub account has permission to create repositories.

### Network Issues
Check your internet connection and GitHub status.

## 📝 Customization

### Repository Settings
Edit `github-automation.sh` to customize:
- Repository name
- Description
- Visibility (public/private)
- Default branch

### GitHub Actions
Modify `.github/workflows/ci.yml` to add:
- Testing
- Deployment
- Notifications
- Security scanning

## 🔗 Integration with Cursor

### VS Code/Cursor Settings
Add to your workspace settings:

```json
{
  "terminal.integrated.shell.linux": "/bin/bash",
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "git.confirmSync": false
}
```

### Recommended Extensions
- GitHub Pull Requests and Issues
- GitLens
- Git Graph
- GitHub Actions

## 📚 Additional Resources

- [GitHub CLI Documentation](https://cli.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Workflow Best Practices](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

**Ready to automate your GitHub workflow?** Run `./github-automation.sh auth` to get started! 🎬
