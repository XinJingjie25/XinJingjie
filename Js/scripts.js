function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
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

        // Close menu after clicking a link
        const navLinks = document.getElementById('nav-links');
        const hamburger = document.querySelector('.hamburger');
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Banner slideshow
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const slides = [
        'url("./img/slide1.jpg")',
        'url("./img/slide2.jpg")',
        'url("./img/slide3.jpg")'
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

//buttom sản Phẩm animation
document.querySelector('.btn-product').addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    }
});

// Company intro slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.image-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const images = [
        './img/intro1.jpg',
        './img/certificate.png',
        './img/intro3.jpg'
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
// Customer visit
 document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.customer-visit-carousel');
    const container = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel() {
        const slidesPerView = window.innerWidth >= 768 ? 3 : 2;
        const maxIndex = slides.length - slidesPerView;
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex; // Giới hạn chỉ hiển thị số ảnh tối đa, không để khoảng trắng
        }
        container.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
    }

    function showSlide(index) {
        const slidesPerView = window.innerWidth >= 768 ? 3 : 2;
        const maxIndex = slides.length - slidesPerView;
        currentIndex = Math.max(0, Math.min(index, maxIndex)); // Loại bỏ vòng lặp, giới hạn index
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const slidesPerView = window.innerWidth >= 768 ? 3 : 2;
        const maxIndex = slides.length - slidesPerView;
        if (e.deltaY < 0) showSlide(currentIndex - 1);
        else showSlide(currentIndex + 1);
    });

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.pageX - container.offsetLeft;
        const diffX = startX - currentX;
        const slidesPerView = window.innerWidth >= 768 ? 3 : 2;
        const maxIndex = slides.length - slidesPerView;
        if (diffX > 50) showSlide(currentIndex + 1);
        else if (diffX < -50) showSlide(currentIndex - 1);
    });

    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);

    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
    });

    container.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].pageX;
        const diffX = startX - currentX;
        const slidesPerView = window.innerWidth >= 768 ? 3 : 2;
        const maxIndex = slides.length - slidesPerView;
        if (diffX > 50) showSlide(currentIndex + 1);
        else if (diffX < -50) showSlide(currentIndex - 1);
        startX = currentX;
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
});
const toggleButton = document.querySelector('.contact-toggle');
const contactList = document.querySelector('.contact-list');

// Hàm kiểm tra kích thước màn hình
function isMobile() {
    return window.innerWidth <= 768;
}

// Toggle chỉ áp dụng trên mobile
toggleButton.addEventListener('click', () => {
    if (isMobile()) {
        contactList.classList.toggle('active');
        toggleButton.classList.toggle('active');
    }
});

// Đảm bảo contact-list hiển thị trên desktop khi tải trang
if (!isMobile()) {
    contactList.classList.add('active');
}

// Cập nhật trạng thái khi thay đổi kích thước màn hình
window.addEventListener('resize', () => {
    if (!isMobile() && !contactList.classList.contains('active')) {
        contactList.classList.add('active');
    } else if (isMobile() && contactList.classList.contains('active')) {
        contactList.classList.remove('active');
    }
});

//Mặt hàng kinh doanh
        let slideIndex = 1;
        let timeout;
        const totalSlides = 9; // Number of unique slides

        function showSlides(n) {
            let wrapper = document.querySelector(".slides-wrapper");
            let dots = document.getElementsByClassName("dot");

            // Adjust slideIndex for looping
            if (n > totalSlides) {
                slideIndex = 1;
                wrapper.style.transition = "none";
                wrapper.style.transform = `translateX(0%)`;
                setTimeout(() => {
                    wrapper.style.transition = "transform 0.6s ease-in-out";
                    wrapper.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
                }, 50);
            } else if (n < 1) {
                slideIndex = totalSlides;
                wrapper.style.transition = "none";
                wrapper.style.transform = `translateX(-${totalSlides * 100}%)`;
                setTimeout(() => {
                    wrapper.style.transition = "transform 0.6s ease-in-out";
                    wrapper.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
                }, 50);
            } else {
                wrapper.style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
            }

            // Update dots
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            dots[(slideIndex - 1) % totalSlides].classList.add("active");

            clearTimeout(timeout);
            timeout = setTimeout(() => showSlides(slideIndex += 1), 3000);
        }

        function currentSlide(n) {
            slideIndex = n;
            showSlides(slideIndex);
        }

        showSlides(slideIndex);
   