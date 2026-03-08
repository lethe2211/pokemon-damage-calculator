# CI/CD Setup Guide

This document explains how to set up the GitHub Actions CI/CD pipeline for this project.

## Prerequisites

- GitHub repository access
- Anthropic API key (for Claude Code review)

## Setup Steps

### 1. Configure GitHub Secrets

Add the following secret to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key

You can get an Anthropic API key from: https://console.anthropic.com/

### 2. Workflows Overview

The project includes three GitHub Actions workflows:

#### **ci.yml** - Main CI Pipeline
Runs on every pull request and push to main/master:
- **Lint Check**: Validates code style with ESLint
- **Unit Tests**: Runs Jest tests
- **Build Test**: Verifies the application builds successfully

#### **claude-review.yml** - Code Review
Runs on:
- Every pull request
- When `@claude` is mentioned in comments

Provides automated code review feedback focusing on:
- Code quality and best practices
- TypeScript type safety
- React patterns
- Performance
- Security

#### **security-review.yml** - Security Analysis
Runs on every pull request to main/master:
- Identifies potential security vulnerabilities
- Checks for common security issues
- Validates input handling and sanitization

### 3. Using Claude Code Review

#### Automatic Review
Claude will automatically review all pull requests.

#### Manual Review
To request a review on a specific issue or PR:
1. Comment `@claude` followed by your question or request
2. Claude will analyze the code and provide feedback

Example:
```
@claude Please review this implementation for potential security issues
```

### 4. Alternative Setup (Terminal)

You can also set up Claude Code GitHub integration using the Claude Code CLI:

```bash
claude
/install-github-app
```

This will guide you through the setup process interactively.

## Workflow Status

You can view the status of all workflows in the **Actions** tab of your GitHub repository.

## Troubleshooting

### Workflow Fails with "API Key Not Found"
- Ensure `ANTHROPIC_API_KEY` is correctly set in repository secrets
- Verify the API key is valid and has sufficient credits

### Node.js Version Issues
- The workflows use Node.js 22
- If you encounter issues, you can modify the version in the workflow files

### Build Failures
- Ensure all tests pass locally before pushing
- Run `npm run lint`, `npm run test:ci`, and `npm run build` locally

## Resources

- [Claude Code GitHub Actions Documentation](https://docs.anthropic.com/en/docs/claude-code/github-actions)
- [Anthropic Claude Code Action](https://github.com/anthropics/claude-code-action)
- [Claude Code Security Review](https://github.com/anthropics/claude-code-security-review)
