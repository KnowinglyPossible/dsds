# Discord-Style DevTools Protection

This project implements a Discord-styled interface with developer tools protection functionality. It detects and blocks developer tools while allowing normal browsing functionality.

## Project Structure

The project is organized into the following folders:

```
scripts/
├── assets/         # Images and other static assets
│   └── discord-icon.svg
├── css/            # CSS stylesheets
│   └── discord-fonts.css
├── html/           # HTML files
│   ├── demo.html
│   ├── discord-demo.html
│   └── unauthorized.html
├── js/             # JavaScript files
│   ├── disable-devtools.js
│   └── readme/      # Documentation for the dev tools blocker
│       └── README.md
└── index.html      # Main entry point
```

## Files Description

### HTML Files

- `index.html`: Main entry point that redirects to the Discord demo
- `html/discord-demo.html`: Discord-styled interface with developer tools protection
- `html/unauthorized.html`: Error page shown when developer tools are detected
- `html/demo.html`: Simple demo page showing how to use the protection script

### CSS Files

- `css/discord-fonts.css`: Discord font definitions and styling

### JavaScript Files

- `js/disable-devtools.js`: Script that detects and blocks developer tools
- `js/readme/README.md`: Detailed documentation for the dev tools blocker script

### Asset Files

- `assets/discord-icon.svg`: Discord logo used as favicon

## How to Use

1. Open `index.html` in your browser to start the demo
2. Try opening developer tools to see the protection in action
3. You will be redirected to the unauthorized page if developer tools are detected

## Features

- Discord-styled UI with server list, channels, and chat
- Developer tools detection and blocking
- Fast loading with performance optimizations
- Responsive design
- Custom error page for unauthorized access

## Implementation Details

The developer tools protection script uses multiple techniques to detect when developer tools are opened:

- Window size difference detection
- Debugger-based detection
- Console method overriding
- Developer tools keyboard shortcut blocking

The script is configured to only block developer tools while allowing normal browsing functionality like right-clicking and copy-paste.
