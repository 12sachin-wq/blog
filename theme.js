// Immediately run to prevent flash of light theme
(function () {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

// Set up toggle listener when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = document.getElementById('theme-toggle-icon');

    const updateIcon = (theme) => {
        if (toggleIcon) toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    if (toggleBtn) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        updateIcon(currentTheme);

        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav-open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.classList.toggle('is-active', isOpen);
        });

        // Close menu when a nav link is clicked (for single-page feel)
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('is-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('is-active');
            }
        });
    }
});
