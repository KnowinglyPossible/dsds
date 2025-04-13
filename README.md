# Developer Tools Blocker

A lightweight JavaScript utility that detects and blocks browser developer tools while allowing normal browsing functionality.

## Features

- Detects developer tools using multiple methods:
  - Window size difference detection
  - Debugger-based detection
  - Element detection
- Blocks only developer tools while preserving normal browsing functionality:
  - Right-clicking works normally
  - Copy-paste functionality is preserved
  - Only developer tools keyboard shortcuts are blocked
- Configurable options
- Works across major browsers (Chrome, Firefox, Edge, Safari)

## Usage

1. Include the script in your HTML:

```html
<script src="disable-devtools.js"></script>
```

2. (Optional) Configure the script:

```javascript
window.devToolsDetector.configure({
    redirectUrl: 'https://example.com/unauthorized', // Redirect when devtools detected (optional)
    message: 'Custom warning message',               // Custom warning message
    blockOnlyDevTools: true                          // Only block dev tools, allow other functionality
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `interval` | Number | 1000 | Check interval in milliseconds |
| `debuggerDetection` | Boolean | true | Enable debugger-based detection |
| `consoleDetection` | Boolean | true | Enable console method overriding |
| `sizeDetection` | Boolean | true | Enable window size difference detection |
| `elementDetection` | Boolean | true | Enable element-based detection |
| `redirectUrl` | String | null | URL to redirect when devtools detected (null = no redirect) |
| `message` | String | "Developer tools are not allowed on this page." | Warning message |
| `blockOnlyDevTools` | Boolean | true | Only block dev tools, allow other functionality |

## API Methods

The script exposes a global `devToolsDetector` object with the following methods:

- `check()`: Manually check if developer tools are open
- `disable()`: Manually disable console methods
- `isOpen()`: Returns true if developer tools are detected as open
- `configure(options)`: Update configuration options

## Demo

Open the `demo.html` file to see the script in action.

## Notes

- This script is designed to deter casual users from using developer tools
- No protection is 100% foolproof against determined users
- Use this as part of a broader security strategy
