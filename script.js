// Global config object
let config = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
});

// Load configuration from JSON
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        initializeWebsite();
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// Initialize website with config data
function initializeWebsite() {
    populateHero();
    populateAbout();
    populateBenefits();
    populateServices();
    populateExpertise();
    populateGallery();
    populateEvents();
    populateSocial();
    populateTestimonials();
    populateContact();
    updateFooterYear();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeMobileMenu();
    showUpcomingEventNotification();
}

// Populate Hero Section
function populateHero() {
    const hero = config.hero;
    document.querySelector('.hero__title').textContent = hero.title;
    document.querySelector('.hero__subtitle').textContent = hero.subtitle;
    document.querySelector('.hero__quote').innerHTML = hero.quote;
    document.querySelector('.hero').style.backgroundImage = `linear-gradient(rgba(245, 238, 220, 0.9), rgba(255, 255, 255, 0.95)), url('${hero.backgroundImage}')`;
}

// Populate About Section
function populateAbout() {
    const about = config.about;
    document.querySelector('#about .section__title').textContent = about.title;
    
    const intro = document.querySelector('.about__intro');
    intro.textContent = about.intro;
    
    const cards = document.querySelector('.about__cards');
    cards.innerHTML = about.cards.map(card => `
        <div class="about__card">
            <h3 class="about__card-title">${card.title}</h3>
            <p>${card.content}</p>
        </div>
    `).join('');
    
    const highlights = document.querySelector('.about__highlights');
    highlights.innerHTML = about.highlights.map(highlight => `
        <div class="about__highlight">
            <span class="about__highlight-number">${highlight.number}</span>
            <span class="about__highlight-text">${highlight.text}</span>
        </div>
    `).join('');
}

// Populate Benefits Section
function populateBenefits() {
    const benefits = config.benefits;
    document.querySelector('.benefits .section__title').textContent = benefits.title;
    
    const grid = document.querySelector('.benefits__grid');
    grid.innerHTML = benefits.items.map(item => `
        <div class="benefit">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// Populate Services Section
function populateServices() {
    const services = config.services;
    document.querySelector('#services .section__title').textContent = services.title;
    
    const grid = document.querySelector('.services__grid');
    grid.innerHTML = services.items.map(item => `
        <article class="service">
            <h3 class="service__title">${item.title}</h3>
            <p class="service__description">${item.description}</p>
        </article>
    `).join('');
}

// Populate Expertise Section
function populateExpertise() {
    const expertise = config.expertise;
    document.querySelector('.expertise .section__title').textContent = expertise.title;
    
    const list = document.querySelector('.expertise__list');
    list.innerHTML = expertise.items.map(item => `
        <div class="expertise__item">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// Populate Gallery Section
function populateGallery() {
    const gallery = config.gallery;
    document.getElementById('galleryTitle').textContent = gallery.title;
    const grid = document.getElementById('galleryGrid');
    
    gallery.images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery__item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery__overlay';
        overlay.innerHTML = `<p class="gallery__description">${image.description}</p>`;
        
        img.onerror = function() {
            galleryItem.style.display = 'none';
        };
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        grid.appendChild(galleryItem);
        
        setTimeout(() => {
            galleryItem.classList.add('fade-in');
        }, index * 100);
    });
}

// Populate Events Section
function populateEvents() {
    const events = config.events;
    document.getElementById('eventsTitle').textContent = events.title;
    
    const visibleEvents = events.items.filter(event => event.isVisible);
    const list = document.getElementById('eventsList');
    const toggleBtn = document.getElementById('eventsToggle');
    
    let showAll = false;
    const initialCount = 3;
    
    function renderEvents() {
        const eventsToShow = showAll ? visibleEvents : visibleEvents.slice(0, initialCount);
        
        list.innerHTML = eventsToShow.map(event => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate > new Date();
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            return `
                <div class="event ${isUpcoming ? 'event--upcoming' : ''}">
                    <div class="event__badge">${event.type}</div>
                    <div class="event__content">
                        <h3 class="event__title">${event.title}</h3>
                        <div class="event__details">
                            <div class="event__detail">
                                <span>📅</span> ${formattedDate}
                            </div>
                            <div class="event__detail">
                                <span>⏰</span> ${event.time}
                            </div>
                            <div class="event__detail">
                                <span>📍</span> ${event.location}
                            </div>
                        </div>
                        <p class="event__description">${event.description}</p>
                    </div>
                    <div class="event__price">${event.price}</div>
                </div>
            `;
        }).join('');
        
        toggleBtn.textContent = showAll ? 'Show Less' : `Show More Events (${visibleEvents.length - initialCount} more)`;
        toggleBtn.style.display = visibleEvents.length <= initialCount ? 'none' : 'inline-block';
    }
    
    renderEvents();
    
    toggleBtn.addEventListener('click', () => {
        showAll = !showAll;
        renderEvents();
    });
}

// Populate Social Media Section
function populateSocial() {
    const social = config.social;
    document.getElementById('socialTitle').textContent = social.title;
    
    const content = document.getElementById('socialContent');
    content.innerHTML = `
        <p class="social__description">${social.instagram.description}</p>
        <div class="social__instagram">
            <div class="social__handle">${social.instagram.handle}</div>
            <a href="${social.instagram.url}" target="_blank" class="social__cta">
                Follow us on Instagram
            </a>
        </div>
    `;
}

// Populate Testimonials Section
function populateTestimonials() {
    const testimonials = config.testimonials;
    document.getElementById('testimonialsTitle').textContent = testimonials.title;
    
    const grid = document.getElementById('testimonialsGrid');
    grid.innerHTML = testimonials.items.map(item => `
        <div class="testimonial">
            <p class="testimonial__text">"${item.text}"</p>
            <div class="testimonial__author">${item.name}</div>
            <div class="testimonial__rating">${'★'.repeat(item.rating)}</div>
        </div>
    `).join('');
}

// Populate Contact Section
function populateContact() {
    const contact = config.contact;
    document.querySelector('#contact .section__title').textContent = contact.title;
    document.querySelector('.contact__info p').textContent = contact.description;
    
    const methods = document.querySelector('.contact__methods');
    methods.innerHTML = `
        <a href="tel:${contact.phone}" class="contact__method">
            <span>📞</span> ${contact.phone}
        </a>
        <a href="mailto:${contact.email}" class="contact__method">
            <span>✉️</span> ${contact.email}
        </a>
        <a href="https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(contact.whatsapp.message)}" target="_blank" class="contact__method contact__method--whatsapp">
            <span>💬</span> WhatsApp
        </a>
    `;
    
    const actions = document.querySelector('.contact__actions');
    actions.innerHTML = `
        <a href="mailto:${contact.email}?subject=Yoga%20Session%20Booking" class="btn btn--primary">Book Session</a>
        <a href="mailto:${contact.email}?subject=Yoga%20Inquiry" class="btn btn--secondary">Send Query</a>
    `;
}

// Update footer year
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Yoga with Rashmi. All rights reserved. | Built by <a href="https://github.com/ddjain" target="_blank" style="color: #F28B82; text-decoration: none;">ddjain</a>`;
    }
}

// Show upcoming event notification
function showUpcomingEventNotification() {
    const events = config.events;
    const upcomingEvent = events.items.find(event => {
        if (!event.isVisible) return false;
        const eventDate = new Date(event.date);
        const today = new Date();
        const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        return daysDiff > 0 && daysDiff <= 7; // Show for events within next 7 days
    });
    
    if (upcomingEvent) {
        const eventDate = new Date(upcomingEvent.date);
        const daysDiff = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
        
        setTimeout(() => {
            showToaster(
                `Upcoming: ${upcomingEvent.title}`,
                `${daysDiff} day${daysDiff > 1 ? 's' : ''} to go! ${upcomingEvent.date} at ${upcomingEvent.time}`
            );
        }, 2000);
    }
}

// Show toaster notification
function showToaster(title, message) {
    const toaster = document.getElementById('eventToaster');
    const titleEl = toaster.querySelector('.toaster__title');
    const messageEl = toaster.querySelector('.toaster__message');
    const closeBtn = toaster.querySelector('.toaster__close');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    toaster.classList.add('show');
    
    // Auto hide after 8 seconds
    const autoHide = setTimeout(() => {
        toaster.classList.remove('show');
    }, 8000);
    
    // Close button functionality
    closeBtn.onclick = () => {
        toaster.classList.remove('show');
        clearTimeout(autoHide);
    };
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('nav__menu--active');
        this.textContent = navMenu.classList.contains('nav__menu--active') ? '✕' : '☰';
    });
    
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
            navToggle.textContent = '☰';
        });
    });
}
