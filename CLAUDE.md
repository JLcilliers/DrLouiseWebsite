# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a hybrid website project for Cosmetic Dental Cape Town that includes:
- Static HTML website (`index.html`, `services.html`, `team.html`, etc.)
- WordPress theme components (`header.php`, `footer.php`, `functions.php`, etc.)
- Testing infrastructure using Puppeteer and Playwright

## Common Development Commands

### Testing
```bash
# Run comprehensive Puppeteer tests
node test-website.js

# Run Playwright tests (if configured)
npx playwright test

# Start local development server for testing
python -m http.server 3000
```

### WordPress Theme Development
```bash
# Build WordPress theme (Windows)
build-wordpress-theme.bat

# Run autonomous development tasks (Windows)
run-autonomous.bat
```

### Installation
```bash
# Install dependencies
npm install

# Install Puppeteer MCP server (globally)
npm install -g @modelcontextprotocol/server-puppeteer
```

## Architecture and Key Components

### Website Structure
- **Static Website**: Self-contained HTML files in root and `Website/` directory
  - `index.html` - Main landing page with full content
  - Service pages: `services.html`, `gallery.html`, `team.html`, `contact.html`
  - Uses inline styles and external `style.css`/`styles.css`

- **WordPress Theme**: PHP template files for WordPress integration
  - Template hierarchy: `index.php`, `page.php`, `single.php`, `archive.php`
  - Components: `header.php`, `footer.php`, `functions.php`
  - Follows standard WordPress theme structure

### Assets Organization
- `Website Resources/` - Contains all design assets, images, and content documents
  - Logo exports in multiple formats (PNG, SVG, PDF)
  - Treatment-specific content in subdirectories
  - Team member photos and bios
  
- `assets/` - Runtime assets for the website
  - `images/` - Website images
  - `js/` - JavaScript files
  - `videos/` - Background videos

### Testing Infrastructure
- `test-website.js` - Comprehensive Puppeteer test suite covering:
  - Navigation and smooth scrolling
  - Form validation and submission
  - Responsive design across viewports
  - Accessibility (alt text, ARIA labels, focus styles)
  - Performance metrics
  - SEO validation

- `playwright.config.js` - Playwright configuration for additional testing

### MCP Server Configuration
The project includes Model Context Protocol (MCP) server configuration for Puppeteer automation:
- Configuration location: `.claude/claude_desktop_config.json`
- Enables browser automation for testing and interaction

## Key Files to Understand

1. **index.html** - Main website structure and content, includes SEO meta tags, structured data, and responsive design
2. **test-website.js** - Test suite that validates all website functionality
3. **functions.php** - WordPress theme customization and functionality
4. **style.css** - Main stylesheet with responsive design rules

## Development Notes

- The website is designed to work both as a static site and as a WordPress theme
- Test files expect the website to be served locally on port 3000
- WordPress theme files require a WordPress installation to function
- The project includes comprehensive SEO optimization with meta tags and structured data

## Autonomous Website Testing and Fixing

### Workflow
1. Open each page in browser using Puppeteer
2. Take screenshot of current state
3. Check for:
   - Broken links (404 errors)
   - Console errors
   - Form validation
   - Mobile responsiveness
   - Visual consistency
4. If issues found:
   - Fix the code
   - Re-test
   - Continue until working
5. Never stop until 100% functional

### Testing Requirements
- All 52 pages must load without errors
- All navigation dropdowns must work
- All internal links must be valid
- Forms must validate properly
- Site must be responsive at 320px, 768px, 1024px, 1920px