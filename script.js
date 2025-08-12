document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE MENU FUNCTIONALITY (Enhanced with Animation)
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    const mnav = document.querySelector('.mnav');

    if (!mobileMenuBtn) console.error('Mobile menu button not found');
    if (!mobileMenu) console.error('Mobile menu not found');

    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');

        // Animate menu items
        const items = mobileMenu.querySelectorAll('.mobile-nav li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = 'all 0.3s ease';
            }, index * 100);
        });

        if (mnav) mnav.style.display = 'none';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (mnav) mnav.style.display = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ======================
    // HEADER SCROLL EFFECT
    // ======================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
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
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');

                productCards.forEach(card => {
                    card.style.display =
                        filter === 'all' || card.getAttribute('data-category') === filter
                            ? 'block'
                            : 'none';
                });

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
        const appearOnScroll = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeElements.forEach(el => appearOnScroll.observe(el));
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
                closeMenu();
            }
        });
    }
    );
});

// ======================
// PRODUCT DETAILS FUNCTIONALITY
// ======================
function showmyproduct() {
    let elements = document.getElementsByClassName("same");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
    document.getElementById("onep").style.display = "block";
}

const products = {
    'cleaner': {
        name: '17” DISCOLUX POLISHING PAD',
        image: 'Product_images/cleaner.jpg',
        description: 'Premium polishing pad for marble and granite.',
        price: 'PKR 950'
    },
    'glue': {
        name: 'Marble Glue Fast Dry',
        image: 'Product_images/Anti_slip.jpg',
        description: 'Fast-drying marble glue for stone fixing.',
        price: 'PKR 580'
    },
    'cutter': {
        name: 'Professional Cutting Disc',
        image: 'Product_images/cutter.jpg',
        description: 'Durable cutting disc for all tile types.',
        price: 'PKR 750'
    },
    'tape': {
        name: 'Double-Sided Tape',
        image: 'Product_images/tape.jpg',
        description: 'Strong adhesive double-sided tape.',
        price: 'PKR 320'
    }
};

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id && products[id]) {
    const p = products[id];
    document.getElementById('product-image').src = p.image;
    document.getElementById('product-image').alt = p.name;
    document.getElementById('product-name').textContent = p.name;
    document.getElementById('product-description').textContent = p.description;
    document.getElementById('product-price').textContent = p.price;

    const msg = `Hi, I want to order ${p.name}\nHere is the product: https://yourwebsite.com/${p.image}`;
    document.getElementById('whatsapp-link').href = `https://wa.me/923211766422?text=${encodeURIComponent(msg)}`;
} else if (document.getElementById('product-detail')) {
    document.getElementById('product-detail').innerHTML = `
      <h2>Product not found</h2>
      <a href="index.html#products" class="btn btn-warning mt-4">⬅ Back</a>
    `;
}
// ======================
// MOBILE PRODUCT TAP BEHAVIOR
// ======================
if (window.innerWidth <= 768) {
    const productLinks = document.querySelectorAll('.product-card a');
    productLinks.forEach(link => {
        let tappedOnce = false;
        
        link.addEventListener('click', function(e) {
            if (!tappedOnce) {
                e.preventDefault(); // Stop going to product page
                this.parentElement.classList.add('show-info'); // Show hover-like effect
                tappedOnce = true;

                // Reset after 2 seconds if user doesn't click again
                setTimeout(() => {
                    tappedOnce = false;
                    this.parentElement.classList.remove('show-info');
                }, 2000);
            }
        });
    });
}
