document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Language Dropdown Toggle ---
    const currentLangBtn = document.getElementById('currentLangBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (currentLangBtn && langDropdown) {
        currentLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        window.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });
    }

    // --- Contact Form AJAX Submission (Prevents Formspree Redirect & Clears Form) ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // جلوگیری از رفتن به صفحه formspree

            const formData = new FormData(contactForm);
            
            // تغییر حالت دکمه در حین ارسال
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "در حال ارسال...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // نمایش پیام موفقیت
                    formSuccess.style.display = 'block';
                    // پاک کردن محتویات فرم
                    contactForm.reset();
                    
                    // مخفی کردن پیام بعد از 6 ثانیه
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 6000);
                } else {
                    alert('خطایی در ارسال پیام رخ داد. لطفاً مجدداً تلاش کنید.');
                }
            } catch (error) {
                alert('خطا در اتصال به سرور. لطفاً اینترنت خود را بررسی کنید.');
            } finally {
                // بازگردانی حالت دکمه
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});

// --- Multilingual Support Function ---
function selectLanguage(lang) {
    const htmlRoot = document.getElementById('htmlRoot');
    const langLabel = document.getElementById('langLabel');
    
    // Set Direction & Lang attribute
    if (lang === 'ar') {
        htmlRoot.setAttribute('dir', 'rtl');
        htmlRoot.setAttribute('lang', 'ar');
        langLabel.textContent = 'العربية';
    } else if (lang === 'en') {
        htmlRoot.setAttribute('dir', 'ltr');
        htmlRoot.setAttribute('lang', 'en');
        langLabel.textContent = 'English';
    } else {
        htmlRoot.setAttribute('dir', 'rtl');
        htmlRoot.setAttribute('lang', 'fa');
        langLabel.textContent = 'فارسی';
    }

    // Translate all elements having data attributes
    const translatableElements = document.querySelectorAll('[data-fa], [data-en], [data-ar]');
    
    translatableElements.forEach(el => {
        if (el.hasAttribute(`data-${lang}`)) {
            const text = el.getAttribute(`data-${lang}`);
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Close dropdown
    const langDropdown = document.getElementById('langDropdown');
    if (langDropdown) {
        langDropdown.classList.remove('show');
    }
}