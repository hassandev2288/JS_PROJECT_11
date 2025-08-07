document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE MENU FUNCTIONALITY
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    const mnav = document.querySelector('.mnav');
    
    // Debugging checks
    if (!mobileMenuBtn) console.error('Mobile menu button not found - check HTML for .mobile-menu-btn');
    if (!mobileMenu) console.error('Mobile menu not found - check HTML for #mobileMenu');
    if (!mnav) console.warn('.mnav element not found - header may not hide properly');
    
    // Toggle menu function
    function toggleMobileMenu() {
        const isOpening = !mobileMenu.classList.contains('active');
        
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        // Toggle .mnav visibility
        if (mnav) {
            mnav.style.display = isOpening ? 'none' : '';
        }
    }
    
    // Event listeners for mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking on nav links
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // ======================
    // HEADER SCROLL EFFECT
    // ======================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ======================
    // PRODUCT FILTER FUNCTIONALITY
    // ======================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length && productCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Mobile-specific smooth scrolling
                if (window.innerWidth < 768) {
                    const productsGrid = document.querySelector('.products-grid');
                    if (productsGrid) {
                        window.scrollTo({
                            top: productsGrid.offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ======================
    // CART FUNCTIONALITY
    // ======================
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;
    
    if (addToCartBtns.length && cartCount) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                count++;
                cartCount.textContent = count;
                
                // Animation effect
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i>';
                }, 1000);
            });
        });
    }

    // ======================
    // SCROLL ANIMATIONS
    // ======================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length) {
        const appearOnScroll = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            appearOnScroll.observe(element);
        });
    }

    // ======================
    // SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Show .mnav again when closing via anchor link
                    if (mnav) {
                        mnav.style.display = '';
                    }
                }
            }
        });
    });
});

function showmyproduct() {
    // This returns a collection (array-like), so we need to loop through or access a specific item
    let elements = document.getElementsByClassName("same");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }

    // Get element by ID — DO NOT use "#" in getElementById
    document.getElementById("onep").style.display = "block";
}