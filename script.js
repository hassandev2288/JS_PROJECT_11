document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // MOBILE MENU FUNCTIONALITY (Enhanced with Animation)
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.querySelector('.overlay');
    const mnav = document.querySelector('.mnav');

    function openMenu() {
        if (!mobileMenu || !overlay) return;
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
        if (!mobileMenu || !overlay) return;
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (mnav) mnav.style.display = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ======================
    // HEADER SCROLL EFFECT
    // ======================
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
            if (mnav) mnav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ======================
    // PRODUCT FILTER FUNCTIONALITY
    // ======================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    console.log('Found filter buttons:', filterBtns.length);
    console.log('Found product items:', productItems.length);

    if (filterBtns.length && productItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                console.log('Filter button clicked:', this.getAttribute('data-filter'));
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                productItems.forEach(item => {
                    item.style.display = 'none';
                });

                if (filter === 'all') {
                    console.log('Showing all products');
                    productItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    const filteredItems = Array.from(productItems).filter(item =>
                        item.getAttribute('data-category') === filter
                    );
                    console.log(`Showing ${filteredItems.length} items for filter: ${filter}`);
                    filteredItems.forEach((item, index) => {
                        if (index < 5) {
                            item.style.display = 'block';
                        }
                    });
                }

                if (window.innerWidth < 768) {
                    const productsGrid = document.querySelector('#productContainer');
                    if (productsGrid) {
                        window.scrollTo({
                            top: productsGrid.offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        console.log('Initializing: Showing all products');
        productItems.forEach(item => {
            item.style.display = 'block';
        });
    } else {
        console.error('Filter buttons or product items not found');
    }

    // ======================
    // CART FUNCTIONALITY
    // ======================
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    if (addToCartBtns.length && cartCount) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function () {
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
        anchor.addEventListener('click', function (e) {
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
    });

    // ======================
    // MOBILE PRODUCT TAP BEHAVIOR
    // ======================
    if (window.innerWidth <= 768) {
        const productLinks = document.querySelectorAll('.as-product-card, .as-product-card a');
        productLinks.forEach(link => {
            let tappedOnce = false;

            link.addEventListener('click', function (e) {
                if (!tappedOnce) {
                    e.preventDefault();
                    this.classList.add('show-info');
                    tappedOnce = true;

                    setTimeout(() => {
                        tappedOnce = false;
                        this.classList.remove('show-info');
                    }, 2000);
                } else {
                    if (this.tagName.toLowerCase() === 'a') {
                        window.location.href = this.href;
                    } else {
                        const anchor = this.querySelector('a');
                        if (anchor) window.location.href = anchor.href;
                    }
                }
            });
        });
    }

    // ======================
    // PRODUCT DETAILS FUNCTIONALITY
    // ======================
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('Product ID from URL:', id);

    const products = {

        '17-HEAVY-DUTY': {
            name: 'SOLID CREAM EMARATI',
            image: 'Home_IMAGES/Home_p2.png',
            description: 'Achieve a flawless shine with the 17” Discolux Polishing Pad.Designed for smooth, streak-free finishing on all surfaces.Durable, efficient, and perfect for professional polishing results'
            ,
            price: 'PKR 9500'
        },
        'global': {
            name: 'GLOBAL MASTIC 28kG',
            image: 'Home_IMAGES/Global mastic full.png',
            description: 'Premium 28kg mastic adhesive for superior stone and marble bonding.',
            price: 'UAE --'
        },
        'glue': {
            name: 'SOLID CREAM EMARATI',
            image: 'Home_IMAGES/Emarati_full.png',
            description: 'High-strength adhesive for quick and durable marble installation.',
            price: 'UAE --'
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

    const whatsappLink = document.getElementById('whatsapp-link');
    const instagramLink = document.getElementById('instagram-link');
    const gmailLink = document.getElementById('gmail-link');
    const productDetail = document.getElementById('product-detail');

    console.log('WhatsApp link element:', whatsappLink);
    console.log('Instagram link element:', instagramLink);
    console.log('Gmail link element:', gmailLink);
    console.log('Product detail element:', productDetail);

    if (id && products[id]) {
        const p = products[id];
        console.log('Product found:', p);

        // Update product details
        document.getElementById('product-image').src = p.image;
        document.getElementById('product-image').alt = p.name;
        document.getElementById('product-name').textContent = p.name;
        document.getElementById('product-description').textContent = p.description;
        document.getElementById('product-price').textContent = p.price;

        // Construct the message for sharing
        const msg = `Hi, I want to order ${p.name}\nHere is the product: https://jesralseyouh.com/${p.image}`;

        // Set WhatsApp link
        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/+923042862288?text=${encodeURIComponent(msg)}`;
            whatsappLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('WhatsApp link clicked:', whatsappLink.href);
                alert('Opening WhatsApp with order details: ' + p.name);
                window.location.href = whatsappLink.href; // Force redirect
            });
        } else {
            console.error('WhatsApp link element not found');
        }

        // Set Instagram link
        if (instagramLink) {
            instagramLink.href = 'https://www.instagram.com/jesralseyouh/';
            instagramLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Instagram link clicked:', instagramLink.href);
                alert('Please send us a DM on Instagram with your order details: ' + p.name);
                window.open(instagramLink.href, '_blank'); // ✅ Opens Instagram in a new tab
            });
        }

        else {
            console.error('Instagram link element not found');
        }

        // Set Gmail link
        if (gmailLink) {
            gmailLink.href = `mailto:jesralseyouhh@gmail.com?subject=Order for ${encodeURIComponent(p.name)}&body=${encodeURIComponent(msg)}`;
            gmailLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Gmail link clicked:', gmailLink.href);
                alert('Opening email client with order details: ' + p.name);
                window.location.href = gmailLink.href; // Force redirect
                // Fallback for devices without email client
                setTimeout(() => {
                    alert('If your email client did not open, please email jesralseyouhh@gmail.com with your order details: ' + p.name);
                }, 1000);
            });
        }

        else {
            console.error('Gmail link element not found');
        }
    } else if (productDetail) {
        console.error('Product not found for ID:', id);
        productDetail.innerHTML = `
            <h2>Product not found</h2>
            <a href="index.html#products" class="btn btn-warning mt-4">⬅ Back</a>
        `;
    } else {
        console.error('Product detail element not found');
    }

    // ======================
    // SLIDER FUNCTIONALITY
    // ======================
    const sliderCards = document.querySelectorAll('.slider-card');
    if (sliderCards.length) {
        let currentSlide = 0;

        function showSlide(index) {
            sliderCards.forEach(card => card.classList.remove('active'));
            sliderCards[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % sliderCards.length;
            showSlide(currentSlide);
        }

        setInterval(nextSlide, 4000);
        showSlide(currentSlide);
    }
});

function redirectToPage() {
    var select = document.getElementById("product-search");
    var url = select.value;
    if (url) {
        window.location.href = url; // Redirect to the selected page
    }
}






