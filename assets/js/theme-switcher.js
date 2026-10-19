/**
 * Theme Switcher JavaScript
 * Handles toggling between light and dark themes
 */
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('cv-theme') || 'light';
        this.init();
    }

    init() {
        this.createToggleButton();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = `
            <i class="bi ${this.getThemeIcon()}"></i>
            <span>${this.getThemeLabel()}</span>
        `;
        document.body.appendChild(button);
        this.toggleButton = button;
    }

    getThemeIcon() {
        return this.currentTheme === 'light' ? 'bi-moon' : 'bi-sun';
    }

    getThemeLabel() {
        return this.currentTheme === 'light' ? 'Dark' : 'Light';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('cv-theme', theme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (this.toggleButton) {
            const icon = this.toggleButton.querySelector('i');
            const label = this.toggleButton.querySelector('span');
            
            icon.className = `bi ${this.getThemeIcon()}`;
            label.textContent = this.getThemeLabel();
        }
    }

    toggleTheme() {
        // Ignore repeated input while the current crossfade is settling.
        if (this.isTransitioning) return;

        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        const update = () => {
            this.applyTheme(newTheme);
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: newTheme }
            }));
        };
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reducedMotion) {
            update();
            return;
        }

        const root = document.documentElement;
        this.isTransitioning = true;
        const finish = () => {
            root.classList.remove('theme-crossfade', 'theme-color-fade');
            this.isTransitioning = false;
        };

        if (typeof document.startViewTransition === 'function') {
            root.classList.add('theme-crossfade');
            const transition = document.startViewTransition(update);
            // A skipped transition still applies the theme and releases the input lock.
            transition.finished.catch(() => {}).finally(finish);
        } else {
            root.classList.add('theme-color-fade');
            // Flush the transition styles before changing the palette.
            void root.offsetWidth;
            update();
            window.setTimeout(finish, 1050);
        }
    }

    bindEvents() {
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('cv-theme')) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(systemTheme);
                }
            });
        }

        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// Initialize theme switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});

// Export for use
window.ThemeSwitcher = ThemeSwitcher;
