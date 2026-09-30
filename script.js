// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// Bilingual Language Switcher (Persian / English)
let currentLang = 'fa';

function toggleLanguage() {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    const htmlRoot = document.getElementById('htmlRoot');
    const langText = document.getElementById('langText');

    if (currentLang === 'en') {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        langText.textContent = 'فارسی';
    } else {
        htmlRoot.setAttribute('lang', 'fa');
        htmlRoot.setAttribute('dir', 'rtl');
        langText.textContent = 'English';
    }

    // Translate all elements with data-fa and data-en
    document.querySelectorAll('[data-fa][data-en]').forEach(el => {
        if (currentLang === 'en') {
            el.textContent = el.getAttribute('data-en');
        } else {
            el.textContent = el.getAttribute('data-fa');
        }
    });

    // Translate placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        if (currentLang === 'en') {
            if (input.getAttribute('id') === 'name') input.setAttribute('placeholder', 'Full Name / Company Name...');
            if (input.getAttribute('id') === 'email') input.setAttribute('placeholder', 'Email or Phone...');
            if (input.getAttribute('id') === 'message') input.setAttribute('placeholder', 'Describe your project or requirement...');
        } else {
            if (input.getAttribute('id') === 'name') input.setAttribute('placeholder', 'نام و نام خانوادگی / نام شرکت...');
            if (input.getAttribute('id') === 'email') input.setAttribute('placeholder', 'ایمیل یا شماره تماس...');
            if (input.getAttribute('id') === 'message') input.setAttribute('placeholder', 'شرح درخواست یا پروژه...');
        }
    });
}

// Contact Form Handler Simulation
function handleFormSubmit(event) {
    event.preventDefault();
    const successMsg = document.getElementById('formSuccess');
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        successMsg.style.display = 'none';
    }, 4000);
}