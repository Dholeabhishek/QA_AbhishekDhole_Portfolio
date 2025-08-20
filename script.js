// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('rk-theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    if (body.classList.contains('light')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
        localStorage.setItem('rk-theme', 'light');
    } else {
        localStorage.setItem('rk-theme', '');
    }
    updateThemeIcon();
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close nav when link clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animate Skill Progress Bars
function animateSkills() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    skillProgress.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Trigger skill animation when section visible
const skillSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
skillObserver.observe(skillSection);

// Contact Form Validation (basic)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    // Simulate form submission
    alert('Thank you! Your message has been sent.');
    contactForm.reset();
});
