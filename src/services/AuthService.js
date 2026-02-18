class AuthService {
    constructor() {
        this.token = localStorage.getItem('token') || null;
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.listeners = {};
    }

    // Mocking Login for Demo Mode
    async login(username, password) {
        console.log("⚠️ DEMO MODE: Bypassing Backend Login");

        // Mock User
        const mockUser = {
            username: username || 'Student',
            role: 'demo',
            id: 'mock-id-123'
        };

        this.user = mockUser;
        this.token = 'mock-demo-token';

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);

        // Notify listeners if any (simple event system)
        this.emit('auth:login', this.user);

        return Promise.resolve({ success: true, user: this.user });
    }

    // Mocking Register -> Just logs in
    async register(username, email, password) {
        return this.login(username, password);
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.hash = '/';
    }

    isAuthenticated() {
        return !!localStorage.getItem('user'); // Simple check
    }

    getAuthHeader() {
        return { 'Authorization': 'Bearer mock-demo-token' };
    }

    // Simple Event Emitter
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

export default new AuthService();
