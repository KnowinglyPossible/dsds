class VSCodeInterface {
    constructor() {
        this.initializeEventListeners();
        this.currentTab = 'index.html';
        this.files = {
            'index.html': '<!DOCTYPE html>\n<html>\n    <head>\n        <title>Welcome</title>\n    </head>\n    <body>\n        <h1>Welcome to VS Code Web Template</h1>\n    </body>\n</html>',
            'style.css': 'body {\n    margin: 0;\n    padding: 20px;\n    font-family: Arial, sans-serif;\n}',
            'script.js': 'console.log("Welcome to VS Code Web Template");'
        };
        this.updateEditor();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.textContent);
            });
        });

        // File tree interaction
        document.querySelectorAll('.file').forEach(file => {
            file.addEventListener('click', () => {
                const fileName = file.textContent.trim();
                this.switchTab(fileName);
            });
        });

        // Folder toggling
        document.querySelectorAll('.folder span').forEach(folder => {
            folder.addEventListener('click', () => {
                const content = folder.nextElementSibling;
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    switchTab(fileName) {
        // Update active tab
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.textContent === fileName) {
                tab.classList.add('active');
            }
        });

        this.currentTab = fileName;
        this.updateEditor();
    }

    updateEditor() {
        const editor = document.getElementById('editor');
        editor.textContent = this.files[this.currentTab] || '';
    }
}

// Initialize VS Code interface
document.addEventListener('DOMContentLoaded', () => {
    new VSCodeInterface();
});