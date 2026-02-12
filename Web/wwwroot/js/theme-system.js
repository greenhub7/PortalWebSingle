

class SolMedThemeSystem {
    constructor() {
        this.storageKey = 'solmed-theme';
        this.themes = ['light', 'dark', 'auto'];
        this.currentTheme = this.getStoredTheme();
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
        this.bindEvents();
        this.observeSystemTheme();
    }

    getStoredTheme() {
        const stored = localStorage.getItem(this.storageKey);
        return this.themes.includes(stored) ? stored : 'auto';
    }

    getSystemTheme() {
        return this.mediaQuery.matches ? 'dark' : 'light';
    }

    getActiveTheme() {
        return this.currentTheme === 'auto' ? this.getSystemTheme() : this.currentTheme;
    }

    setTheme(theme) {
        if (!this.themes.includes(theme)) return;
        
        this.currentTheme = theme;
        localStorage.setItem(this.storageKey, theme);
        this.applyTheme(theme);
        this.updateToggleButton();
        this.dispatchThemeChange();
    }

    applyTheme(theme) {
        const activeTheme = theme === 'auto' ? this.getSystemTheme() : theme;
        
        
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('theme-light', 'theme-dark');
        
        
        if (activeTheme !== 'light') {
            document.documentElement.setAttribute('data-theme', activeTheme);
            document.body.classList.add(`theme-${activeTheme}`);
        }
        
        
        this.updateMetaThemeColor(activeTheme);
        
        
        this.animateThemeTransition();
    }

    updateMetaThemeColor(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            const color = theme === 'dark' ? '#0f1419' : '#f8fafc';
            metaThemeColor.setAttribute('content', color);
        }
    }

    animateThemeTransition() {
        document.body.style.transition = 'none';
        requestAnimationFrame(() => {
            document.body.style.transition = '';
        });
    }

    createThemeToggle() {
        
        const existing = document.getElementById('theme-toggle');
        if (existing) {
            this.updateToggleButton(existing);
            return;
        }

        
        const headerActions = document.querySelector('.medical-header-actions');
        if (headerActions) {
            const toggle = document.createElement('button');
            toggle.id = 'theme-toggle';
            toggle.setAttribute('aria-label', 'Toggle theme');
            toggle.setAttribute('title', 'Toggle theme');
            
            this.updateToggleButton(toggle);
            
            
            const navbar = headerActions.querySelector('[data-partial="Navbar"]') || headerActions.lastElementChild;
            if (navbar) {
                headerActions.insertBefore(toggle, navbar);
            } else {
                headerActions.appendChild(toggle);
            }
        }
    }

    updateToggleButton(button = document.getElementById('theme-toggle')) {
        if (!button) return;
        
        const icons = {
            light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>`,
            dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                   </svg>`,
            auto: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                     <line x1="8" y1="21" x2="16" y2="21"/>
                     <line x1="12" y1="17" x2="12" y2="21"/>
                   </svg>`
        };
        
        button.innerHTML = icons[this.currentTheme];
        button.setAttribute('data-theme', this.currentTheme);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                this.cycleTheme();
            }
        });

        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    }

    observeSystemTheme() {
        this.mediaQuery.addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
                this.dispatchThemeChange();
            }
        });
    }

    dispatchThemeChange() {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: this.currentTheme,
                activeTheme: this.getActiveTheme()
            }
        });
        document.dispatchEvent(event);
    }

    
    getCurrentTheme() {
        return this.currentTheme;
    }

    getAvailableThemes() {
        return [...this.themes];
    }

    isLightTheme() {
        return this.getActiveTheme() === 'light';
    }

    isDarkTheme() {
        return this.getActiveTheme() === 'dark';
    }
}


class SolMedAnimations {
    static observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        
        document.querySelectorAll('.card, .form-section, .medical-form-section').forEach(el => {
            observer.observe(el);
        });
    }

    static initializeCounters() {
        const counters = document.querySelectorAll('.metric-value[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    static initializeProgressBars() {
        const progressBars = document.querySelectorAll('.medical-progress-bar[data-progress]');
        
        progressBars.forEach(bar => {
            const target = parseInt(bar.dataset.progress);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = `${target}%`;
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(bar);
        });
    }

    static addHoverEffects() {
        
        document.querySelectorAll('.card, .btn, .form-control').forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translateY(-1px)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }
}


class SolMedFormEnhancements {
    static init() {
        this.enhanceFormValidation();
        this.addFloatingLabels();
        this.improveFileInputs();
        this.addFormProgress();
    }

    static enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        this.validateField(input);
                    }
                });
            });
        });
    }

    static validateField(input) {
        const isValid = input.checkValidity();
        
        input.classList.remove('is-valid', 'is-invalid');
        
        if (input.value.trim() !== '') {
            input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }
    }

    static addFloatingLabels() {
        const floatingGroups = document.querySelectorAll('.form-floating');
        
        floatingGroups.forEach(group => {
            const input = group.querySelector('.form-control');
            const label = group.querySelector('.form-label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (input.value === '') {
                        group.classList.remove('focused');
                    }
                });
                
                
                if (input.value !== '') {
                    group.classList.add('focused');
                }
            }
        });
    }

    static improveFileInputs() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'file-input-wrapper';
            
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-outline-primary';
            button.textContent = 'Choose File';
            
            const info = document.createElement('span');
            info.className = 'file-input-info';
            info.textContent = 'No file selected';
            
            input.style.display = 'none';
            
            button.addEventListener('click', () => input.click());
            
            input.addEventListener('change', () => {
                const fileName = input.files[0]?.name || 'No file selected';
                info.textContent = fileName;
            });
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(button);
            wrapper.appendChild(info);
            wrapper.appendChild(input);
        });
    }

    static addFormProgress() {
        const multiStepForms = document.querySelectorAll('.multi-step-form');
        
        multiStepForms.forEach(form => {
            const steps = form.querySelectorAll('.form-step');
            const progressBar = document.createElement('div');
            progressBar.className = 'form-progress';
            
            const progress = document.createElement('div');
            progress.className = 'form-progress-bar';
            progressBar.appendChild(progress);
            
            form.insertBefore(progressBar, form.firstChild);
            
            
            const updateProgress = () => {
                const currentStep = form.querySelector('.form-step.active');
                if (currentStep) {
                    const stepIndex = Array.from(steps).indexOf(currentStep);
                    const progressPercent = ((stepIndex + 1) / steps.length) * 100;
                    progress.style.width = `${progressPercent}%`;
                }
            };
            
            updateProgress();
            
            
            const observer = new MutationObserver(updateProgress);
            steps.forEach(step => {
                observer.observe(step, { attributes: true, attributeFilter: ['class'] });
            });
        });
    }
}


class SolMedAccessibility {
    static init() {
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.improveColorContrast();
        this.addSkipLinks();
    }

    static enhanceKeyboardNavigation() {
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    static addAriaLabels() {
        
        const inputs = document.querySelectorAll('.form-control:not([aria-label]):not([aria-labelledby])');
        
        inputs.forEach(input => {
            const label = input.closest('.form-group')?.querySelector('.form-label');
            if (label && !input.hasAttribute('aria-labelledby')) {
                const labelId = `label-${Math.random().toString(36).substr(2, 9)}`;
                label.id = labelId;
                input.setAttribute('aria-labelledby', labelId);
            }
        });
    }

    static improveColorContrast() {
        
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.documentElement.classList.add('high-contrast');
        }
    }

    static addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only';
        skipLink.textContent = 'Skip to main content';
        
        skipLink.addEventListener('focus', () => {
            skipLink.classList.remove('sr-only');
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.classList.add('sr-only');
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    window.solmedTheme = new SolMedThemeSystem();
    
    
    SolMedAnimations.observeElements();
    SolMedAnimations.initializeCounters();
    SolMedAnimations.initializeProgressBars();
    SolMedAnimations.addHoverEffects();
    
    
    SolMedFormEnhancements.init();
    
    
    SolMedAccessibility.init();
    
    
    document.addEventListener('themechange', (e) => {
        console.log('Theme changed to:', e.detail.activeTheme);
        
        
        document.querySelectorAll('[data-theme-dependent]').forEach(el => {
            el.dispatchEvent(new CustomEvent('themeupdate', {
                detail: e.detail
            }));
        });
    });
    
    
    document.body.classList.add('solmed-loaded');
});


window.SolMedThemeSystem = SolMedThemeSystem;
window.SolMedAnimations = SolMedAnimations;
window.SolMedFormEnhancements = SolMedFormEnhancements;
window.SolMedAccessibility = SolMedAccessibility;