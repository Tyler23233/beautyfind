// Authentication and User Management
export default class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.authProviders = ['email', 'google', 'facebook'];
        this.init();
    }

    init() {
        // Check for existing session
        this.checkExistingSession();
        this.setupAuthEventListeners();
    }

    // Check if user is already logged in
    checkExistingSession() {
        const savedUser = localStorage.getItem('beautyFindUser');
        const savedToken = localStorage.getItem('beautyFindToken');
        
        if (savedUser && savedToken) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.updateUIForAuthenticatedUser();
            } catch (error) {
                console.error('Error parsing saved user data:', error);
                this.clearAuthData();
            }
        }
    }

    setupAuthEventListeners() {
        // This would integrate with Firebase Auth or your chosen auth provider
        // For demo purposes, we'll simulate authentication
    }

    // Email/Password Authentication
    async signInWithEmail(email, password) {
        try {
            // Validate input
            if (!this.validateEmail(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (!password || password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            // In a real app, this would call your authentication service
            // For demo, simulate API call
            await this.simulateAuthRequest();
            
            const userData = {
                id: this.generateUserId(),
                email: email,
                name: email.split('@')[0],
                provider: 'email',
                createdAt: new Date().toISOString(),
                preferences: {
                    emailAlerts: true,
                    weeklyRoundup: false,
                    categories: [],
                    brands: []
                }
            };

            this.setAuthenticatedUser(userData);
            return { success: true, user: userData };
            
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }

    async signUpWithEmail(email, password, name) {
        try {
            // Validate input
            if (!this.validateEmail(email)) {
                throw new Error('Please enter a valid email address');
            }
            
            if (!password || password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            
            if (!name || name.trim().length < 2) {
                throw new Error('Please enter your name');
            }

            // Check if user already exists (in real app, this would be server-side)
            const existingUser = localStorage.getItem(`beautyFindUser_${email}`);
            if (existingUser) {
                throw new Error('An account with this email already exists');
            }

            // Simulate API call
            await this.simulateAuthRequest();
            
            const userData = {
                id: this.generateUserId(),
                email: email,
                name: name.trim(),
                provider: 'email',
                createdAt: new Date().toISOString(),
                preferences: {
                    emailAlerts: true,
                    weeklyRoundup: false,
                    categories: [],
                    brands: []
                }
            };

            // Save user data (in real app, this would be server-side)
            localStorage.setItem(`beautyFindUser_${email}`, JSON.stringify(userData));
            
            this.setAuthenticatedUser(userData);
            return { success: true, user: userData };
            
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }

    // Social Authentication (Google, Facebook, etc.)
    async signInWithProvider(provider) {
        try {
            if (!this.authProviders.includes(provider)) {
                throw new Error(`${provider} authentication not supported`);
            }

            // In a real app, this would integrate with Firebase Auth or similar
            // For demo, simulate the OAuth flow
            await this.simulateOAuthFlow(provider);
            
            const userData = {
                id: this.generateUserId(),
                email: `user@${provider}.com`,
                name: `${provider} User`,
                provider: provider,
                createdAt: new Date().toISOString(),
                preferences: {
                    emailAlerts: true,
                    weeklyRoundup: false,
                    categories: [],
                    brands: []
                }
            };

            this.setAuthenticatedUser(userData);
            return { success: true, user: userData };
            
        } catch (error) {
            console.error(`${provider} sign in error:`, error);
            return { success: false, error: error.message };
        }
    }

    // Sign out
    async signOut() {
        try {
            // In a real app, you'd revoke tokens on the server
            this.clearAuthData();
            this.updateUIForGuestUser();
            
            // Show confirmation message
            if (window.app) {
                window.app.showNotification('Successfully signed out', 'success');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update user profile
    async updateProfile(updates) {
        if (!this.isAuthenticated) {
            throw new Error('Must be signed in to update profile');
        }

        try {
            // Validate updates
            if (updates.email && !this.validateEmail(updates.email)) {
                throw new Error('Please enter a valid email address');
            }

            if (updates.name && updates.name.trim().length < 2) {
                throw new Error('Name must be at least 2 characters');
            }

            // Simulate API call
            await this.simulateAuthRequest();
            
            // Update user data
            this.currentUser = { ...this.currentUser, ...updates };
            this.saveUserData();
            
            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error('Profile update error:', error);
            return { success: false, error: error.message };
        }
    }

    // Update user preferences
    async updatePreferences(preferences) {
        if (!this.isAuthenticated) {
            throw new Error('Must be signed in to update preferences');
        }

        try {
            this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
            this.saveUserData();
            
            return { success: true, preferences: this.currentUser.preferences };
        } catch (error) {
            console.error('Preferences update error:', error);
            return { success: false, error: error.message };
        }
    }

    // Password reset
    async resetPassword(email) {
        try {
            if (!this.validateEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Simulate sending reset email
            await this.simulateAuthRequest();
            
            return { 
                success: true, 
                message: 'Password reset email sent. Please check your inbox.' 
            };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete account
    async deleteAccount() {
        if (!this.isAuthenticated) {
            throw new Error('Must be signed in to delete account');
        }

        try {
            // In a real app, this would delete user data from server
            this.clearAuthData();
            this.clearUserGeneratedData();
            this.updateUIForGuestUser();
            
            return { success: true };
        } catch (error) {
            console.error('Account deletion error:', error);
            return { success: false, error: error.message };
        }
    }

    // Sync data across devices (for authenticated users)
    async syncUserData() {
        if (!this.isAuthenticated) return;

        try {
            // In a real app, this would sync wishlist, owned products, etc. with server
            const localWishlist = JSON.parse(localStorage.getItem('beautyFindWishlist') || '[]');
            const localOwned = JSON.parse(localStorage.getItem('beautyFindOwned') || '[]');
            
            // Simulate server sync
            await this.simulateAuthRequest();
            
            // Update user data with synced information
            this.currentUser.wishlist = localWishlist;
            this.currentUser.ownedProducts = localOwned;
            this.saveUserData();
            
            return { success: true };
        } catch (error) {
            console.error('Data sync error:', error);
            return { success: false, error: error.message };
        }
    }

    // Helper Methods
    setAuthenticatedUser(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        this.saveUserData();
        this.saveAuthToken();
        this.updateUIForAuthenticatedUser();
        this.syncUserData();
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('beautyFindUser', JSON.stringify(this.currentUser));
        }
    }

    saveAuthToken() {
        // In a real app, you'd save the actual JWT token
        const fakeToken = this.generateAuthToken();
        localStorage.setItem('beautyFindToken', fakeToken);
    }

    clearAuthData() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('beautyFindUser');
        localStorage.removeItem('beautyFindToken');
    }

    clearUserGeneratedData() {
        // Clear wishlist and owned products
        localStorage.removeItem('beautyFindWishlist');
        localStorage.removeItem('beautyFindOwned');
    }

    updateUIForAuthenticatedUser() {
        // Update profile button to show user info
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn && this.currentUser) {
            profileBtn.innerHTML = `
                <div class="flex items-center space-x-1">
                    <div class="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-primary text-xs font-bold">
                        ${this.currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span class="hidden sm:inline">${this.currentUser.name.split(' ')[0]}</span>
                </div>
            `;
        }
    }

    updateUIForGuestUser() {
        // Reset profile button to default
        const profileBtn = document.getElementById('profileBtn');
        if (profileBtn) {
            profileBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span class="hidden sm:inline">Account</span>
            `;
        }
    }

    // Validation helpers
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateAuthToken() {
        // In a real app, this would be a proper JWT token from your auth service
        return 'fake_jwt_token_' + Date.now() + '_' + Math.random().toString(36);
    }

    // Simulation helpers (for demo purposes)
    async simulateAuthRequest() {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        
        // Occasionally simulate network errors for realistic testing
        if (Math.random() < 0.05) { // 5% chance of error
            throw new Error('Network error. Please try again.');
        }
    }

    async simulateOAuthFlow(provider) {
        // Simulate OAuth popup and user consent
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate user cancellation occasionally
        if (Math.random() < 0.1) { // 10% chance of cancellation
            throw new Error(`${provider} sign-in was cancelled`);
        }
    }

    // Guest user management
    promptGuestToSignUp() {
        if (this.isAuthenticated) return;

        // Show subtle prompt to create account for data persistence
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-accent text-primary p-4 rounded-lg shadow-lg max-w-sm z-50';
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-1">
                    <p class="font-medium text-sm">Save your wishlist</p>
                    <p class="text-xs opacity-90 mt-1">Create an account to sync across devices</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-primary hover:opacity-70">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="mt-3 space-x-2">
                <button onclick="app.openSignUpModal(); this.parentElement.parentElement.parentElement.remove()" 
                        class="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-primary-light transition-colors">
                    Sign Up
                </button>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="text-primary text-xs px-3 py-1 hover:opacity-70 transition-opacity">
                    Maybe Later
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    // Show guest user prompts at strategic moments
    onGuestAction(action) {
        if (this.isAuthenticated) return;

        const actionsToPrompt = ['add_to_wishlist', 'mark_as_owned', 'set_price_alert'];
        
        if (actionsToPrompt.includes(action)) {
            // Show prompt after a few interactions
            const interactionCount = parseInt(localStorage.getItem('guestInteractions') || '0') + 1;
            localStorage.setItem('guestInteractions', interactionCount.toString());
            
            if (interactionCount >= 3 && interactionCount % 5 === 0) {
                setTimeout(() => this.promptGuestToSignUp(), 2000);
            }
        }
    }

    // Get current user info
    getCurrentUser() {
        return this.currentUser;
    }

    // Check authentication status
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Get user preferences
    getUserPreferences() {
        return this.currentUser?.preferences || {};
    }

    // Data export for GDPR compliance
    async exportUserData() {
        if (!this.isAuthenticated) {
            throw new Error('Must be signed in to export data');
        }

        try {
            const userData = {
                profile: this.currentUser,
                wishlist: JSON.parse(localStorage.getItem('beautyFindWishlist') || '[]'),
                ownedProducts: JSON.parse(localStorage.getItem('beautyFindOwned') || '[]'),
                exportDate: new Date().toISOString()
            };

            // Convert to downloadable JSON file
            const dataStr = JSON.stringify(userData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `beautyfind_data_${this.currentUser.id}_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return { success: true };
        } catch (error) {
            console.error('Data export error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Auth modal components and handlers
class AuthModalManager {
    constructor() {
        this.currentModal = null;
        this.setupAuthModals();
    }

    setupAuthModals() {
        // Create auth modals HTML if they don't exist
        if (!document.getElementById('authModal')) {
            this.createAuthModals();
        }
        this.setupEventListeners();
    }

    createAuthModals() {
        const modalHTML = `
            <!-- Auth Modal -->
            <div id="authModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-2xl max-w-md w-full p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 id="authModalTitle" class="text-2xl font-playfair font-bold text-primary">Sign In</h3>
                            <button id="closeAuthModal" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Auth Form Container -->
                        <div id="authFormContainer">
                            <!-- Sign In Form -->
                            <form id="signInForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-deep-charcoal mb-2">Email</label>
                                    <input type="email" id="signInEmail" required
                                           class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-deep-charcoal mb-2">Password</label>
                                    <input type="password" id="signInPassword" required
                                           class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <button type="submit" class="w-full btn-accent">
                                    Sign In
                                </button>
                            </form>
                            
                            <!-- Sign Up Form -->
                            <form id="signUpForm" class="space-y-4 hidden">
                                <div>
                                    <label class="block text-sm font-medium text-deep-charcoal mb-2">Name</label>
                                    <input type="text" id="signUpName" required
                                           class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-deep-charcoal mb-2">Email</label>
                                    <input type="email" id="signUpEmail" required
                                           class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-deep-charcoal mb-2">Password</label>
                                    <input type="password" id="signUpPassword" required minlength="6"
                                           class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent focus:border-transparent">
                                </div>
                                <button type="submit" class="w-full btn-accent">
                                    Create Account
                                </button>
                            </form>
                        </div>
                        
                        <!-- Social Sign In -->
                        <div class="mt-6">
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>
                            
                            <div class="mt-6 grid grid-cols-2 gap-3">
                                <button id="googleSignIn" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span class="ml-2">Google</span>
                                </button>
                                
                                <button id="facebookSignIn" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span class="ml-2">Facebook</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Toggle between sign in/up -->
                        <div class="mt-6 text-center">
                            <p class="text-sm text-gray-600">
                                <span id="authToggleText">Don't have an account?</span>
                                <button id="authToggleBtn" class="text-accent hover:text-yellow-600 font-medium ml-1">
                                    Sign up
                                </button>
                            </p>
                        </div>
                        
                        <!-- Error message -->
                        <div id="authError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm hidden">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupEventListeners() {
        // Modal controls
        document.getElementById('closeAuthModal').addEventListener('click', () => this.closeAuthModal());
        document.getElementById('authToggleBtn').addEventListener('click', () => this.toggleAuthMode());
        
        // Form submissions
        document.getElementById('signInForm').addEventListener('submit', (e) => this.handleSignIn(e));
        document.getElementById('signUpForm').addEventListener('submit', (e) => this.handleSignUp(e));
        
        // Social sign in
        document.getElementById('googleSignIn').addEventListener('click', () => this.handleSocialSignIn('google'));
        document.getElementById('facebookSignIn').addEventListener('click', () => this.handleSocialSignIn('facebook'));
        
        // Close modal on backdrop click
        document.getElementById('authModal').addEventListener('click', (e) => {
            if (e.target.id === 'authModal') this.closeAuthModal();
        });
    }

    openSignInModal() {
        this.currentModal = 'signin';
        this.showSignInForm();
        document.getElementById('authModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    openSignUpModal() {
        this.currentModal = 'signup';
        this.showSignUpForm();
        document.getElementById('authModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    closeAuthModal() {
        document.getElementById('authModal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        this.clearForms();
        this.hideError();
    }

    toggleAuthMode() {
        if (this.currentModal === 'signin') {
            this.showSignUpForm();
        } else {
            this.showSignInForm();
        }
    }

    showSignInForm() {
        this.currentModal = 'signin';
        document.getElementById('authModalTitle').textContent = 'Sign In';
        document.getElementById('signInForm').classList.remove('hidden');
        document.getElementById('signUpForm').classList.add('hidden');
        document.getElementById('authToggleText').textContent = "Don't have an account?";
        document.getElementById('authToggleBtn').textContent = 'Sign up';
    }

    showSignUpForm() {
        this.currentModal = 'signup';
        document.getElementById('authModalTitle').textContent = 'Create Account';
        document.getElementById('signInForm').classList.add('hidden');
        document.getElementById('signUpForm').classList.remove('hidden');
        document.getElementById('authToggleText').textContent = 'Already have an account?';
        document.getElementById('authToggleBtn').textContent = 'Sign in';
    }

    async handleSignIn(e) {
        e.preventDefault();
        this.hideError();
        
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;
        
        try {
            const result = await authManager.signInWithEmail(email, password);
            
            if (result.success) {
                this.closeAuthModal();
                if (window.app) {
                    window.app.showNotification('Welcome back!', 'success');
                    window.app.updateWishlistCounter();
                }
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('An unexpected error occurred. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleSignUp(e) {
        e.preventDefault();
        this.hideError();
        
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        try {
            const result = await authManager.signUpWithEmail(email, password, name);
            
            if (result.success) {
                this.closeAuthModal();
                if (window.app) {
                    window.app.showNotification('Account created successfully!', 'success');
                    window.app.updateWishlistCounter();
                }
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError('An unexpected error occurred. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleSocialSignIn(provider) {
        this.hideError();
        
        try {
            const result = await authManager.signInWithProvider(provider);
            
            if (result.success) {
                this.closeAuthModal();
                if (window.app) {
                    window.app.showNotification(`Welcome! Signed in with ${provider}`, 'success');
                    window.app.updateWishlistCounter();
                }
            } else {
                this.showError(result.error);
            }
        } catch (error) {
            this.showError(`${provider} sign-in failed. Please try again.`);
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('authError');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    hideError() {
        document.getElementById('authError').classList.add('hidden');
    }

    clearForms() {
        document.getElementById('signInForm').reset();
        document.getElementById('signUpForm').reset();
    }
}

// Initialize auth modal manager
const authModalManager = new AuthModalManager();

// Add methods to global app object for easy access
if (typeof window !== 'undefined') {
    window.openSignInModal = () => authModalManager.openSignInModal();
    window.openSignUpModal = () => authModalManager.openSignUpModal();
    window.signOut = () => authManager.signOut();
}
