// Product Management System - COMPLETE VERSION WITH RETAILER INFO
class ProductManager {
    constructor() {
        this.products = [];
        this.categories = ['skincare', 'makeup', 'haircare', 'fragrance', 'tools'];
        this.brands = ['fenty', 'rare', 'glossier', 'drunk-elephant', 'charlotte-tilbury'];
        this.supportedRetailers = ['sephora.com', 'ulta.com', 'amazon.com', 'target.com', 'cvs.com'];
        
        this.initializeSampleProducts();
    }

    // Initialize with sample products for demonstration - ALL PRICES IN USD
    initializeSampleProducts() {
        this.products = [
            {
                id: '1',
                name: 'Fenty Beauty Pro Filt\'r Soft Matte Longwear Foundation',
                brand: 'Fenty Beauty',
                category: 'makeup',
                price: 40,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
                description: 'Soft matte, longwear foundation with medium to full buildable coverage.',
                affiliateUrl: 'https://example.com/affiliate/fenty-foundation',
                retailer: 'Sephora',
                onSale: false,
                trending: true,
                rating: 4.5,
                reviewCount: 2847,
                dateAdded: new Date('2024-01-15'),
                tags: ['full-coverage', 'long-lasting', 'matte'],
                ingredients: ['Water', 'Dimethicone', 'Isododecane'],
                shades: 50,
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-fenty', price: 40 },
                    { name: 'Ulta', url: 'https://example.com/ulta-fenty', price: 42 },
                    { name: 'Amazon', url: 'https://example.com/amazon-fenty', price: 39 }
                ]
            },
            {
                id: '2',
                name: 'Rare Beauty Soft Pinch Liquid Blush',
                brand: 'Rare Beauty',
                category: 'makeup',
                price: 20,
                originalPrice: 25,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
                description: 'Weightless, long-lasting liquid blush that blends effortlessly.',
                affiliateUrl: 'https://example.com/affiliate/rare-blush',
                retailer: 'Sephora',
                onSale: true,
                trending: false,
                rating: 4.7,
                reviewCount: 1923,
                dateAdded: new Date('2024-02-01'),
                tags: ['liquid-blush', 'buildable', 'natural-finish'],
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-rare', price: 20 },
                    { name: 'Ulta', url: 'https://example.com/ulta-rare', price: 22 },
                    { name: 'Amazon', url: 'https://example.com/amazon-rare', price: 19 }
                ]
            },
            {
                id: '3',
                name: 'Glossier Cloud Paint Gel Cream Blush',
                brand: 'Glossier',
                category: 'makeup',
                price: 22,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
                description: 'Gel-cream blush that gives you a natural, dewy flush.',
                affiliateUrl: 'https://example.com/affiliate/glossier-cloud-paint',
                retailer: 'Glossier',
                onSale: false,
                trending: true,
                rating: 4.3,
                reviewCount: 1456,
                dateAdded: new Date('2024-01-20'),
                tags: ['gel-cream', 'dewy', 'natural'],
                retailers: [
                    { name: 'Glossier', url: 'https://example.com/glossier-direct', price: 22 },
                    { name: 'Sephora', url: 'https://example.com/sephora-glossier', price: 24 },
                    { name: 'Amazon', url: 'https://example.com/amazon-glossier', price: 21 }
                ]
            },
            {
                id: '4',
                name: 'Drunk Elephant C-Firma Day Serum',
                brand: 'Drunk Elephant',
                category: 'skincare',
                price: 80,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
                description: 'Potent vitamin C day serum that firms, brightens, and improves signs of photoaging.',
                affiliateUrl: 'https://example.com/affiliate/drunk-elephant-serum',
                retailer: 'Sephora',
                onSale: false,
                trending: false,
                rating: 4.2,
                reviewCount: 3421,
                dateAdded: new Date('2024-01-10'),
                tags: ['vitamin-c', 'brightening', 'anti-aging'],
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-de', price: 80 },
                    { name: 'Ulta', url: 'https://example.com/ulta-de', price: 82 },
                    { name: 'Amazon', url: 'https://example.com/amazon-de', price: 79 }
                ]
            },
            {
                id: '5',
                name: 'Charlotte Tilbury Pillow Talk Lipstick',
                brand: 'Charlotte Tilbury',
                category: 'makeup',
                price: 37,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1586495985854-1ae265eddbb4?w=400&h=400&fit=crop',
                description: 'Matte Revolution lipstick in the universally flattering Pillow Talk shade.',
                affiliateUrl: 'https://example.com/affiliate/charlotte-tilbury-lipstick',
                retailer: 'Ulta',
                onSale: false,
                trending: true,
                rating: 4.8,
                reviewCount: 5632,
                dateAdded: new Date('2024-02-10'),
                tags: ['matte', 'nude', 'long-lasting'],
                retailers: [
                    { name: 'Ulta', url: 'https://example.com/ulta-ct', price: 37 },
                    { name: 'Sephora', url: 'https://example.com/sephora-ct', price: 39 },
                    { name: 'Amazon', url: 'https://example.com/amazon-ct', price: 36 }
                ]
            },
            {
                id: '6',
                name: 'The Ordinary Niacinamide 10% + Zinc 1%',
                brand: 'The Ordinary',
                category: 'skincare',
                price: 7,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
                description: 'High-strength vitamin and mineral blemish formula.',
                affiliateUrl: 'https://example.com/affiliate/ordinary-niacinamide',
                retailer: 'Ulta',
                onSale: false,
                trending: false,
                rating: 4.1,
                reviewCount: 8945,
                dateAdded: new Date('2024-01-05'),
                tags: ['niacinamide', 'blemish-control', 'budget-friendly'],
                retailers: [
                    { name: 'Ulta', url: 'https://example.com/ulta-ordinary', price: 7 },
                    { name: 'Sephora', url: 'https://example.com/sephora-ordinary', price: 8 },
                    { name: 'Amazon', url: 'https://example.com/amazon-ordinary', price: 6 }
                ]
            },
            {
                id: '7',
                name: 'Olaplex No.3 Hair Perfector',
                brand: 'Olaplex',
                category: 'haircare',
                price: 30,
                originalPrice: 35,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
                description: 'At-home treatment that reduces breakage and strengthens all hair types.',
                affiliateUrl: 'https://example.com/affiliate/olaplex-no3',
                retailer: 'Sephora',
                onSale: true,
                trending: false,
                rating: 4.6,
                reviewCount: 12743,
                dateAdded: new Date('2024-02-15'),
                tags: ['hair-treatment', 'strengthening', 'bond-repair'],
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-olaplex', price: 30 },
                    { name: 'Ulta', url: 'https://example.com/ulta-olaplex', price: 32 },
                    { name: 'Amazon', url: 'https://example.com/amazon-olaplex', price: 29 }
                ]
            },
            {
                id: '8',
                name: 'Dyson Supersonic Hair Dryer',
                brand: 'Dyson',
                category: 'tools',
                price: 430,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
                description: 'Fast drying with no extreme heat to help protect hair from damage.',
                affiliateUrl: 'https://example.com/affiliate/dyson-supersonic',
                retailer: 'Ulta',
                onSale: false,
                trending: false,
                rating: 4.4,
                reviewCount: 2156,
                dateAdded: new Date('2024-01-30'),
                tags: ['hair-dryer', 'professional', 'heat-protection'],
                retailers: [
                    { name: 'Ulta', url: 'https://example.com/ulta-dyson', price: 430 },
                    { name: 'Sephora', url: 'https://example.com/sephora-dyson', price: 430 },
                    { name: 'Amazon', url: 'https://example.com/amazon-dyson', price: 425 }
                ]
            },
            {
                id: '9',
                name: 'Tatcha The Water Cream',
                brand: 'Tatcha',
                category: 'skincare',
                price: 68,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
                description: 'Oil-free pore-refining water cream that delivers pure hydration.',
                affiliateUrl: 'https://example.com/affiliate/tatcha-water-cream',
                retailer: 'Sephora',
                onSale: false,
                trending: true,
                rating: 4.3,
                reviewCount: 2847,
                dateAdded: new Date('2024-02-05'),
                tags: ['moisturizer', 'oil-free', 'hydrating'],
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-tatcha', price: 68 },
                    { name: 'Ulta', url: 'https://example.com/ulta-tatcha', price: 70 },
                    { name: 'Amazon', url: 'https://example.com/amazon-tatcha', price: 67 }
                ]
            },
            {
                id: '10',
                name: 'Urban Decay All Nighter Setting Spray',
                brand: 'Urban Decay',
                category: 'makeup',
                price: 33,
                originalPrice: 37,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
                description: 'Makeup setting spray that keeps makeup fresh for up to 16 hours.',
                affiliateUrl: 'https://example.com/affiliate/urban-decay-setting-spray',
                retailer: 'Ulta',
                onSale: true,
                trending: false,
                rating: 4.5,
                reviewCount: 7892,
                dateAdded: new Date('2024-01-25'),
                tags: ['setting-spray', 'long-lasting', 'makeup-finisher'],
                retailers: [
                    { name: 'Ulta', url: 'https://example.com/ulta-ud', price: 33 },
                    { name: 'Sephora', url: 'https://example.com/sephora-ud', price: 35 },
                    { name: 'Amazon', url: 'https://example.com/amazon-ud', price: 32 }
                ]
            },
            {
                id: '11',
                name: 'Glow Recipe Watermelon Glow Niacinamide Dew Drops',
                brand: 'Glow Recipe',
                category: 'skincare',
                price: 34,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
                description: 'Serum-highlighter hybrid with niacinamide for a dewy glow.',
                affiliateUrl: 'https://example.com/affiliate/glow-recipe-dew-drops',
                retailer: 'Sephora',
                onSale: false,
                trending: false,
                rating: 4.4,
                reviewCount: 1563,
                dateAdded: new Date('2024-02-08'),
                tags: ['serum', 'highlighter', 'niacinamide', 'glow'],
                retailers: [
                    { name: 'Sephora', url: 'https://example.com/sephora-glow', price: 34 },
                    { name: 'Ulta', url: 'https://example.com/ulta-glow', price: 36 },
                    { name: 'Amazon', url: 'https://example.com/amazon-glow', price: 33 }
                ]
            },
            {
                id: '12',
                name: 'Beautyblender Original Makeup Sponge',
                brand: 'Beautyblender',
                category: 'tools',
                price: 20,
                originalPrice: null,
                currency: 'USD',
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
                description: 'The original award-winning makeup sponge for flawless application.',
                affiliateUrl: 'https://example.com/affiliate/beautyblender-original',
                retailer: 'Ulta',
                onSale: false,
                trending: false,
                rating: 4.6,
                reviewCount: 15420,
                dateAdded: new Date('2024-01-12'),
                tags: ['makeup-sponge', 'blending', 'application-tool'],
                retailers: [
                    { name: 'Ulta', url: 'https://example.com/ulta-bb', price: 20 },
                    { name: 'Sephora', url: 'https://example.com/sephora-bb', price: 20 },
                    { name: 'Amazon', url: 'https://example.com/amazon-bb', price: 18 }
                ]
            }
        ];
    }

    // Format price with currency
    static formatPrice(price, currency = 'USD') {
        return `$${price} ${currency}`;
    }

    // Get filtered and sorted products
    static async getFilteredProducts(filters, sortBy, page = 1, perPage = 12) {
        const manager = new ProductManager();
        let filteredProducts = [...manager.products];

        // Apply filters
        if (filters.category) {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        
        if (filters.brand) {
            filteredProducts = filteredProducts.filter(p => 
                p.brand.toLowerCase().replace(/\s+/g, '-') === filters.brand ||
                p.brand === filters.brand
            );
        }
        
        if (filters.price) {
            const [min, max] = filters.price.includes('+') 
                ? [parseInt(filters.price), Infinity]
                : filters.price.split('-').map(Number);
            filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.tags.some(tag => tag.includes(searchTerm))
            );
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                default:
                    return b.reviewCount - a.reviewCount;
            }
        });

        // Pagination
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        
        return filteredProducts.slice(startIndex, endIndex);
    }

    // Get products by IDs (for wishlist/owned products)
    static async getProductsByIds(productIds) {
        const manager = new ProductManager();
        return manager.products.filter(p => productIds.includes(p.id));
    }

    // Search products by name/brand
    static async searchProducts(query) {
        const manager = new ProductManager();
        const searchTerm = query.toLowerCase();
        
        return manager.products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm) ||
            p.tags.some(tag => tag.includes(searchTerm))
        );
    }

    // Add product by URL (would integrate with scraping service)
    static async addProductByUrl(url) {
        // Validate supported retailer
        const manager = new ProductManager();
        const isSupported = manager.supportedRetailers.some(retailer => 
            url.includes(retailer)
        );
        
        if (!isSupported) {
            throw new Error('Retailer not supported. Supported retailers: ' + 
                manager.supportedRetailers.join(', '));
        }

        // In a real app, this would:
        // 1. Send URL to backend scraping service
        // 2. Extract product details (name, price, image, etc.)
        // 3. Add to pending approval queue
        // 4. Return status
        
        // For demo, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            status: 'pending',
            message: 'Product submitted for review. It will appear in the catalog once approved.',
            estimatedReviewTime: '24-48 hours'
        };
    }

    // Get product by ID
    static async getProductById(productId) {
        const manager = new ProductManager();
        return manager.products.find(p => p.id === productId);
    }

    // Get similar products (based on category/brand)
    static async getSimilarProducts(productId, limit = 4) {
        const manager = new ProductManager();
        const product = manager.products.find(p => p.id === productId);
        
        if (!product) return [];
        
        return manager.products
            .filter(p => 
                p.id !== productId && 
                (p.category === product.category || p.brand === product.brand)
            )
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Get trending products
    static async getTrendingProducts(limit = 8) {
        const manager = new ProductManager();
        return manager.products
            .filter(p => p.trending)
            .sort((a, b) => b.reviewCount - a.reviewCount)
            .slice(0, limit);
    }

    // Get sale products
    static async getSaleProducts(limit = 12) {
        const manager = new ProductManager();
        return manager.products
            .filter(p => p.onSale)
            .sort((a, b) => {
                const aDiscount = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                const bDiscount = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                return bDiscount - aDiscount;
            })
            .slice(0, limit);
    }

    // Get products by category
    static async getProductsByCategory(category, limit = 12) {
        const manager = new ProductManager();
        return manager.products
            .filter(p => p.category === category)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Get products by brand
    static async getProductsByBrand(brand, limit = 12) {
        const manager = new ProductManager();
        return manager.products
            .filter(p => p.brand.toLowerCase().replace(/\s+/g, '-') === brand ||
                         p.brand === brand)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Price tracking simulation
    static async trackPriceChanges(productId) {
        // In a real app, this would query price history from database
        const product = await this.getProductById(productId);
        if (!product) return null;

        // Simulate price history
        const priceHistory = [];
        const currentDate = new Date();
        
        for (let i = 30; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            
            // Simulate price fluctuations
            const basePrice = product.originalPrice || product.price;
            const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
            const price = Math.max(basePrice * (1 + variation), basePrice * 0.7);
            
            priceHistory.push({
                date: date.toISOString().split('T')[0],
                price: Math.round(price * 100) / 100
            });
        }

        return {
            productId,
            currentPrice: product.price,
            lowestPrice: Math.min(...priceHistory.map(p => p.price)),
            highestPrice: Math.max(...priceHistory.map(p => p.price)),
            priceHistory
        };
    }

    // Category and brand management
    static getCategories() {
        const manager = new ProductManager();
        return manager.categories.map(cat => ({
            value: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1')
        }));
    }

    static getBrands() {
        const manager = new ProductManager();
        return manager.brands.map(brand => ({
            value: brand,
            label: brand.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
        }));
    }

    static getSupportedRetailers() {
        const manager = new ProductManager();
        return manager.supportedRetailers;
    }

    // Get retailer information for a product
    static getRetailerInfo(productId) {
        const manager = new ProductManager();
        const product = manager.products.find(p => p.id === productId);
        return product ? product.retailers : [];
    }

    // Compare prices across retailers
    static async comparePrices(productId) {
        const product = await this.getProductById(productId);
        if (!product || !product.retailers) return null;

        const sortedRetailers = [...product.retailers].sort((a, b) => a.price - b.price);
        
        return {
            productId,
            productName: product.name,
            lowestPrice: sortedRetailers[0],
            highestPrice: sortedRetailers[sortedRetailers.length - 1],
            allRetailers: sortedRetailers,
            savings: sortedRetailers[sortedRetailers.length - 1].price - sortedRetailers[0].price
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
}

// Register event handlers after DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const signInLink = document.getElementById('signInLink');
        if (signInLink) signInLink.addEventListener('click', openSignInModal);

        const signUpLink = document.getElementById('signUpLink');
        if (signUpLink) signUpLink.addEventListener('click', openSignUpModal);

        document.querySelectorAll('[data-dashboard]').forEach(el => {
            el.addEventListener('click', () => app.openDashboard(el.dataset.dashboard));
        });

        document.querySelectorAll('[data-notification]').forEach(el => {
            el.addEventListener('click', () => app.showNotification(el.dataset.notification));
        });

        document.querySelectorAll('[data-category]').forEach(el => {
            el.addEventListener('click', () => app.filterByCategory(el.dataset.category));
        });

        const homeLink = document.getElementById('homeLink');
        if (homeLink) homeLink.addEventListener('click', clearFiltersAndShowAll);

        const startShoppingBtn = document.getElementById('startShoppingBtn');
        if (startShoppingBtn) startShoppingBtn.addEventListener('click', scrollToProducts);

        const howItWorksBtn = document.getElementById('howItWorksBtn');
        if (howItWorksBtn) howItWorksBtn.addEventListener('click', showDemo);

        const clearFiltersBtn = document.getElementById('clearFiltersBtn');
        if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);

        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMoreProducts);

        const closeWishlistModalBtn = document.getElementById('closeWishlistModalBtn');
        if (closeWishlistModalBtn) closeWishlistModalBtn.addEventListener('click', closeWishlistModal);

        const closeDashboardBtn = document.getElementById('closeDashboardBtn');
        if (closeDashboardBtn) closeDashboardBtn.addEventListener('click', closeDashboard);

        const logo = document.getElementById('logo');
        if (logo) logo.addEventListener('click', () => { window.location.href = 'index.html'; });
    });
}