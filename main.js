// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggles = document.querySelectorAll('#darkModeToggle, #mobileDarkModeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', currentTheme === 'dark');
    
    darkModeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', function() {
                html.classList.toggle('dark');
                const theme = html.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
                
                // Update all dark mode toggles
                const allToggles = document.querySelectorAll('#darkModeToggle, #mobileDarkModeToggle');
                allToggles.forEach(t => {
                    const moon = t.querySelector('.fa-moon');
                    const sun = t.querySelector('.fa-sun');
                    if (html.classList.contains('dark')) {
                        moon?.classList.add('hidden');
                        sun?.classList.remove('hidden');
                    } else {
                        moon?.classList.remove('hidden');
                        sun?.classList.add('hidden');
                    }
                });
            });
        }
    });

    // Language Selector with better UX
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // Update active state
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white');
                b.classList.add('hover:bg-gray-200', 'dark:hover:bg-gray-700');
            });
            this.classList.add('active', 'bg-primary', 'text-white');
            this.classList.remove('hover:bg-gray-200', 'dark:hover:bg-gray-700');
            
            if (window.i18n) {
                // Change language
                window.i18n.setLang(lang);
                
                // Show notification
                const messages = {
                    ar: 'تم تغيير اللغة إلى العربية ✅',
                    en: 'Language changed to English ✅',
                    fr: 'Langue changée en français ✅'
                };
                showNotification(messages[lang], 'success', 1500);
                
                // Trigger page update
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    el.textContent = window.i18n.t(el.dataset.i18n);
                });
            }
        });
    });

    // Typed.js Animation
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'منصتك الشاملة لجميع خدمات الأعراس في الجزائر',
                'نربط بين العرسان وأفضل مقدمي الخدمات',
                'احلمي... نحن نحقق لكِ حلمكِ',
                'زفافكِ في كليك واحد فقط'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('[data-count]');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const count = parseInt(counter.textContent);
            const increment = target / 100;
            
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(animateCounters, 20);
            } else {
                counter.textContent = target;
            }
        });
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('[data-count]');
    if (statsSection) {
        counterObserver.observe(statsSection.closest('section'));
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Anime.js Animations
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: index * 100,
                    easing: 'easeOutQuart'
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        cardObserver.observe(card);
    });

    // Animate hero elements
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-gradient',
        opacity: [0, 0.1],
        duration: 1500
    })
    .add({
        targets: 'h1',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800
    }, '-=1000')
    .add({
        targets: '.hero-gradient + div',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600
    }, '-=600')
    .add({
        targets: '.hero-gradient + div + p',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500
    }, '-=400');

    // Floating animation for decorative elements
    const floatingElements = document.querySelectorAll('.floating-animation');
    floatingElements.forEach((el, index) => {
        anime({
            targets: el,
            translateY: [-20, 20],
            duration: 3000 + (index * 500),
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button:not(:disabled)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                anime({
                    targets: this,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            }
        });
    });

    // Service card hover effects
    serviceCards.forEach(card => {
        const icon = card.querySelector('i');
        if (icon) {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: icon,
                    scale: 1.2,
                    rotate: '10deg',
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: icon,
                    scale: 1,
                    rotate: '0deg',
                    duration: 300,
                    easing: 'easeOutQuart'
                });
            });
        }
    });

    // Navigation active state
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[data-mobile-menu]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-gradient');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add smooth page transitions
    document.querySelectorAll('a').forEach(link => {
        if (link.href && !link.href.includes('#') && !link.href.includes('javascript')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href.startsWith('http') && !href.includes('welcome.html')) {
                    e.preventDefault();
                    anime({
                        targets: 'body',
                        opacity: [1, 0],
                        duration: 300,
                        complete: () => {
                            window.location.href = href;
                        }
                    });
                }
            });
        }
    });
}); // End of DOMContentLoaded event listener

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
    }
}

// Performance optimization
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ========================================
// i18n Language System (AR, EN, FR)
// ========================================
window.i18n = (function(){
    const translations = {
        ar: {
            // Welcome & Auth
            welcome_title: 'مرحبا بك في Wed in Click',
            welcome_sub: 'منصتك الشاملة لتنظيم الزواج في الجزائر',
            auth_title: 'تسجيل / تسجيل الدخول',
            auth_sub: 'أنشئ حساباً جديداً أو قم بتسجيل الدخول للمتابعة',
            privacy: 'باستمرار استخدام الموقع أنت توافق على شروط الخدمة وسياسة الخصوصية.',
            name: 'الاسم', email: 'البريد الإلكتروني', password: 'كلمة المرور',
            register: 'إنشاء حساب', login: 'تسجيل الدخول', logout: 'تسجيل الخروج',
            // Forms
            confirm_password: 'تأكيد كلمة المرور', phone: 'رقم الهاتف', location: 'المحافظة',
            // Messages
            success: 'تم بنجاح!', error: 'حدث خطأ', loading: 'جاري التحميل...',
            email_required: 'البريد الإلكتروني مطلوب', password_required: 'كلمة المرور مطلوبة',
            password_mismatch: 'كلمات المرور غير متطابقة', email_exists: 'البريد الإلكتروني موجود بالفعل',
            invalid_email: 'البريد الإلكتروني غير صحيح', weak_password: 'كلمة المرور ضعيفة جداً',
            // UI
            home: 'الرئيسية', services: 'الخدمات', search: 'البحث', about: 'عن المنصة', 
            contact: 'اتصل بنا', profile: 'الملف الشخصي', my_bookings: 'حجوزاتي',
            settings: 'الإعدادات', language: 'اللغة', dark_mode: 'الوضع المظلم',
            all_services: 'جميع الخدمات', view_details: 'عرض التفاصيل',
            // Home
            main_tagline: 'منصتك الشاملة لجميع خدمات الأعراس في الجزائر',
            start_now: 'ابدأ رحلتك الآن', browse_services: 'تصفح الخدمات',
            venue: 'قاعة', photographer: 'مصور', catering: 'طعام', decoration: 'ديكور',
            from: 'من', dz: 'دج',
            // Features
            why_choose: 'لماذا تختارين Wed in Click؟',
            easy_search: 'بحث سهل ومبسط', quality_guaranteed: 'جودة مضمونة',
            secure_booking: 'حجز وحفظ آمن',
            // CTA
            ready_to_start: 'مستعدة لبدء رحلتك؟',
            create_free_account: 'إنشاء حساب مجاني',
            learn_more: 'معرفة المزيد',
            // Testimonials
            testimonials: 'آراء العرائس',
            amazing_experience: 'تجربة رائعة حقاً!', excellent_service: 'خدمة ممتازة',
            // Footer
            all_rights: 'جميع الحقوق محفوظة',
        },
        en: {
            welcome_title: 'Welcome to Wed in Click',
            welcome_sub: 'Your all-in-one wedding platform in Algeria',
            auth_title: 'Register / Login',
            auth_sub: 'Create an account or login to continue',
            privacy: 'By continuing you agree to the Terms and Privacy Policy.',
            name: 'Name', email: 'Email', password: 'Password',
            register: 'Create Account', login: 'Sign In', logout: 'Sign Out',
            confirm_password: 'Confirm Password', phone: 'Phone Number', location: 'Province',
            success: 'Success!', error: 'Error', loading: 'Loading...',
            email_required: 'Email is required', password_required: 'Password is required',
            password_mismatch: 'Passwords do not match', email_exists: 'Email already exists',
            invalid_email: 'Invalid email', weak_password: 'Password is too weak',
            home: 'Home', services: 'Services', search: 'Search', about: 'About',
            contact: 'Contact', profile: 'Profile', my_bookings: 'My Bookings',
            settings: 'Settings', language: 'Language', dark_mode: 'Dark Mode',
            all_services: 'All Services', view_details: 'View Details',
            main_tagline: 'Your comprehensive wedding services platform in Algeria',
            start_now: 'Start Now', browse_services: 'Browse Services',
            venue: 'Venue', photographer: 'Photographer', catering: 'Catering', decoration: 'Decoration',
            from: 'From', dz: 'DA',
            why_choose: 'Why Choose Wed in Click?',
            easy_search: 'Easy Search', quality_guaranteed: 'Quality Guaranteed',
            secure_booking: 'Secure Booking',
            ready_to_start: 'Ready to Start?',
            create_free_account: 'Create Free Account',
            learn_more: 'Learn More',
            testimonials: 'Testimonials',
            amazing_experience: 'Amazing experience!', excellent_service: 'Excellent service!',
            all_rights: 'All rights reserved',
        },
        fr: {
            welcome_title: 'Bienvenue sur Wed in Click',
            welcome_sub: 'Votre plateforme complète de mariage en Algérie',
            auth_title: 'Inscription / Connexion',
            auth_sub: 'Créez un compte ou connectez-vous pour continuer',
            privacy: 'En continuant, vous acceptez les Conditions et la Politique de confidentialité.',
            name: 'Nom', email: 'Email', password: 'Mot de passe',
            register: 'Créer un compte', login: 'Se connecter', logout: 'Se déconnecter',
            confirm_password: 'Confirmer le mot de passe', phone: 'Téléphone', location: 'Province',
            success: 'Succès!', error: 'Erreur', loading: 'Chargement...',
            email_required: 'Email requis', password_required: 'Mot de passe requis',
            password_mismatch: 'Les mots de passe ne correspondent pas', email_exists: 'Email existe déjà',
            invalid_email: 'Email invalide', weak_password: 'Mot de passe trop faible',
            home: 'Accueil', services: 'Services', search: 'Rechercher', about: 'À propos',
            contact: 'Contact', profile: 'Profil', my_bookings: 'Mes Réservations',
            settings: 'Paramètres', language: 'Langue', dark_mode: 'Mode Sombre',
            all_services: 'Tous les services', view_details: 'Voir détails',
            main_tagline: 'Votre plateforme complète de services de mariage en Algérie',
            start_now: 'Commencer maintenant', browse_services: 'Parcourir les services',
            venue: 'Salle', photographer: 'Photographe', catering: 'Restauration', decoration: 'Décoration',
            from: 'À partir de', dz: 'DA',
            why_choose: 'Pourquoi choisir Wed in Click?',
            easy_search: 'Recherche facile', quality_guaranteed: 'Qualité garantie',
            secure_booking: 'Réservation sécurisée',
            ready_to_start: 'Prêt à commencer?',
            create_free_account: 'Créer un compte gratuit',
            learn_more: 'En savoir plus',
            testimonials: 'Témoignages',
            amazing_experience: 'Expérience incroyable!', excellent_service: 'Service excellent!',
            all_rights: 'Tous droits réservés',
        }
    };

    let current = localStorage.getItem('lang') || 'ar';

    function t(key){ 
        return (translations[current] && translations[current][key]) || key; 
    }

    function applyPage(){
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => { 
            el.textContent = t(el.dataset.i18n); 
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { 
            el.placeholder = t(el.dataset.i18nPlaceholder); 
        });
        
        // Update titles and aria-labels
        document.querySelectorAll('[data-i18n-title]').forEach(el => { 
            el.title = t(el.dataset.i18nTitle); 
        });
        
        // Change language and direction
        document.documentElement.lang = current;
        document.documentElement.dir = (current === 'ar') ? 'rtl' : 'ltr';
        document.body.dir = (current === 'ar') ? 'rtl' : 'ltr';
        
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: current } }));
    }

    function setLang(lang){ 
        if (!translations[lang]) return; 
        current = lang; 
        localStorage.setItem('lang', lang); 
        applyPage();
        
        // Reload translations dynamically in dynamic elements
        const allTranslatableElements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder]');
        if (allTranslatableElements.length > 0) {
            applyPage(); // Apply again to ensure all are updated
        }
    }

    try { applyPage(); } catch(e) {}
    
    return { 
        setLang, 
        t, 
        applyPage, 
        get current(){ return current; },
        languages: ['ar', 'en', 'fr']
    };
})();

// ========================================
// Authentication System
// ========================================
window.auth = (function(){
    function _getUsers(){
        try { 
            return JSON.parse(localStorage.getItem('wic_users')||'[]'); 
        } catch(e){
            return [];
        }
    }
    
    function _saveUsers(list){ 
        localStorage.setItem('wic_users', JSON.stringify(list)); 
    }

    function _validateEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function _validatePassword(pass){
        return pass && pass.length >= 6;
    }

    function register(name, email, pass, passConfirm){
        if (!name || !name.trim()) return { success: false, message: window.i18n.t('name') + ' مطلوب' };
        if (!email) return { success: false, message: window.i18n.t('email_required') };
        if (!_validateEmail(email)) return { success: false, message: window.i18n.t('invalid_email') };
        if (!pass) return { success: false, message: window.i18n.t('password_required') };
        if (!_validatePassword(pass)) return { success: false, message: window.i18n.t('weak_password') };
        if (pass !== passConfirm) return { success: false, message: window.i18n.t('password_mismatch') };
        
        const users = _getUsers();
        if (users.find(u=>u.email===email)) return { success:false, message: window.i18n.t('email_exists') };
        
        const user = { 
            id: Date.now(), 
            name: name.trim(), 
            email, 
            pass, 
            createdAt: new Date().toISOString() 
        };
        users.push(user); 
        _saveUsers(users);
        localStorage.setItem('wic_current', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
        return { success: true, user };
    }

    function login(email, pass){
        if (!email) return { success:false, message: window.i18n.t('email_required') };
        if (!pass) return { success:false, message: window.i18n.t('password_required') };
        
        const users = _getUsers();
        const u = users.find(x=>x.email===email && x.pass===pass);
        if (!u) return { success:false, message: 'بيانات الاعتماد غير صحيحة' };
        localStorage.setItem('wic_current', JSON.stringify({ id: u.id, name: u.name, email: u.email }));
        updateAuthUI();
        return { success:true, user: u };
    }

    function logout(){
        localStorage.removeItem('wic_current');
        updateAuthUI();
        showNotification(window.i18n.t('logout'), 'success');
    }

    function current(){
        try { 
            return JSON.parse(localStorage.getItem('wic_current')||'null'); 
        } catch(e){
            return null;
        }
    }

    function updateAuthUI(){
        const user = current();
        document.querySelectorAll('.auth-guest').forEach(el => el.style.display = user ? 'none' : 'inline-block');
        document.querySelectorAll('.auth-user').forEach(el => el.style.display = user ? 'inline-block' : 'none');
        document.querySelectorAll('.auth-username').forEach(el => { if (user) el.textContent = user.name; });
    }

    return { register, login, logout, current, updateAuthUI };
})();

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info', duration = 3000){
    const notification = document.createElement('div');
    const bgColor = {
        info: 'bg-primary text-white',
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white'
    }[type] || 'bg-primary text-white';
    
    notification.className = `fixed top-20 ${document.documentElement.dir === 'rtl' ? 'right' : 'left'}-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${bgColor}`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-lg">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    anime({
        targets: notification,
        translateX: [document.documentElement.dir === 'rtl' ? 300 : -300, 0],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutQuart'
    });
    
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, document.documentElement.dir === 'rtl' ? 300 : -300],
            opacity: [1, 0],
            duration: 400,
            easing: 'easeInQuart',
            complete: () => { notification.remove(); }
        });
    }, duration);
}

// ========================================
// User Profile Modal
// ========================================
function showProfileModal(){
    const user = window.auth.current();
    if (!user) return;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-dark-light rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95">
            <div class="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-user text-3xl"></i>
                </div>
                <h2 class="text-2xl font-bold">${user.name}</h2>
                <p class="text-white/80 text-sm">${user.email}</p>
            </div>
            <div class="p-6 space-y-4">
                <div class="bg-gray-50 dark:bg-dark rounded-lg p-4">
                    <p class="text-xs text-gray-500 dark:text-gray-400">عضو منذ</p>
                    <p class="font-semibold">${new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <button id="editProfileBtn" class="w-full bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 transition">
                    تعديل الملف الشخصي
                </button>
                <button id="myBookingsBtn" class="w-full border border-primary text-primary p-3 rounded-lg hover:bg-primary/10 transition">
                    حجوزاتي
                </button>
                <button id="settingsBtn" class="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark transition">
                    الإعدادات
                </button>
                <button id="logoutBtn" class="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
                    تسجيل الخروج
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#logoutBtn').addEventListener('click', function(){
        window.auth.logout();
        modal.remove();
        window.location.href = 'welcome.html';
    });
    
    modal.addEventListener('click', function(e){
        if (e.target === modal) modal.remove();
    });
}

// Apply auth UI on load
try { 
    document.addEventListener('DOMContentLoaded', () => { 
        window.auth.updateAuthUI();
        
        // Listen for language changes and apply to dynamic elements
        window.addEventListener('languageChanged', (e) => {
            const lang = e.detail.lang;
            
            // Update page direction
            document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
            document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
            
            // Update all text with data-i18n
            if (window.i18n) {
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.dataset.i18n;
                    el.textContent = window.i18n.t(key);
                });
                
                // Update placeholder texts
                document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                    el.placeholder = window.i18n.t(el.dataset.i18nPlaceholder);
                });
            }
        });
        
        // Wire profile buttons
        document.querySelectorAll('.profile-btn, .show-profile').forEach(btn => {
            btn.addEventListener('click', showProfileModal);
        });
    }); 
} catch(e) {}

// ========================================
// Booking System (نظام الحجز)
// ========================================
window.booking = (function(){
    const BOOKINGS_KEY = 'wic_bookings';

    // Get all bookings
    function getAllBookings() {
        try {
            return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
        } catch(e) {
            return [];
        }
    }

    // Get user bookings
    function getUserBookings() {
        const user = window.auth.current();
        if (!user) return [];
        
        const allBookings = getAllBookings();
        return allBookings.filter(b => b.userId === user.id);
    }

    // Save booking
    function saveBooking(bookingData) {
        // Validate required fields
        if (!bookingData.serviceType || !bookingData.eventDate || !bookingData.guestCount) {
            return { 
                success: false, 
                message: 'يرجى ملء جميع الحقول المطلوبة' 
            };
        }

        // Check if user is logged in
        const user = window.auth.current();
        if (!user) {
            return { 
                success: false, 
                message: 'يرجى تسجيل الدخول أولاً' 
            };
        }

        // Create booking object
        const booking = {
            id: Date.now(),
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            serviceType: bookingData.serviceType,
            serviceName: bookingData.serviceName || 'خدمة',
            eventDate: bookingData.eventDate,
            eventTime: bookingData.eventTime || '18:00',
            guestCount: parseInt(bookingData.guestCount),
            specialRequests: bookingData.specialRequests || '',
            budget: bookingData.budget || 0,
            status: 'pending',
            createdAt: new Date().toISOString(),
            notes: ''
        };

        // Validate date
        if (new Date(booking.eventDate) < new Date()) {
            return { 
                success: false, 
                message: 'يرجى اختيار تاريخ مستقبلي' 
            };
        }

        // Save to localStorage
        const bookings = getAllBookings();
        bookings.push(booking);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

        return { 
            success: true, 
            message: 'تم حفظ الحجز بنجاح!',
            booking: booking 
        };
    }

    // Update booking
    function updateBooking(bookingId, updatedData) {
        const bookings = getAllBookings();
        const index = bookings.findIndex(b => b.id === bookingId);
        
        if (index === -1) {
            return { 
                success: false, 
                message: 'الحجز غير موجود' 
            };
        }

        // Only allow user to update own bookings
        const user = window.auth.current();
        if (bookings[index].userId !== user.id) {
            return { 
                success: false, 
                message: 'لا يمكنك تعديل هذا الحجز' 
            };
        }

        // Update booking
        bookings[index] = { ...bookings[index], ...updatedData, id: bookingId };
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

        return { 
            success: true, 
            message: 'تم تحديث الحجز بنجاح!',
            booking: bookings[index] 
        };
    }

    // Cancel booking
    function cancelBooking(bookingId) {
        const result = updateBooking(bookingId, { status: 'cancelled' });
        if (result.success) {
            result.message = 'تم إلغاء الحجز';
        }
        return result;
    }

    // Confirm booking
    function confirmBooking(bookingId) {
        const result = updateBooking(bookingId, { status: 'confirmed' });
        if (result.success) {
            result.message = 'تم تأكيد الحجز';
        }
        return result;
    }

    // Get booking by ID
    function getBooking(bookingId) {
        const bookings = getAllBookings();
        return bookings.find(b => b.id === bookingId);
    }

    // Delete booking
    function deleteBooking(bookingId) {
        const user = window.auth.current();
        if (!user) return { success: false, message: 'يرجى تسجيل الدخول' };

        const bookings = getAllBookings();
        const index = bookings.findIndex(b => b.id === bookingId);
        
        if (index === -1) {
            return { success: false, message: 'الحجز غير موجود' };
        }

        if (bookings[index].userId !== user.id) {
            return { success: false, message: 'لا يمكنك حذف هذا الحجز' };
        }

        bookings.splice(index, 1);
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));

        return { 
            success: true, 
            message: 'تم حذف الحجز بنجاح!' 
        };
    }

    // Get statistics
    function getStats() {
        const bookings = getUserBookings();
        return {
            total: bookings.length,
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            completed: bookings.filter(b => b.status === 'completed').length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length
        };
    }

    return {
        saveBooking,
        updateBooking,
        cancelBooking,
        confirmBooking,
        getBooking,
        deleteBooking,
        getAllBookings,
        getUserBookings,
        getStats
    };
})();

// ========================================
// Booking Modal Helper
// ========================================
function showBookingModal(serviceType, serviceName, servicePrice) {
    const user = window.auth.current();
    
    if (!user) {
        showNotification('يرجى تسجيل الدخول أولاً للقيام بحجز', 'warning', 3000);
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-dark-light rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div class="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 text-white z-10">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold">${serviceName}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="p-2 rounded-lg hover:bg-white/20 transition">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <p class="text-white/90 mt-1">السعر المتوقع: ${servicePrice || 'يتم التفاوض'}</p>
            </div>
            
            <form id="bookingForm" class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">تاريخ الحدث *</label>
                        <input type="date" name="eventDate" required class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">وقت الحدث</label>
                        <input type="time" name="eventTime" class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" value="18:00">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2">عدد الضيوف *</label>
                        <input type="number" name="guestCount" required min="10" placeholder="مثال: 300" class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">الميزانية المتوقعة</label>
                        <input type="number" name="budget" placeholder="مثال: 500000" class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-2">متطلبات خاصة</label>
                    <textarea name="specialRequests" placeholder="أخبرنا عن أي متطلبات خاصة..." rows="3" class="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"></textarea>
                </div>

                <div class="bg-gray-100 dark:bg-dark-lighter p-4 rounded-lg">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        <i class="fas fa-info-circle ml-2"></i>
                        سيتم إرسال تأكيد الحجز إلى بريدك: <strong>${user.email}</strong>
                    </p>
                </div>

                <div class="flex gap-3 pt-4">
                    <button type="submit" class="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold p-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                        <i class="fas fa-check ml-2"></i>تأكيد الحجز
                    </button>
                    <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 dark:border-gray-600 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-lighter transition">
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    const form = modal.querySelector('#bookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const result = window.booking.saveBooking({
            serviceType: serviceType,
            serviceName: serviceName,
            eventDate: formData.get('eventDate'),
            eventTime: formData.get('eventTime'),
            guestCount: formData.get('guestCount'),
            budget: formData.get('budget'),
            specialRequests: formData.get('specialRequests')
        });

        if (result.success) {
            showNotification(result.message + ' ✨', 'success', 2000);
            
            setTimeout(() => {
                modal.remove();
            }, 1500);
        } else {
            showNotification(result.message, 'error');
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
