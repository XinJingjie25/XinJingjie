function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Smooth scrolling for navigation links
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId.includes('.html')) {
            window.location.href = targetId;
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }

        const navLinks = document.getElementById('nav-links');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

// Banner slideshow
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const slides = [
        'url("../img/slide1.jpg")',
        'url("../img/slide2.jpg")',
        'url("../img/slide3.jpg")'
    ];
    let currentSlide = 0;

    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('banner-slide');
        slideElement.style.backgroundImage = slide;
        if (index === 0) slideElement.classList.add('active');
        banner.appendChild(slideElement);
    });

    function changeSlide() {
        const slideElements = document.querySelectorAll('.banner-slide');
        slideElements[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slideElements[currentSlide].classList.add('active');
    }

    setInterval(changeSlide, 5000);
});

// Count-up animation for stats
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                const updateCount = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        clearInterval(updateCount);
                        count = target;
                    }
                    entry.target.textContent = Math.floor(count);
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
});

// Company intro slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.image-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const images = [
        '../img/intro1.jpg',
        '../img/intro2.jpg',
        '../img/intro3.jpg'
    ];
    let currentIndex = 0;

    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1} of Zhongshan Xinjingjie Hardware Co., Ltd facility`;
        img.classList.add('slide-image');
        if (index === 0) img.classList.add('active');
        img.onload = () => console.log(`Image loaded: ${src}`);
        img.onerror = () => console.error(`Image failed to load: ${src}`);
        slider.appendChild(img);
    });

    function updateSlider() {
        const slides = document.querySelectorAll('.slide-image');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }, 5000);
});

// Scroll animation for "Về chúng tôi" section
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(aboutSection);
});