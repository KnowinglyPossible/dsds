/**
 * disable-devtools.js
 *
 * This script implements multiple techniques to detect and hide developer tools
 * in web browsers while allowing normal functionality like right-clicking and copy-paste.
 * It uses various detection methods and continuously monitors for developer tools being opened.
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        interval: 1000, // Check interval in milliseconds
        debuggerDetection: true,
        consoleDetection: true,
        sizeDetection: true,
        elementDetection: true,
        redirectUrl: null, // Set to a URL to redirect when devtools detected, or null to just disable
        message: "Developer tools are not allowed on this page.",
        blockOnlyDevTools: true // Only block dev tools, allow other functionality
    };

    // Store original console methods
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
        debug: console.debug
    };

    // Variables to track state
    let devToolsOpen = false;
    let checkInterval = null;

    /**
     * Disable all console methods
     */
    function disableConsole() {
        if (config.consoleDetection) {
            console.log = function() {};
            console.warn = function() {};
            console.error = function() {};
            console.info = function() {};
            console.debug = function() {};
            console.clear = function() {};
        }
    }

    /**
     * Restore original console methods
     */
    function restoreConsole() {
        console.log = originalConsole.log;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
        console.info = originalConsole.info;
        console.debug = originalConsole.debug;
    }

    /**
     * Detect devtools using window size difference
     * When dev tools are open, there's often a difference between
     * window.innerWidth and window.outerWidth
     */
    function detectDevToolsBySize() {
        if (!config.sizeDetection) return false;

        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        // Detect if device is mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Different detection for mobile
            return false; // Mobile detection is less reliable, so we'll skip it
        } else {
            return widthThreshold || heightThreshold;
        }
    }

    /**
     * Detect devtools using debugger hijacking
     */
    function detectDevToolsByDebugger() {
        if (!config.debuggerDetection) return false;

        let devToolsOpen = false;

        // Function to check execution time
        const checkDevTools = function() {
            const start = performance.now();
            debugger;
            const end = performance.now();

            // If debugger is open, execution will pause and time difference will be large
            return (end - start) > 100;
        };

        try {
            devToolsOpen = checkDevTools();
        } catch (e) {
            // Ignore errors
        }

        return devToolsOpen;
    }

    /**
     * Detect devtools by checking for specific elements
     */
    function detectDevToolsByElement() {
        if (!config.elementDetection) return false;

        // Check for Firebug
        if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
            return true;
        }

        // Check for Chrome/Firefox dev tools element
        const devtoolsElement = (function() {
            const element = document.createElement('div');
            element.id = 'devtools-detect';
            element.style.display = 'none';
            document.body.appendChild(element);
            return element;
        })();

        // In some browsers, dev tools changes the styling of this element
        let devtoolsOpen = false;

        // Check computed style
        const styles = window.getComputedStyle(devtoolsElement);
        if (styles.display === 'block') {
            devtoolsOpen = true;
        }

        // Clean up
        if (devtoolsElement && devtoolsElement.parentNode) {
            devtoolsElement.parentNode.removeChild(devtoolsElement);
        }

        return devtoolsOpen;
    }

    /**
     * Main function to check if developer tools are open
     */
    function checkDevTools() {
        const bySize = detectDevToolsBySize();
        const byDebugger = detectDevToolsByDebugger();
        const byElement = detectDevToolsByElement();

        // If any detection method returns true
        if (bySize || byDebugger || byElement) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                handleDevToolsOpen();
            }
        } else {
            if (devToolsOpen) {
                devToolsOpen = false;
                handleDevToolsClosed();
            }
        }
    }

    /**
     * Handle when developer tools are detected as open
     */
    function handleDevToolsOpen() {
        disableConsole();

        // Log a warning that will be visible if they do manage to open console
        originalConsole.warn(config.message);

        // Redirect if configured
        if (config.redirectUrl) {
            window.location.href = config.redirectUrl;
        }

        // Only block dev tools keyboard shortcuts if we're in block-only mode
        if (!config.blockOnlyDevTools) {
            preventCopyPaste();
            preventRightClick();
            preventViewSource();
        } else {
            preventDevToolsShortcuts();
        }
    }

    /**
     * Handle when developer tools are detected as closed
     */
    function handleDevToolsClosed() {
        // Optionally restore console if needed
        // restoreConsole();
    }

    /**
     * Prevent copy and paste
     */
    function preventCopyPaste() {
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            return false;
        });

        document.addEventListener('cut', function(e) {
            e.preventDefault();
            return false;
        });

        document.addEventListener('paste', function(e) {
            e.preventDefault();
            return false;
        });
    }

    /**
     * Prevent right click
     */
    function preventRightClick() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    }

    /**
     * Prevent view source shortcuts
     */
    function preventViewSource() {
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

            // Prevent Ctrl+U (view source)
            if (e.ctrlKey && e.key === 'U') {
                e.preventDefault();
                return false;
            }
        });
    }

    /**
     * Prevent only developer tools keyboard shortcuts
     */
    function preventDevToolsShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Prevent F12
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }

            // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (dev tools shortcuts)
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
                e.preventDefault();
                return false;
            }
        });
    }

    /**
     * Initialize the protection
     */
    function initialize() {
        // Start with console disabled
        disableConsole();

        // Set up continuous monitoring
        checkInterval = setInterval(checkDevTools, config.interval);

        // Run an initial check
        checkDevTools();

        // Set up additional protections only if not in block-only mode
        if (!config.blockOnlyDevTools) {
            preventRightClick();
            preventViewSource();
        } else {
            preventDevToolsShortcuts();
        }

        // Detect when devtools is opened via keyboard shortcut
        window.addEventListener('devtoolschange', function(e) {
            if (e.detail.open) {
                handleDevToolsOpen();
            } else {
                handleDevToolsClosed();
            }
        });
    }

    // Initialize when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Public API - can be used to manually check or configure
    window.devToolsDetector = {
        check: checkDevTools,
        disable: disableConsole,
        isOpen: function() { return devToolsOpen; },
        configure: function(newConfig) {
            Object.assign(config, newConfig);
        }
    };
})();
