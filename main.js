// --- Custom Carousel Buttons Logic ---
const carousel = document.getElementById('research-grid');
const leftBtn = document.getElementById('scroll-left-btn');
const rightBtn = document.getElementById('scroll-right-btn');

// Function to handle showing/hiding buttons based on scroll position
function updateScrollButtons() {
    // Wait for next frame to ensure elements are painted (useful for dynamic filtering)
    requestAnimationFrame(() => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        // Check Left Button
        if (carousel.scrollLeft <= 10) {
            leftBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
            leftBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        } else {
            leftBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
            leftBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        }

        // Check Right Button (hide if reached end OR if there's no overflow)
        if (carousel.scrollLeft >= maxScrollLeft - 10 || maxScrollLeft <= 0) {
            rightBtn.classList.add('opacity-0', 'scale-75', 'pointer-events-none');
            rightBtn.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
        } else {
            rightBtn.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
            rightBtn.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
        }

        // Dynamic Mask Logic to apply fade-out effect to carousel edges
        carousel.classList.remove('mask-edge-none', 'mask-edge-left', 'mask-edge-right', 'mask-edge-both');
        
        if (maxScrollLeft <= 0) {
            carousel.classList.add('mask-edge-none');
        } else if (carousel.scrollLeft <= 10) {
            carousel.classList.add('mask-edge-right');
        } else if (carousel.scrollLeft >= maxScrollLeft - 10) {
            carousel.classList.add('mask-edge-left');
        } else {
            carousel.classList.add('mask-edge-both');
        }
    });
}

// Attach click events
leftBtn.addEventListener('click', () => {
    // Scroll exactly one card width + the gap
    const cardWidth = carousel.querySelector('.research-card').offsetWidth;
    const gap = 24; // Tailwind gap-6 equals 24px
    carousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
    const cardWidth = carousel.querySelector('.research-card').offsetWidth;
    const gap = 24;
    carousel.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
});

// Function to scale and transition research cards as they move through the carousel viewport on mobile
function updateCarouselCardScaling() {
    const cards = carousel.querySelectorAll('.research-card');
    if (!cards.length) return;

    if (window.innerWidth >= 768) {
        // Reset styles for desktop
        cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
        });
        return;
    }

    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenterX = carouselRect.left + carouselRect.width / 2;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        
        // Distance from center of carousel
        const distance = Math.abs(cardCenterX - carouselCenterX);
        // Normalize based on carousel half-width
        const scaleRange = carouselRect.width / 2;
        const ratio = Math.min(distance / scaleRange, 1);
        
        // Scale from 1.0 (center) to 0.94 (edges)
        const scale = 1 - (ratio * 0.06);
        // Opacity from 1.0 (center) to 0.8 (edges)
        const opacity = 1 - (ratio * 0.2);
        
        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity;
        card.style.transition = 'transform 150ms cubic-bezier(0.1, 0.9, 0.2, 1), opacity 150ms cubic-bezier(0.1, 0.9, 0.2, 1)';
    });
}

// Event listeners for responsive visibility
carousel.addEventListener('scroll', () => {
    updateScrollButtons();
    updateCarouselCardScaling();
}, { passive: true });

window.addEventListener('resize', () => {
    updateScrollButtons();
    updateCarouselCardScaling();
});

// Initial visibility checks
updateScrollButtons();
updateCarouselCardScaling();
// ------------------------------------

// Research Category Filtering
function filterResearch(event, category) {
    const cards = document.querySelectorAll('.research-card');
    const chips = document.querySelectorAll('#filter-container md-filter-chip');

    chips.forEach(chip => {
        const chipLabel = chip.getAttribute('label').toLowerCase().replace(' ', '-');
        chip.selected = (chipLabel === category);
    });

    cards.forEach(card => {
        if(category === 'all' || card.dataset.category === category) {
            card.style.opacity = '0';
            card.style.display = 'flex';
            setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });

    // Reset scroll position and recalculate buttons after filtering
    setTimeout(() => {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        updateScrollButtons();
        updateCarouselCardScaling();
    }, 60);
}

// --- Dynamic Research Cards Rendering ---
function renderResearchCards() {
    const grid = document.getElementById('research-grid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.values(PROJECTS_DATA).forEach(project => {
        let dataCat = 'published';
        if (project.category.startsWith('Forthcoming')) {
            dataCat = 'forthcoming';
        } else if (project.category.startsWith('In Progress')) {
            dataCat = 'in-progress';
        }

        const card = document.createElement('div');
        card.className = 'research-card snap-center md:snap-start shrink-0 w-[280px] xs:w-[320px] md:w-[380px] bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 material-transition group flex flex-col cursor-pointer relative focus:outline-none';
        card.setAttribute('data-category', dataCat);
        card.setAttribute('tabindex', '0');
        card.setAttribute('onclick', `openProject(event, '${project.id}')`);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProject(e, project.id);
            }
        });
        card.innerHTML = `
            <md-elevation></md-elevation>
            <div class="h-44 bg-stone-200 dark:bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden relative">
                <div class="absolute inset-0 ${project.cardColor || 'bg-emerald-100/50 dark:bg-emerald-900/20'} transition-transform duration-500 group-hover:scale-105"></div>
                <div class="relative z-10 flex items-center justify-center">
                    ${project.cardIcon || ''}
                </div>
            </div>
            <div class="p-8 space-y-4 flex-1 flex flex-col">
                <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 ${project.badgeColor || 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'} text-xs font-bold uppercase tracking-wider rounded-full">${project.category}</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition line-clamp-4 font-sans leading-tight">${project.title}</h3>
                <div class="mt-auto pt-4 flex flex-col gap-2">
                    <div class="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition group/link mt-2">
                        View Details
                        <md-icon class="group-hover/link:translate-x-1 transition-transform" style="font-size: 16px;">arrow_forward</md-icon>
                    </div>
                </div>
            </div>
            <md-ripple></md-ripple>
            <md-focus-ring></md-focus-ring>
        `;
        grid.appendChild(card);
    });
    updateCarouselCardScaling();
}

// --- Active Sliding Navigation Indicator & Scrollspy ---
function updateNavIndicator() {
    const indicator = document.getElementById('nav-indicator');
    if (!indicator) return;
    
    // Find active link
    const activeLink = document.querySelector('.nav-link.text-emerald-700, .nav-link.font-bold');
    if (activeLink) {
        indicator.style.opacity = '1';
        indicator.style.left = `${activeLink.offsetLeft}px`;
        indicator.style.width = `${activeLink.offsetWidth}px`;
        indicator.style.top = `${activeLink.offsetTop}px`;
        indicator.style.height = `${activeLink.offsetHeight}px`;
    } else {
        indicator.style.opacity = '0';
    }
}

function updateMobileNavIndicator() {
    const indicator = document.getElementById('mobile-nav-indicator');
    const nav = document.querySelector('nav.fixed.bottom-4');
    if (!indicator || !nav) return;

    // Find the active mobile link
    const activeLink = document.querySelector('.mobile-nav-link.text-emerald-800, .mobile-nav-link.font-bold');
    if (activeLink) {
        const container = activeLink.querySelector('.mobile-nav-icon-container');
        if (container) {
            const navRect = nav.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Ensure elements are layouted and visible
            if (containerRect.width > 0) {
                indicator.style.opacity = '1';
                indicator.style.width = `${containerRect.width}px`;
                indicator.style.height = `${containerRect.height}px`;
                // Precise alignment using relative bounding boxes
                indicator.style.left = `${containerRect.left - navRect.left}px`;
                indicator.style.top = `${containerRect.top - navRect.top}px`;
            }
        }
    } else {
        indicator.style.opacity = '0';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Render research cards dynamically and update buttons layout
    renderResearchCards();
    updateScrollButtons();
    updateCarouselCardScaling();

    const projectView = document.getElementById('project-view');
    if (projectView) {
        projectView.addEventListener('close', () => {
            const lBtn = document.getElementById('scroll-left-btn');
            const rBtn = document.getElementById('scroll-right-btn');
            if (lBtn) lBtn.style.display = '';
            if (rBtn) rBtn.style.display = '';

            // Show nav bars
            const desktopNav = document.querySelector('nav.fixed.top-4');
            if (desktopNav) {
                desktopNav.style.transition = 'transform 600ms cubic-bezier(0.2, 0, 0, 1)';
                desktopNav.style.pointerEvents = '';
                desktopNav.style.transform = '';
            }
            const mobileTop = document.querySelector('header.fixed.top-4');
            if (mobileTop) {
                mobileTop.style.transition = 'transform 600ms cubic-bezier(0.2, 0, 0, 1)';
                mobileTop.style.pointerEvents = '';
                mobileTop.style.transform = '';
            }
            const mobileBottom = document.querySelector('nav.fixed.bottom-4');
            if (mobileBottom) {
                mobileBottom.style.transition = 'transform 600ms cubic-bezier(0.2, 0, 0, 1)';
                mobileBottom.style.pointerEvents = '';
                mobileBottom.style.transform = '';
            }

            // Unlock body scroll and remove padding
            document.body.style.paddingRight = '';
            document.body.classList.remove('overflow-hidden');
        });
    }

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "-120px 0px -60% 0px", // Align active indicator accurately for sticky header and viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Update Desktop Links
                navLinks.forEach(link => {
                    link.classList.remove("text-emerald-700", "dark:text-emerald-400", "font-bold");
                    link.classList.add("text-slate-600", "dark:text-slate-300", "font-medium");
                    
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.remove("text-slate-600", "dark:text-slate-300", "font-medium");
                        link.classList.add("text-emerald-700", "dark:text-emerald-400", "font-bold");
                    }
                });

                // Update sliding active indicator position
                updateNavIndicator();

                // Update Mobile Links (M3 active pill styling)
                mobileNavLinks.forEach(link => {
                    const container = link.querySelector('.mobile-nav-icon-container');
                    const svg = link.querySelector('svg');
                    
                    if (container) {
                        container.classList.remove("text-emerald-950", "dark:text-emerald-100");
                    }
                    link.classList.remove("text-emerald-800", "dark:text-emerald-300", "font-bold");
                    link.classList.add("text-slate-600", "dark:text-slate-400");
                    if (svg) svg.setAttribute('stroke-width', '2');
                    
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.remove("text-slate-600", "dark:text-slate-400");
                        link.classList.add("text-emerald-800", "dark:text-emerald-300", "font-bold");
                        if (container) {
                            container.classList.add("text-emerald-950", "dark:text-emerald-100");
                        }
                        if (svg) svg.setAttribute('stroke-width', '2.5');
                    }
                });

                // Update sliding mobile indicator position
                updateMobileNavIndicator();
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Handle window resize for navigation pill alignment
    window.addEventListener('resize', () => {
        updateNavIndicator();
        updateMobileNavIndicator();
    });
    
    // Initial pill alignment after DOM layout settles
    setTimeout(() => {
        updateNavIndicator();
        updateMobileNavIndicator();
    }, 150);
});

// --- Single Page App (SPA) Routing & Material Shared Axis Logic ---
let lastClickedCard = null;

function openProject(event, projectId) {
    event.preventDefault();
    const card = event.currentTarget;
    lastClickedCard = card;

    const project = PROJECTS_DATA[projectId];
    if (project) {
        // Update category and topic badges
        const badgeCategory = document.getElementById('project-badge-category');
        const badgeTopic = document.getElementById('project-badge-topic');
        if (badgeCategory) {
            badgeCategory.textContent = project.category;
            badgeCategory.className = `px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${project.categoryClass || 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'}`;
        }
        if (badgeTopic) {
            badgeTopic.textContent = project.topic;
        }

        // Update Title
        const detailTitle = document.getElementById('project-detail-title');
        if (detailTitle) {
            detailTitle.textContent = project.title;
        }

        // Update Authors
        const detailAuthors = document.getElementById('project-detail-authors');
        if (detailAuthors) {
            detailAuthors.textContent = project.authors;
        }

        // Update Venue
        const detailVenue = document.getElementById('project-detail-venue');
        if (detailVenue) {
            detailVenue.textContent = project.venue;
        }

        // Update Affiliation
        const detailAffiliation = document.getElementById('project-detail-affiliation');
        const detailAffiliationDot = document.getElementById('project-detail-affiliation-dot');
        if (detailAffiliation) {
            if (project.affiliation) {
                detailAffiliation.textContent = project.affiliation;
                detailAffiliation.classList.remove('hidden');
                if (detailAffiliationDot) detailAffiliationDot.classList.remove('hidden');
            } else {
                detailAffiliation.classList.add('hidden');
                if (detailAffiliationDot) detailAffiliationDot.classList.add('hidden');
            }
        }

        // Update Abstracts
        const detailAbstract = document.getElementById('project-detail-abstract');
        if (detailAbstract) {
            detailAbstract.innerHTML = project.abstracts.map(para => `<p class="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-serif">${para}</p>`).join('\n');
        }

        // Update Publication link box
        const pubStatus = document.getElementById('project-detail-pub-status');
        const doiLink = document.getElementById('project-detail-doi-link');
        
        if (pubStatus) {
            pubStatus.textContent = project.pubStatus;
        }
        
        if (doiLink) {
            if (project.doiLink) {
                doiLink.href = project.doiLink;
                doiLink.classList.remove('hidden');
            } else {
                doiLink.classList.add('hidden');
            }
        }

        // Update Media Mentions
        const mediaBlock = document.getElementById('project-detail-media-block');
        const mediaLinks = document.getElementById('project-detail-media-links');
        
        if (mediaBlock && mediaLinks) {
            if (project.media && project.media.length > 0) {
                mediaBlock.classList.remove('hidden');
                mediaLinks.innerHTML = project.media.map(m => `
                    <a href="${m.link || '#'}" class="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 material-transition font-normal no-underline relative focus:outline-none">
                        <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <md-icon>newspaper</md-icon>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 transition">${m.source}</p>
                            <p class="text-xs text-slate-700 dark:text-slate-300 mt-0.5">${m.quote}</p>
                        </div>
                        <md-focus-ring></md-focus-ring>
                    </a>
                `).join('\n');
            } else {
                mediaBlock.classList.add('hidden');
                mediaLinks.innerHTML = '';
            }
        }

        // Update Keywords
        const keywordsBlock = document.getElementById('project-detail-keywords-block');
        const keywordsContainer = document.getElementById('project-detail-keywords');
        if (keywordsBlock && keywordsContainer) {
            if (project.keywords && project.keywords.length > 0) {
                keywordsBlock.classList.remove('hidden');
                keywordsContainer.innerHTML = project.keywords.map(kw => `
                    <span class="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md">${kw}</span>
                `).join('\n');
            } else {
                keywordsBlock.classList.add('hidden');
                keywordsContainer.innerHTML = '';
            }
        }

        // Update Email
        const contactBlock = document.getElementById('project-detail-contact-block');
        const emailLink = document.getElementById('project-detail-email-link');
        const emailText = document.getElementById('project-detail-email');
        if (contactBlock) {
            if (project.email) {
                contactBlock.classList.remove('hidden');
                if (emailLink) emailLink.href = `mailto:${project.email}`;
                if (emailText) emailText.textContent = project.email;
            } else {
                contactBlock.classList.add('hidden');
            }
        }
    }

    // 1. "Press Down" Physical Interaction & Hide Nav Bars Immediately
    card.style.transform = 'scale(0.96)';
    card.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';

    const desktopNav = document.querySelector('nav.fixed.top-4');
    if (desktopNav) {
        desktopNav.style.transition = 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)';
        desktopNav.style.pointerEvents = 'none';
        desktopNav.style.transform = 'translate(-50%, -120px)';
    }
    const mobileTop = document.querySelector('header.fixed.top-4');
    if (mobileTop) {
        mobileTop.style.transition = 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)';
        mobileTop.style.pointerEvents = 'none';
        mobileTop.style.transform = 'translateY(-120px)';
    }
    const mobileBottom = document.querySelector('nav.fixed.bottom-4');
    if (mobileBottom) {
        mobileBottom.style.transition = 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)';
        mobileBottom.style.pointerEvents = 'none';
        mobileBottom.style.transform = 'translateY(120px)';
    }
 
    setTimeout(() => {
        card.style.transform = '';
        const projectView = document.getElementById('project-view');
        if (projectView) {
            // Hide scroll buttons when dialog opens
            const lBtn = document.getElementById('scroll-left-btn');
            const rBtn = document.getElementById('scroll-right-btn');
            if (lBtn) lBtn.style.display = 'none';
            if (rBtn) rBtn.style.display = 'none';

            // Lock body scroll and prevent layout shift from scrollbar disappearing
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const currentPadding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
            document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
            document.body.classList.add('overflow-hidden');

            projectView.show();
        }
    }, 150);
}


function closeProject(targetSectionId = null) {
    const projectView = document.getElementById('project-view');
    if (projectView) {
        projectView.close();
        
        // Restore scroll buttons
        const lBtn = document.getElementById('scroll-left-btn');
        const rBtn = document.getElementById('scroll-right-btn');
        if (lBtn) lBtn.style.display = '';
        if (rBtn) rBtn.style.display = '';
    }
 
    if (targetSectionId) {
        setTimeout(() => {
            if (targetSectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (targetSectionId !== '#') {
                const targetEl = document.querySelector(targetSectionId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
    }
}

// Project View Scroll Fog Listener (Hides when near bottom)
window.addEventListener('scroll', () => {
    const fog = document.getElementById('scroll-fog');
    if (fog && !fog.classList.contains('hidden')) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
            fog.classList.remove('opacity-100');
            fog.classList.add('opacity-0');
        } else {
            fog.classList.remove('opacity-0');
            fog.classList.add('opacity-100');
        }
    }
});

// Global safeguard: Handle clicking navigation tabs while inside a project view
document.querySelectorAll('.nav-link, .mobile-nav-link, .home-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectView = document.getElementById('project-view');
        const targetId = link.getAttribute('href');
 
        if (projectView && projectView.open) {
            e.preventDefault();
            closeProject(targetId === '#hero' ? 'top' : targetId);
        } else if (targetId === '#hero') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// --- Light/Dark Mode Toggle Logic ---
const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    });
});

// Handle Contact Form Submission with M3 Web Components values
function handleFormSubmit() {
    const nameEl = document.getElementById('form-name');
    const emailEl = document.getElementById('form-email');
    const messageEl = document.getElementById('form-message');
    
    if (nameEl && emailEl && messageEl) {
        alert(`In a live environment, this would send an email to aapriest@ualberta.ca!\n\nName: ${nameEl.value}\nEmail: ${emailEl.value}\nMessage: ${messageEl.value}`);
    }
}
