class Auth {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api';
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Register form
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.register();
        });

        // Switch between login and register
        document.getElementById('register-link').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-modal').classList.add('hidden');
            document.getElementById('register-modal').classList.remove('hidden');
        });

        document.getElementById('login-link').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('register-modal').classList.add('hidden');
            document.getElementById('login-modal').classList.remove('hidden');
        });
    }

    async login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                this.showMainInterface();
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    }

    async register() {
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful! Please login.');
                document.getElementById('register-modal').classList.add('hidden');
                document.getElementById('login-modal').classList.remove('hidden');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    }

    showMainInterface() {
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('main-container').classList.remove('hidden');
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            this.showMainInterface();
        }
    }
}

// Initialize authentication
const auth = new Auth();
auth.checkAuth();