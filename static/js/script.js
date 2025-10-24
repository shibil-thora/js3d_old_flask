// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Calculator functionality
async function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultDisplay = document.getElementById('result');
    
    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Please enter valid numbers', 'error');
        return;
    }
    
    // Show loading state
    resultDisplay.innerHTML = '<div class="loading"></div><span>Calculating...</span>';
    resultDisplay.className = 'result-display';
    
    try {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num1: num1,
                num2: num2,
                operation: operation
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showResult(`Result: ${data.result}`, 'success');
        } else {
            showResult(`Error: ${data.error}`, 'error');
        }
    } catch (error) {
        showResult('Network error. Please try again.', 'error');
    }
}

function showResult(message, type) {
    const resultDisplay = document.getElementById('result');
    const iconClass = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    const iconColor = type === 'success' ? '#10b981' : '#ef4444';
    
    resultDisplay.innerHTML = `
        <i class="${iconClass}" style="color: ${iconColor}"></i>
        <span>${message}</span>
    `;
    resultDisplay.className = `result-display has-result ${type}`;
}

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        
    } catch (error) {
        showMessage('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert message after contact form
    contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .calculator-card, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// API data loading example
async function loadApiData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log('API Data loaded:', data);
        
        // You can use this data to populate dynamic content
        // For example, update a data display section
        updateDataDisplay(data);
    } catch (error) {
        console.error('Failed to load API data:', error);
    }
}

function updateDataDisplay(data) {
    // Example of how to use the API data
    // This could update a section with dynamic content
    const dataSection = document.querySelector('.data-display');
    if (dataSection) {
        dataSection.innerHTML = `
            <h3>${data.message}</h3>
            <ul>
                ${data.data.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p><small>Last updated: ${new Date(data.timestamp).toLocaleString()}</small></p>
        `;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if you add a search feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if it exists
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.email.trim()) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message.trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Modern Web App initialized');
    
    // Load API data on page load
    loadApiData();
    
    // Add any other initialization code here
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
