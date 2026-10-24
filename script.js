// پشتیبانی از ۳ زبان: 'fa', 'en', 'ar'
let currentLang = 'fa';

function toggleLanguage() {
    const htmlRoot = document.getElementById('htmlRoot');
    const langText = document.getElementById('langText');
    const translatableElements = document.querySelectorAll('[data-fa]');

    if (currentLang === 'fa') {
        currentLang = 'en';
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        langText.innerText = 'العربية';
    } else if (currentLang === 'en') {
        currentLang = 'ar';
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
        langText.innerText = 'فارسی';
    } else {
        currentLang = 'fa';
        htmlRoot.setAttribute('lang', 'fa');
        htmlRoot.setAttribute('dir', 'rtl');
        langText.innerText = 'English';
    }

    // تغییر متن تمام المان‌ها براساس زبان انتخابی
    translatableElements.forEach(el => {
        const newText = el.getAttribute(`data-${currentLang}`);
        if (newText) {
            if (el.children.length > 0 && el.querySelector('i')) {
                // حفظ آیکون‌ها در صورت وجود
                const icon = el.querySelector('i').outerHTML;
                el.innerHTML = newText + ' ' + icon;
            } else {
                el.innerText = newText;
            }
        }
    });
}

// منوی موبایل
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});