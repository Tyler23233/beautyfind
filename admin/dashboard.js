// Admin Dashboard Management
class AdminDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.pendingProducts = [];
    this.allProducts = [];
    this.users = [];
    this.analytics = {};

    this.init();
  }

  init() {
    this.setupNavigation();
    this.loadInitialData();
    this.setupEventListeners();
    this.loadSection('dashboard');
  }

  setupNavigation() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        this.switchSection(section);
      });
    });
  }

  setupEventListeners() {
    // Review modal
    document
      .getElementById('closeReviewModal')
      .addEventListener('click', () => {
        this.closeReviewModal();
      });

    // Close modal on backdrop click
    document.getElementById('reviewModal').addEventListener('click', (e) => {
      if (e.target.id === 'reviewModal') {
        this.closeReviewModal();
      }
    });
  }

  async loadInitialData() {
    // Load sample data for demo
    this.pendingProducts = await this.generateSamplePendingProducts();
    this.allProducts = await ProductManager.getFilteredProducts(
      {},
      'popular',
      1,
      50,
    );
    this.users = await this.generateSampleUsers();
    this.analytics = await this.generateSampleAnalytics();

    // Update pending count in sidebar
    document.getElementById('pendingCount').textContent =
      this.pendingProducts.length;
  }

  switchSection(section) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active');
    });
    document
      .querySelector(`[data-section="${section}"]`)
      .classList.add('active');

    this.currentSection = section;
    this.loadSection(section);
  }

  loadSection(section) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    const pageContent = document.getElementById('pageContent');

    switch (section) {
      case 'dashboard':
        pageTitle.textContent = 'Dashboard';
        pageSubtitle.textContent =
          "Welcome back! Here's what's happening with your beauty platform.";
        pageContent.innerHTML = this.renderDashboard();
        this.initializeCharts();
        break;

      case 'pending':
        pageTitle.textContent = 'Pending Approval';
        pageSubtitle.textContent =
          'Review and approve user-submitted products.';
        pageContent.innerHTML = this.renderPendingProducts();
        break;

      case 'products':
        pageTitle.textContent = 'All Products';
        pageSubtitle.textContent = 'Manage your product catalog.';
        pageContent.innerHTML = this.renderAllProducts();
        break;

      case 'categories':
        pageTitle.textContent = 'Categories';
        pageSubtitle.textContent =
          'Manage product categories and organization.';
        pageContent.innerHTML = this.renderCategories();
        break;

      case 'analytics':
        pageTitle.textContent = 'Analytics';
        pageSubtitle.textContent = 'Track performance and user engagement.';
        pageContent.innerHTML = this.renderAnalytics();
        this.initializeAnalyticsCharts();
        break;

      case 'users':
        pageTitle.textContent = 'Users';
        pageSubtitle.textContent = 'Manage user accounts and activity.';
        pageContent.innerHTML = this.renderUsers();
        break;

      case 'settings':
        pageTitle.textContent = 'Settings';
        pageSubtitle.textContent =
          'Configure platform settings and preferences.';
        pageContent.innerHTML = this.renderSettings();
        break;
    }
  }

  renderDashboard() {
    return `
            <!-- Stats Grid -->
            <div class="stats-grid mb-8">
                <div class="stat-card">
                    <div class="stat-card-icon bg-blue-100 text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">${this.allProducts.length}</div>
                    <div class="stat-card-label">Total Products</div>
                    <div class="stat-card-change positive">+12% from last month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-yellow-100 text-yellow-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">${this.pendingProducts.length}</div>
                    <div class="stat-card-label">Pending Review</div>
                    <div class="stat-card-change">New submissions today</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-green-100 text-green-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">${this.users.length}</div>
                    <div class="stat-card-label">Active Users</div>
                    <div class="stat-card-change positive">+8% from last week</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-purple-100 text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">$${this.analytics.revenue?.toLocaleString() || '12,340'}</div>
                    <div class="stat-card-label">Revenue (30d)</div>
                    <div class="stat-card-change positive">+15% from last month</div>
                </div>
            </div>
            
            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="chart-container">
                    <div class="chart-header">
                        <div>
                            <h3 class="chart-title">Product Performance</h3>
                            <p class="chart-subtitle">Top performing products by clicks</p>
                        </div>
                    </div>
                    <canvas id="productChart" width="400" height="200"></canvas>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <div>
                            <h3 class="chart-title">User Engagement</h3>
                            <p class="chart-subtitle">Daily active users</p>
                        </div>
                    </div>
                    <canvas id="userChart" width="400" height="200"></canvas>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
                <div class="space-y-4">
                    ${this.generateRecentActivity()}
                </div>
            </div>
        `;
  }

  renderPendingProducts() {
    if (this.pendingProducts.length === 0) {
      return `
                <div class="empty-state">
                    <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="empty-state-title">All caught up!</h3>
                    <p class="empty-state-description">No products pending review at the moment.</p>
                </div>
            `;
    }

    return `
            <div class="filter-bar">
                <div class="filter-row">
                    <input type="text" id="pendingSearch" placeholder="Search pending products..." class="search-input">
                    <select id="pendingCategory" class="filter-select">
                        <option value="">All Categories</option>
                        <option value="skincare">Skincare</option>
                        <option value="makeup">Makeup</option>
                        <option value="haircare">Hair Care</option>
                        <option value="fragrance">Fragrance</option>
                        <option value="tools">Tools</option>
                    </select>
                    <select id="pendingStatus" class="filter-select">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewing">Under Review</option>
                    </select>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                ${this.pendingProducts
                  .map(
                    (product) => `
                    <div class="admin-product-card">
                        <div class="flex">
                            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
                            <div class="admin-product-info">
                                <h4 class="admin-product-title">${product.name}</h4>
                                <p class="admin-product-brand">${product.brand}</p>
                                <p class="admin-product-price">$${product.price}</p>
                                <div class="admin-product-meta">
                                    <div>Category: ${product.category}</div>
                                    <div>Submitted: ${new Date(product.submittedAt).toLocaleDateString()}</div>
                                    <div>Source: ${product.sourceUrl}</div>
                                </div>
                            </div>
                            <div class="admin-product-actions">
                                <button onclick="adminDashboard.reviewProduct('${product.id}')" class="btn-view">
                                    Review
                                </button>
                                <button onclick="adminDashboard.approveProduct('${product.id}')" class="btn-approve">
                                    Approve
                                </button>
                                <button onclick="adminDashboard.rejectProduct('${product.id}')" class="btn-reject">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        `;
  }

  renderAllProducts() {
    return `
            <div class="filter-bar">
                <div class="filter-row">
                    <input type="text" id="productSearch" placeholder="Search products..." class="search-input">
                    <select id="productCategory" class="filter-select">
                        <option value="">All Categories</option>
                        <option value="skincare">Skincare</option>
                        <option value="makeup">Makeup</option>
                        <option value="haircare">Hair Care</option>
                        <option value="fragrance">Fragrance</option>
                        <option value="tools">Tools</option>
                    </select>
                    <select id="productStatus" class="filter-select">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button class="btn-accent">Add Product</button>
                </div>
            </div>
            
            <div class="admin-table">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.allProducts
                          .map(
                            (product) => `
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <img src="${product.image}" alt="${product.name}" class="w-10 h-10 object-cover rounded">
                                        <div class="ml-3">
                                            <div class="font-medium">${product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${product.brand}</td>
                                <td>
                                    <span class="capitalize">${product.category}</span>
                                </td>
                                <td>$${product.price}</td>
                                <td>
                                    <span class="status-badge active">Active</span>
                                </td>
                                <td>
                                    <div class="action-btn-group">
                                        <button class="btn-edit">Edit</button>
                                        <button class="btn-view">View</button>
                                        <button class="btn-delete">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        `,
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>
        `;
  }

  renderCategories() {
    const categories = ProductManager.getCategories();

    return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${categories
                  .map(
                    (category) => `
                    <div class="stat-card">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-primary capitalize">${category.label}</h3>
                            <div class="action-btn-group">
                                <button class="btn-edit">Edit</button>
                                <button class="btn-delete">Delete</button>
                            </div>
                        </div>
                        <div class="text-2xl font-bold text-accent mb-2">
                            ${this.allProducts.filter((p) => p.category === category.value).length}
                        </div>
                        <div class="text-sm text-gray-600">Products in category</div>
                    </div>
                `,
                  )
                  .join('')}
                
                <!-- Add New Category Card -->
                <div class="stat-card border-2 border-dashed border-gray-300 hover:border-accent transition-colors cursor-pointer" onclick="adminDashboard.showAddCategoryModal()">
                    <div class="text-center">
                        <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-700">Add Category</h3>
                        <p class="text-sm text-gray-500">Create a new product category</p>
                    </div>
                </div>
            </div>
        `;
  }

  renderAnalytics() {
    return `
            <!-- Key Metrics -->
            <div class="stats-grid mb-8">
                <div class="stat-card">
                    <div class="stat-card-icon bg-blue-100 text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">24,567</div>
                    <div class="stat-card-label">Page Views (30d)</div>
                    <div class="stat-card-change positive">+18% from last month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-green-100 text-green-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">3,421</div>
                    <div class="stat-card-label">Affiliate Clicks</div>
                    <div class="stat-card-change positive">+23% from last month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-purple-100 text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">1,892</div>
                    <div class="stat-card-label">Wishlist Adds</div>
                    <div class="stat-card-change positive">+12% from last month</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-card-icon bg-yellow-100 text-yellow-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                    <div class="stat-card-value">$8,234</div>
                    <div class="stat-card-label">Commission Earned</div>
                    <div class="stat-card-change positive">+27% from last month</div>
                </div>
            </div>
            
            <!-- Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Traffic Overview</h3>
                        <p class="chart-subtitle">Daily visitors and page views</p>
                    </div>
                    <canvas id="trafficChart" width="400" height="300"></canvas>
                </div>
                
                <div class="chart-container">
                    <div class="chart-header">
                        <h3 class="chart-title">Revenue Breakdown</h3>
                        <p class="chart-subtitle">Commission by category</p>
                    </div>
                    <canvas id="revenueChart" width="400" height="300"></canvas>
                </div>
            </div>
            
            <!-- Top Products Table -->
            <div class="chart-container">
                <div class="chart-header">
                    <h3 class="chart-title">Top Performing Products</h3>
                    <p class="chart-subtitle">Highest earning products this month</p>
                </div>
                <div class="admin-table">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Clicks</th>
                                <th>Conversions</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.generateTopProductsData()}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
  }

  renderUsers() {
    return `
            <div class="filter-bar">
                <div class="filter-row">
                    <input type="text" id="userSearch" placeholder="Search users..." class="search-input">
                    <select id="userStatus" class="filter-select">
                        <option value="">All Users</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select id="userType" class="filter-select">
                        <option value="">All Types</option>
                        <option value="registered">Registered</option>
                        <option value="guest">Guest</option>
                    </select>
                </div>
            </div>
            
            <div class="admin-table">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Joined</th>
                            <th>Wishlist Items</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.users
                          .map(
                            (user) => `
                            <tr>
                                <td>
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold text-sm">
                                            ${user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div class="ml-3">
                                            <div class="font-medium">${user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${user.email}</td>
                                <td>${new Date(user.joinedAt).toLocaleDateString()}</td>
                                <td>${user.wishlistCount}</td>
                                <td>
                                    <span class="status-badge ${user.status}">${user.status}</span>
                                </td>
                                <td>
                                    <div class="action-btn-group">
                                        <button class="btn-view">View</button>
                                        <button class="btn-edit">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        `,
                          )
                          .join('')}
                    </tbody>
                </table>
            </div>
        `;
  }

  renderSettings() {
    return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- General Settings -->
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-primary mb-4">General Settings</h3>
                    <form class="admin-form">
                        <div class="form-group">
                            <label class="form-label">Site Name</label>
                            <input type="text" class="form-input" value="BeautyFind">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Site Description</label>
                            <textarea class="form-textarea">Discover, track, and save on your favorite beauty products.</textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contact Email</label>
                            <input type="email" class="form-input" value="admin@beautyfind.com">
                        </div>
                        <button type="submit" class="btn-accent">Save Changes</button>
                    </form>
                </div>
                
                <!-- Affiliate Settings -->
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-primary mb-4">Affiliate Settings</h3>
                    <form class="admin-form">
                        <div class="form-group">
                            <label class="form-label">Amazon Affiliate ID</label>
                            <input type="text" class="form-input" placeholder="your-affiliate-tag">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Rakuten Affiliate ID</label>
                            <input type="text" class="form-input" placeholder="your-rakuten-id">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Commission Rate Display</label>
                            <select class="form-select">
                                <option>Hide commission rates</option>
                                <option>Show estimated rates</option>
                                <option>Show exact rates</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-accent">Save Settings</button>
                    </form>
                </div>
                
                <!-- Email Settings -->
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-primary mb-4">Email Settings</h3>
                    <form class="admin-form">
                        <div class="form-group">
                            <label class="form-label">SMTP Server</label>
                            <input type="text" class="form-input" placeholder="smtp.gmail.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">SMTP Port</label>
                            <input type="number" class="form-input" value="587">
                        </div>
                        <div class="form-group">
                            <label class="form-label">From Email</label>
                            <input type="email" class="form-input" value="noreply@beautyfind.com">
                        </div>
                        <div class="form-group">
                            <label class="flex items-center">
                                <input type="checkbox" class="form-checkbox mr-2">
                                Enable price alert emails
                            </label>
                        </div>
                        <button type="submit" class="btn-accent">Save Settings</button>
                    </form>
                </div>
                
                <!-- Security Settings -->
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 class="text-lg font-semibold text-primary mb-4">Security Settings</h3>
                    <form class="admin-form">
                        <div class="form-group">
                            <label class="flex items-center">
                                <input type="checkbox" class="form-checkbox mr-2" checked>
                                Require email verification for new accounts
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="flex items-center">
                                <input type="checkbox" class="form-checkbox mr-2">
                                Enable two-factor authentication
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Session Timeout (minutes)</label>
                            <input type="number" class="form-input" value="60">
                        </div>
                        <button type="submit" class="btn-accent">Save Settings</button>
                    </form>
                </div>
            </div>
        `;
  }

  // Product Review Modal
  reviewProduct(productId) {
    const product = this.pendingProducts.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('reviewModal');
    const content = document.getElementById('reviewContent');

    content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg mb-4">
                    <div class="space-y-3">
                        <div>
                            <label class="text-sm font-medium text-gray-600">Source URL</label>
                            <a href="${product.sourceUrl}" target="_blank" class="block text-accent hover:underline text-sm">${product.sourceUrl}</a>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-600">Submitted By</label>
                            <p class="text-sm">${product.submittedBy}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-600">Submitted At</label>
                            <p class="text-sm">${new Date(product.submittedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <form id="reviewForm" class="admin-form">
                        <div class="form-group">
                            <label class="form-label">Product Name</label>
                            <input type="text" class="form-input" value="${product.name}" id="editName">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Brand</label>
                            <input type="text" class="form-input" value="${product.brand}" id="editBrand">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select class="form-select" id="editCategory">
                                <option value="skincare" ${product.category === 'skincare' ? 'selected' : ''}>Skincare</option>
                                <option value="makeup" ${product.category === 'makeup' ? 'selected' : ''}>Makeup</option>
                                <option value="haircare" ${product.category === 'haircare' ? 'selected' : ''}>Hair Care</option>
                                <option value="fragrance" ${product.category === 'fragrance' ? 'selected' : ''}>Fragrance</option>
                                <option value="tools" ${product.category === 'tools' ? 'selected' : ''}>Tools</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Price</label>
                            <input type="number" step="0.01" class="form-input" value="${product.price}" id="editPrice">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea class="form-textarea" id="editDescription">${product.description || ''}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Tags (comma-separated)</label>
                            <input type="text" class="form-input" value="${product.tags?.join(', ') || ''}" id="editTags">
                        </div>
                        
                        <div class="flex gap-3 mt-6">
                            <button type="button" onclick="adminDashboard.approveProductWithEdits('${productId}')" class="btn-approve flex-1">
                                Approve with Edits
                            </button>
                            <button type="button" onclick="adminDashboard.rejectProduct('${productId}')" class="btn-reject flex-1">
                                Reject
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  closeReviewModal() {
    document.getElementById('reviewModal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  approveProduct(productId) {
    const productIndex = this.pendingProducts.findIndex(
      (p) => p.id === productId,
    );
    if (productIndex === -1) return;

    // Move product to approved list
    const product = this.pendingProducts[productIndex];
    this.pendingProducts.splice(productIndex, 1);

    // Update UI
    this.showNotification(`${product.name} has been approved!`, 'success');
    this.updatePendingCount();
    this.loadSection('pending');
  }

  rejectProduct(productId) {
    const productIndex = this.pendingProducts.findIndex(
      (p) => p.id === productId,
    );
    if (productIndex === -1) return;

    const product = this.pendingProducts[productIndex];
    this.pendingProducts.splice(productIndex, 1);

    this.showNotification(`${product.name} has been rejected`, 'error');
    this.updatePendingCount();
    this.loadSection('pending');
    this.closeReviewModal();
  }

  approveProductWithEdits(productId) {
    // Get edited values
    const editedProduct = {
      name: document.getElementById('editName').value,
      brand: document.getElementById('editBrand').value,
      category: document.getElementById('editCategory').value,
      price: parseFloat(document.getElementById('editPrice').value),
      description: document.getElementById('editDescription').value,
      tags: document
        .getElementById('editTags')
        .value.split(',')
        .map((tag) => tag.trim()),
    };

    // Apply edits and approve
    this.approveProduct(productId);
    this.closeReviewModal();
  }

  updatePendingCount() {
    document.getElementById('pendingCount').textContent =
      this.pendingProducts.length;
  }

  // Chart initialization
  initializeCharts() {
    // Product Performance Chart
    const productCtx = document.getElementById('productChart');
    if (productCtx) {
      new Chart(productCtx, {
        type: 'bar',
        data: {
          labels: [
            'Fenty Foundation',
            'Rare Blush',
            'Glossier Cloud Paint',
            'Drunk Elephant Serum',
          ],
          datasets: [
            {
              label: 'Clicks',
              data: [120, 89, 76, 95],
              backgroundColor: '#D4AF37',
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // User Engagement Chart
    const userCtx = document.getElementById('userChart');
    if (userCtx) {
      new Chart(userCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Active Users',
              data: [65, 78, 82, 69, 91, 88, 76],
              borderColor: '#D4AF37',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  initializeAnalyticsCharts() {
    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
      new Chart(trafficCtx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => i + 1),
          datasets: [
            {
              label: 'Page Views',
              data: Array.from(
                { length: 30 },
                () => Math.floor(Math.random() * 1000) + 500,
              ),
              borderColor: '#D4AF37',
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
      new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
          labels: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Tools'],
          datasets: [
            {
              data: [30, 25, 20, 15, 10],
              backgroundColor: [
                '#D4AF37',
                '#F8E1E7',
                '#EEC9B7',
                '#22223B',
                '#18181B',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  // Helper methods for generating sample data
  async generateSamplePendingProducts() {
    return [
      {
        id: 'pending_1',
        name: 'Tatcha The Water Cream',
        brand: 'Tatcha',
        category: 'skincare',
        price: 68,
        image:
          'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
        sourceUrl: 'https://www.sephora.com/product/tatcha-water-cream',
        submittedBy: 'user123@email.com',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'pending',
      },
      {
        id: 'pending_2',
        name: 'Glow Recipe Watermelon Glow Niacinamide Dew Drops',
        brand: 'Glow Recipe',
        category: 'skincare',
        price: 34,
        image:
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        sourceUrl:
          'https://www.ulta.com/p/watermelon-glow-niacinamide-dew-drops',
        submittedBy: 'beautylov3r@email.com',
        submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'pending',
      },
    ];
  }

  async generateSampleUsers() {
    return [
      {
        id: 'user_1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        joinedAt: new Date('2024-01-15'),
        wishlistCount: 12,
        status: 'active',
      },
      {
        id: 'user_2',
        name: 'Emma Wilson',
        email: 'emma.w@email.com',
        joinedAt: new Date('2024-02-01'),
        wishlistCount: 8,
        status: 'active',
      },
    ];
  }

  async generateSampleAnalytics() {
    return {
      revenue: 12340,
      pageViews: 24567,
      affiliateClicks: 3421,
      wishlistAdds: 1892,
    };
  }

  generateRecentActivity() {
    const activities = [
      {
        type: 'product_added',
        message: 'New product "Rare Beauty Blush" added to catalog',
        time: '2 hours ago',
      },
      {
        type: 'user_registered',
        message: 'New user Sarah Johnson registered',
        time: '4 hours ago',
      },
      {
        type: 'product_approved',
        message: 'Product "Glossier Cloud Paint" approved',
        time: '6 hours ago',
      },
      {
        type: 'affiliate_click',
        message: '5 new affiliate clicks on Fenty Foundation',
        time: '8 hours ago',
      },
    ];

    return activities
      .map(
        (activity) => `
            <div class="flex items-center p-3 border border-gray-200 rounded-lg">
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">${activity.message}</p>
                    <p class="text-xs text-gray-500">${activity.time}</p>
                </div>
            </div>
        `,
      )
      .join('');
  }

  generateTopProductsData() {
    const topProducts = [
      {
        name: 'Fenty Beauty Foundation',
        category: 'Makeup',
        clicks: 1234,
        conversions: 89,
        revenue: '$2,140',
      },
      {
        name: 'Drunk Elephant Serum',
        category: 'Skincare',
        clicks: 987,
        conversions: 67,
        revenue: '$1,890',
      },
      {
        name: 'Rare Beauty Blush',
        category: 'Makeup',
        clicks: 856,
        conversions: 54,
        revenue: '$1,420',
      },
      {
        name: 'Olaplex Hair Treatment',
        category: 'Hair Care',
        clicks: 743,
        conversions: 43,
        revenue: '$1,120',
      },
    ];

    return topProducts
      .map(
        (product) => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.clicks.toLocaleString()}</td>
                <td>${product.conversions}</td>
                <td class="font-semibold text-accent">${product.revenue}</td>
            </tr>
        `,
      )
      .join('');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert ${type} fixed top-4 right-4 z-50 min-w-80`;
    notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 hover:opacity-70">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  showAddCategoryModal() {
    // Implementation for adding new categories
    this.showNotification(
      'Add category functionality would be implemented here',
      'info',
    );
  }
}

// Initialize the admin dashboard
const adminDashboard = new AdminDashboard();
