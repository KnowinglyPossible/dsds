# Developer Tools Blocker

A lightweight JavaScript utility that detects and blocks browser developer tools while allowing normal browsing functionality.

## Overview

This script implements multiple techniques to detect when developer tools are opened in a web browser. When developer tools are detected, the script can disable console functionality, block developer tools keyboard shortcuts, and optionally redirect to another page.

## Features

- **Multiple Detection Methods**:
  - Window size difference detection
  - Debugger-based detection
  - Element detection
  - Console method overriding

- **Configurable Behavior**:
  - Block only developer tools while preserving normal browsing functionality
  - Optionally redirect to a custom URL when developer tools are detected
  - Customize warning messages
  - Enable/disable specific detection methods

- **Browser Compatibility**:
  - Works across major browsers (Chrome, Firefox, Edge, Safari)
  - Responsive to different device types (desktop vs. mobile)

- **Performance Optimized**:
  - Minimal impact on page load time
  - Efficient detection methods
  - No external dependencies

## Installation

Simply include the script in your HTML:

```html
<script src="disable-devtools.js"></script>
```

## Configuration

The script can be configured using the global API:

```javascript
window.devToolsDetector.configure({
    // URL to redirect when devtools detected (null = no redirect)
    redirectUrl: 'unauthorized.html',
    
    // Custom warning message
    message: 'Developer tools are not allowed on this page.',
    
    // Only block dev tools, allow other functionality
    blockOnlyDevTools: true,
    
    // Detection method settings
    debuggerDetection: true,
    consoleDetection: true,
    sizeDetection: true,
    elementDetection: true,
    
    // Check interval in milliseconds
    interval: 1000
});
```

## API Methods

The script exposes a global `devToolsDetector` object with the following methods:

- `check()`: Manually check if developer tools are open
- `disable()`: Manually disable console methods
- `isOpen()`: Returns true if developer tools are detected as open
- `configure(options)`: Update configuration options

## Detection Methods Explained

### Window Size Detection

This method detects developer tools by checking the difference between `window.innerWidth` and `window.outerWidth`. When developer tools are open, especially in a docked position, there's a significant difference between these values.

```javascript
function detectDevToolsBySize() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    return widthThreshold || heightThreshold;
}
```

### Debugger Detection

This method uses the JavaScript `debugger` statement and measures execution time. If developer tools are open with the debugger enabled, the execution will pause, resulting in a significant time difference.

```javascript
function detectDevToolsByDebugger() {
    const start = performance.now();
    debugger;
    const end = performance.now();
    
    return (end - start) > 100;
}
```

### Console Method Overriding

This technique overrides the default console methods to prevent their use:

```javascript
function disableConsole() {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.clear = function() {};
}
```

### Element Detection

This method checks for specific elements that might indicate developer tools are open:

```javascript
function detectDevToolsByElement() {
    // Check for Firebug
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
        return true;
    }
    
    // Check for Chrome/Firefox dev tools element
    const element = document.createElement('div');
    element.id = 'devtools-detect';
    document.body.appendChild(element);
    
    const styles = window.getComputedStyle(element);
    const devtoolsOpen = styles.display === 'block';
    
    element.parentNode.removeChild(element);
    return devtoolsOpen;
}
```

## Keyboard Shortcut Blocking

The script can block common keyboard shortcuts used to open developer tools:

```javascript
function preventDevToolsShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Prevent F12
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        
        // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
            return false;
        }
    });
}
```

## Security Considerations

- This script is designed to deter casual users from using developer tools
- No protection is 100% foolproof against determined users
- Use this as part of a broader security strategy
- The script does not prevent all possible ways to access developer tools

## License

This script is provided as-is for educational and protective purposes. Use responsibly and in accordance with your website's terms of service.

## Demo

A demo implementation is available in the `html` directory:
- `discord-demo.html`: A Discord-styled interface with the protection enabled
- `unauthorized.html`: An error page shown when developer tools are detected
