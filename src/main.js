// Import CSS
import './style.css';

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You need to replace this with your actual EmailJS public key
})();

// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navigation scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);

            // Close mobile menu after clicking a link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.stat-item, .content-item, .curriculum-module, .testimonial-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check required fields
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const phone = this.querySelector('input[name="phone"]').value.trim();

            if (!name || !email || !phone) {
                alert('אנא מלא את כל השדות הנדרשים: שם מלא, כתובת דוא"ל ומספר טלפון');
                return;
            }

            // Prepare form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                position: formData.get('position') || 'לא צוין',
                expectations: formData.get('expectations') || 'לא צוין'
            };

            // Send email
            sendRegistrationEmail(data);
        });
    }

    // Handle other forms
    const otherForms = document.querySelectorAll('.form:not(#registrationForm)');
    otherForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formType = 'contact';

            // Show success message (in a real app, this would send data to a server)
            showSuccessMessage(formType);

            // Reset form
            this.reset();
        });
    });

    function showSuccessMessage(type) {
        const message = type === 'registration' 
            ? 'תודה על הרשמתך! ניצור איתך קשר בקרוב עם פרטי הקורס.'
            : 'תודה על פנייתך! נחזור אליך תוך 24 שעות.';
            
        // Create and show success popup
        const popup = document.createElement('div');
        popup.className = 'success-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-icon">✅</div>
                <h3>הצלחה!</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">סגור</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Neural network animation enhancement
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((node, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            node.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroMainTitle = document.querySelector('.hero-title-main');
        if (heroMainTitle) {
            const originalText = heroMainTitle.textContent;
            typeWriter(heroMainTitle, originalText, 80);
        }
    }, 1000);

    // Add counter animation for stats
    function animateCounter(element, target, duration = 2000, isPercentage = false) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            if (start < target) {
                start += increment;
                if (target === Infinity) {
                    element.textContent = '∞';
                } else {
                    element.textContent = Math.ceil(start) + (isPercentage ? '%' : '');
                }
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = (target === Infinity ? '∞' : target) + (isPercentage ? '%' : '');
            }
        }
        updateCounter();
    }

    // Trigger counter animations when stats come into view
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('h3');
                const targetValue = statElement.textContent;
                
                if (targetValue === '∞') {
                    statElement.textContent = '∞';
                } else {
                    const isPercentage = targetValue.includes('%');
                    const numericValue = parseInt(targetValue);
                    animateCounter(statElement, numericValue, 2000, isPercentage);
                }
                
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statObserver.observe(stat);
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Function to send registration email
function sendRegistrationEmail(data) {
    // Show loading state
    const submitButton = document.querySelector('#registrationForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'מעביר לתשלום...';
    submitButton.disabled = true;

    // Log the registration data (you can check browser console)
    console.log('Registration data:', data);

    // For now, just redirect to payment page
    // In production, you'll need to set up EmailJS or a backend service to send emails
    setTimeout(() => {
        // Show success message
        alert('תודה על הרשמתך! מעביר אותך לעמוד התשלום...');

        // Reset form
        document.getElementById('registrationForm').reset();

        // Redirect to payment page
        window.location.href = 'https://payments.payplus.co.il/36b25027-8b92-41e4-8ba4-5a28e5498add';
    }, 1000);
}

// Add CSS for success popup
const popupStyles = `
    .success-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        animation: popupFadeIn 0.3s ease forwards;
    }

    .popup-content {
        background: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        animation: popupScaleIn 0.3s ease forwards 0.1s;
        direction: rtl;
    }

    .popup-icon {
        font-size: 48px;
        margin-bottom: 20px;
    }

    .popup-content h3 {
        font-size: 24px;
        font-weight: 600;
        color: #1d1d1f;
        margin-bottom: 16px;
    }

    .popup-content p {
        color: #86868b;
        margin-bottom: 24px;
        line-height: 1.5;
    }

    .popup-content button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .popup-content button:hover {
        transform: translateY(-2px);
    }

    @keyframes popupFadeIn {
        to { opacity: 1; }
    }

    @keyframes popupScaleIn {
        to { transform: scale(1); }
    }
`;

// Inject popup styles
const styleSheet = document.createElement('style');
styleSheet.textContent = popupStyles;
document.head.appendChild(styleSheet);

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;