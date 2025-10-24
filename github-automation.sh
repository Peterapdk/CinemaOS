#!/bin/bash

# CinemaOS GitHub Automation Script
# This script automates GitHub operations for CinemaOS development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if GitHub CLI is authenticated
check_gh_auth() {
    if ! gh auth status >/dev/null 2>&1; then
        print_error "GitHub CLI is not authenticated!"
        print_status "Please run: gh auth login"
        print_status "Follow the prompts to authenticate with GitHub"
        exit 1
    fi
}

# Function to create GitHub repository
create_repo() {
    local repo_name="CinemaOS"
    local description="Netflix-style media library app built with Next.js 14, TypeScript, and Tailwind CSS"
    
    print_status "Creating GitHub repository: $repo_name"
    
    if gh repo view "$repo_name" >/dev/null 2>&1; then
        print_warning "Repository $repo_name already exists!"
        return 0
    fi
    
    gh repo create "$repo_name" \
        --description "$description" \
        --public \
        --source=. \
        --remote=origin \
        --push
    
    print_success "Repository created and pushed to GitHub!"
}

# Function to push code to GitHub
push_to_github() {
    print_status "Pushing code to GitHub..."
    
    # Check if remote exists
    if ! git remote get-url origin >/dev/null 2>&1; then
        print_error "No remote origin found!"
        print_status "Please create a GitHub repository first or add remote manually"
        exit 1
    fi
    
    # Push main branch
    git push -u origin main
    
    # Push develop branch if it exists
    if git show-ref --verify --quiet refs/heads/develop; then
        git push -u origin develop
    fi
    
    print_success "Code pushed to GitHub successfully!"
}

# Function to create a new feature branch
create_feature_branch() {
    local feature_name="$1"
    
    if [ -z "$feature_name" ]; then
        print_error "Please provide a feature name!"
        print_status "Usage: $0 feature <feature-name>"
        exit 1
    fi
    
    local branch_name="feature/$feature_name"
    
    print_status "Creating feature branch: $branch_name"
    
    # Switch to develop branch
    git checkout develop
    
    # Create and switch to feature branch
    git checkout -b "$branch_name"
    
    print_success "Feature branch '$branch_name' created!"
    print_status "You can now make your changes and commit them"
}

# Function to create a pull request
create_pull_request() {
    local title="$1"
    local body="$2"
    
    if [ -z "$title" ]; then
        print_error "Please provide a PR title!"
        print_status "Usage: $0 pr \"<title>\" \"<description>\""
        exit 1
    fi
    
    print_status "Creating pull request..."
    
    gh pr create \
        --title "$title" \
        --body "$body" \
        --base develop \
        --head "$(git branch --show-current)"
    
    print_success "Pull request created!"
}

# Function to sync with remote
sync_repo() {
    print_status "Syncing repository with remote..."
    
    git fetch origin
    git checkout main
    git pull origin main
    
    if git show-ref --verify --quiet refs/heads/develop; then
        git checkout develop
        git pull origin develop
    fi
    
    print_success "Repository synced with remote!"
}

# Function to show repository status
show_status() {
    print_status "Repository Status:"
    echo "=================="
    
    echo "Current branch: $(git branch --show-current)"
    echo "Remote URL: $(git remote get-url origin 2>/dev/null || echo 'No remote')"
    echo "Last commit: $(git log -1 --oneline)"
    echo ""
    
    if gh auth status >/dev/null 2>&1; then
        echo "GitHub CLI: Authenticated"
        gh auth status
    else
        echo "GitHub CLI: Not authenticated"
    fi
}

# Function to setup GitHub Actions workflow
setup_github_actions() {
    print_status "Setting up GitHub Actions workflow..."
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run linting
      run: npm run lint
    
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}
        NEXT_PUBLIC_VIDORA_BASE_URL: https://vidora.su
        NEXT_PUBLIC_SITE_NAME: CinemaOS
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: build-files
        path: .next/
EOF

    print_success "GitHub Actions workflow created!"
    print_status "Don't forget to add TMDB_API_KEY to repository secrets"
}

# Main script logic
case "$1" in
    "auth")
        print_status "Authenticating with GitHub..."
        gh auth login
        ;;
    "create")
        check_gh_auth
        create_repo
        ;;
    "push")
        check_gh_auth
        push_to_github
        ;;
    "feature")
        create_feature_branch "$2"
        ;;
    "pr")
        check_gh_auth
        create_pull_request "$2" "$3"
        ;;
    "sync")
        sync_repo
        ;;
    "status")
        show_status
        ;;
    "actions")
        setup_github_actions
        ;;
    *)
        echo "CinemaOS GitHub Automation Script"
        echo "=================================="
        echo ""
        echo "Usage: $0 <command> [arguments]"
        echo ""
        echo "Commands:"
        echo "  auth                    - Authenticate with GitHub CLI"
        echo "  create                  - Create GitHub repository and push code"
        echo "  push                    - Push current code to GitHub"
        echo "  feature <name>           - Create a new feature branch"
        echo "  pr \"<title>\" \"<desc>\"   - Create a pull request"
        echo "  sync                    - Sync repository with remote"
        echo "  status                  - Show repository status"
        echo "  actions                 - Setup GitHub Actions workflow"
        echo ""
        echo "Examples:"
        echo "  $0 auth                 # Authenticate with GitHub"
        echo "  $0 create               # Create repository and push"
        echo "  $0 feature new-player   # Create feature/new-player branch"
        echo "  $0 pr \"Add player\" \"New video player feature\""
        ;;
esac
