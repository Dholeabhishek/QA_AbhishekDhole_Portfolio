// Modern Portfolio JavaScript with Gen-Z Features

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initTheme();
    this.initScrollEffects();
    this.initNavigation();
    this.initSkillBars();
    this.initContactForm();
    this.initScrollToTop();
    this.initAnimations();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.initMobileMenu();
      this.initExternalLinks();
    });

    // Window events
    window.addEventListener('scroll', () => {
      this.handleScroll();
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  // Initialize external links to ensure they work properly
  initExternalLinks() {
    // Handle project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = link.getAttribute('href');
        if (url && url !== '#') {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    });

    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = link.getAttribute('href');
        if (url && url !== '#') {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    });

    // Handle hero button links
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
      if (button.getAttribute('href') && button.getAttribute('href').startsWith('http')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(button.getAttribute('href'), '_blank', 'noopener,noreferrer');
        });
      }
    });
  }

  // Theme Management
  initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    // Theme toggle event listener
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    this.updateThemeIcon(newTheme);
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Navigation
  initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        this.closeMobileMenu();
      });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
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
  }

  // Mobile Menu
  initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // Scroll Effects
  initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });
  }

  handleScroll() {
    this.updateScrollToTop();
    this.animateSkillBars();
    this.animateOnScroll();
  }

  handleResize() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  // Skill Bars Animation
  initSkillBars() {
    this.skillBarsAnimated = false;
  }

  animateSkillBars() {
    if (this.skillBarsAnimated) return;

    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection && this.isElementInViewport(skillsSection)) {
      skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
        bar.classList.add('loaded');
      });
      this.skillBarsAnimated = true;
    }
  }

  // Contact Form
  initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(contactForm);
      });

      // Real-time validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });

        input.addEventListener('input', () => {
          this.clearFieldError(input);
        });
      });
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    this.clearFieldError(field);

    // Validation rules
    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      
      case 'text':
        if (!value) {
          errorMessage = `${field.placeholder} is required`;
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = `${field.placeholder} must be at least 2 characters`;
          isValid = false;
        }
        break;
      
      default:
        if (field.tagName === 'TEXTAREA') {
          if (!value) {
            errorMessage = 'Message is required';
            isValid = false;
          } else if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters';
            isValid = false;
          }
        }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    field.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
    
    // Create or update error message
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = '#ff6b6b';
      errorDiv.style.fontSize = '0.875rem';
      errorDiv.style.marginTop = '0.5rem';
      field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
    
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  handleFormSubmission(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;

    // Validate all fields
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Show success message
      this.showFormSuccess(form);
      
      // Reset form
      setTimeout(() => {
        form.reset();
        this.hideFormMessage(form);
      }, 3000);
    } else {
      // Show error message
      this.showFormError(form, 'Please correct the errors above');
    }
  }

  showFormSuccess(form) {
    this.showFormMessage(form, 'Message sent successfully! Thank you for reaching out.', 'success');
  }

  showFormError(form, message) {
    this.showFormMessage(form, message, 'error');
  }

  showFormMessage(form, message, type) {
    // Remove existing message
    this.hideFormMessage(form);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
      messageDiv.style.backgroundColor = 'rgba(76, 205, 196, 0.1)';
      messageDiv.style.color = '#4ecdc4';
      messageDiv.style.border = '1px solid rgba(76, 205, 196, 0.3)';
    } else {
      messageDiv.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
      messageDiv.style.color = '#ff6b6b';
      messageDiv.style.border = '1px solid rgba(255, 107, 107, 0.3)';
    }
    
    messageDiv.textContent = message;
    form.appendChild(messageDiv);
    
    // Animate in
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    setTimeout(() => {
      messageDiv.style.transition = 'all 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 10);
  }

  hideFormMessage(form) {
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  // Scroll to Top
  initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  updateScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  // Animations
  initAnimations() {
    // Add fade-in animation to elements as they come into view
    const animateElements = document.querySelectorAll('.card, .project-card, .skill-item, .experience-card');
    
    animateElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
    });
  }

  animateOnScroll() {
    const animateElements = document.querySelectorAll('.card, .project-card, .skill-item, .experience-card');
    
    animateElements.forEach(element => {
      if (this.isElementInViewport(element) && element.style.opacity === '0') {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Utility Functions
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Enhanced scroll detection for animations
  isElementPartiallyInViewport(el, threshold = 0.1) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.bottom - rect.top;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    
    return visibleHeight > (elementHeight * threshold);
  }

  // Smooth reveal animations for sections
  initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      section.style.transition = 'all 0.8s ease';
    });

    const revealSection = () => {
      sections.forEach(section => {
        if (this.isElementPartiallyInViewport(section, 0.2)) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', revealSection);
    revealSection(); // Run once on load
  }

  // Project card interactions
  initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Add hover sound effect (optional)
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });

      // Handle project links
      const projectLinks = card.querySelectorAll('.project-link');
      projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Add ripple effect
          this.createRippleEffect(e, link);
        });
      });
    });
  }

  // Create ripple effect for buttons
  createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Typing animation for hero text
  initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const text = heroTitle.innerHTML;
      heroTitle.innerHTML = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      
      setTimeout(typeWriter, 500);
    }
  }

  // Easter egg - Konami code
  initEasterEgg() {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let userInput = [];

    document.addEventListener('keydown', (e) => {
      userInput.push(e.code);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      
      if (userInput.join('') === konamiCode.join('')) {
        this.activateEasterEgg();
        userInput = [];
      }
    });
  }

  activateEasterEgg() {
    // Fun animation when Konami code is entered
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
    
    console.log('🎉 Easter egg activated! Thanks for exploring!');
  }
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes rainbow {
    0%, 100% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
  }
`;
document.head.appendChild(style);

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();

// Additional utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', function() {
  // Preload images
  const images = [
    'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/a63022a0-0f99-4c7f-8b6c-a08bd25d5803.png',
    'https://pplx-res.cloudinary.com/image/upload/v1748770581/pplx_project_search_images/4605af04d7935e1dfed0cd9d9194b5be11d1fa4c.jpg',
    'https://pplx-res.cloudinary.com/image/upload/v1753574447/pplx_project_search_images/0b6de585410399907517c54e5e3b76da3a0fc899.jpg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Initialize additional features
  portfolioApp.initSectionAnimations();
  portfolioApp.initProjectInteractions();
  portfolioApp.initEasterEgg();
  
  // Add loading animation completion
  document.body.classList.add('loaded');
});

// Performance optimization
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for lazy animation
  document.querySelectorAll('.card, .project-card, .skill-item, .experience-card').forEach(el => {
    observer.observe(el);
  });
}
