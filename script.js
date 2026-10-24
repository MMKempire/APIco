let currentLang = 'fa';

function selectLanguage(lang) {
    currentLang = lang;
    const htmlRoot = document.getElementById('htmlRoot');
    const langLabel = document.getElementById('langLabel');
    const translatableElements = document.querySelectorAll('[data-fa]');

    // تنظیم زبان و جهت صفحه (RTL / LTR)
    if (lang === 'en') {
        htmlRoot.setAttribute('lang', 'en');
        htmlRoot.setAttribute('dir', 'ltr');
        langLabel.innerText = 'English';
    } else if (lang === 'ar') {
        htmlRoot.setAttribute('lang', 'ar');
        htmlRoot.setAttribute('dir', 'rtl');
        langLabel.innerText = 'العربية';
    } else {
        htmlRoot.setAttribute('lang', 'fa');
        htmlRoot.setAttribute('dir', 'rtl');
        langLabel.innerText = 'فارسی';
    }

    // جایگزینی متن‌ها براساس زبان انتخابی
    translatableElements.forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText) {
            if (el.children.length > 0 && el.querySelector('i')) {
                const icon = el.querySelector('i').outerHTML;
                el.innerHTML = newText + ' ' + icon;
            } else {
                el.innerText = newText;
            }
        }
    });

    // بستن منوی کشویی پس از انتخاب
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    // باز و بسته شدن منوی کشویی زبان
    const currentLangBtn = document.getElementById('currentLangBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (currentLangBtn && langDropdown) {
        currentLangBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // بستن منو با کلیک بیرون از آن
        document.addEventListener('click', () => {
            langDropdown.classList.remove('show');
        });
    }

    // منوی موبایل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
});