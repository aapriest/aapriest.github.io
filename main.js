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

// Event listeners for responsive visibility
carousel.addEventListener('scroll', updateScrollButtons, { passive: true });
window.addEventListener('resize', updateScrollButtons);

// Initial visibility check
updateScrollButtons();
// ------------------------------------

// Research Category Filtering
function filterResearch(category) {
    const cards = document.querySelectorAll('.research-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.className = 'filter-btn px-4 py-2 bg-emerald-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-semibold material-transition hover:bg-emerald-200 dark:hover:bg-slate-700 shadow-sm';
        if(btn.dataset.filter === category) {
            btn.className = 'filter-btn px-4 py-2 bg-emerald-700 dark:bg-emerald-600 text-white rounded-full text-sm font-semibold material-transition shadow-sm';
        }
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
    }, 60);
}

// Active Scroll Navigation (Scrollspy)
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -70% 0px", // Triggers active state more accurately based on scrolling
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                // Update Desktop Links
                navLinks.forEach(link => {
                    // Reset all links
                    link.classList.remove("text-emerald-700", "dark:text-emerald-400", "font-bold");
                    link.classList.add("text-slate-500", "dark:text-slate-400", "font-medium");
                    
                    // Highlight active link
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.remove("text-slate-500", "dark:text-slate-400", "font-medium");
                        link.classList.add("text-emerald-700", "dark:text-emerald-400", "font-bold");
                    }
                });

                // Update Mobile Links (M3 active pill styling)
                mobileNavLinks.forEach(link => {
                    // Reset mobile links to new high-contrast base colors
                    link.classList.remove("text-emerald-800", "dark:text-emerald-300", "bg-emerald-100/60", "dark:bg-emerald-800/40");
                    link.classList.add("text-slate-600", "dark:text-slate-300");
                    
                    // Make icon stroke thinner when inactive (Spotify style)
                    const svg = link.querySelector('svg');
                    if (svg) svg.setAttribute('stroke-width', '2');
                    
                    // Highlight active mobile link
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.remove("text-slate-600", "dark:text-slate-300");
                        link.classList.add("text-emerald-800", "dark:text-emerald-300", "bg-emerald-100/60", "dark:bg-emerald-800/40");
                        
                        // Make icon stroke bolder when active (Spotify style)
                        if (svg) svg.setAttribute('stroke-width', '2.5');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// --- Single Page App (SPA) Routing & Material Shared Axis Logic ---
const PROJECTS = {
    'revolving-door': {
        category: 'Forthcoming • Summer 2026',
        categoryClass: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300',
        topic: 'Managed Retreat',
        title: 'The Revolving Door of Risk: Climate Hazards, Risk Containment and the Hidden Social Dynamics of Managed Retreat',
        authors: 'James R. Elliott, Kevin Loughran, Phylicia Lee Brown, and A. Alexander Priest',
        venue: 'RSF: Russell Sage Foundation Journal of Social Sciences',
        abstracts: [
            'This study investigates the social dynamics of managed retreat and the "revolving door" of climate risk. We analyze how climate hazard exposure interacts with local retreat programs to create patterns of risk containment or migration, looking at who participates in managed retreat and where they relocate.',
            'By tracking household relocations, the study highlights critical challenges in current buyout policies, showing that while buyouts remove people from immediate risk, systemic inequalities often lead to participants resettling in areas with similar environmental vulnerabilities.'
        ],
        pubStatus: 'Forthcoming in RSF: Russell Sage Foundation Journal of Social Sciences.',
        doiLink: '',
        media: []
    },
    'blowin-wind': {
        category: 'In Progress',
        categoryClass: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
        topic: 'Residential Instability',
        title: "Blowin' in the Wind: Disaggregating Patterns of Residential Relocation Following Four Major Hurricanes",
        authors: 'A. Alexander Priest',
        venue: 'Prepared for the 2026 Population Association of America meeting',
        abstracts: [
            "This solo-authored paper leverages restricted consumer reference data to track the address-to-address relocation of nearly four million households impacted by major hurricanes. We examine how displacement patterns differ by socio-economic class, demographic profile, and local storm severity, uncovering previously hidden disparities in post-storm recovery journeys.",
            "The findings emphasize that residential instability is highly stratified, with lower-income households experiencing longer periods of instability and less successful long-term resettlement outcomes compared to higher-income counterparts."
        ],
        pubStatus: 'Working Paper. Prepared for presentation at the 2026 Population Association of America meeting.',
        doiLink: '',
        media: []
    },
    'race-relocation': {
        category: 'In Progress',
        categoryClass: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
        topic: 'Qualitative Study',
        title: "How People (Don't) Talk about Race in Climate Relocation",
        authors: 'Kevin Loughran, James R. Elliott, Phylicia Lee Brown, and A. Alexander Priest',
        venue: 'Working Paper / Nationwide Qualitative Study',
        abstracts: [
            "This nationwide qualitative study investigates how government buyout programs intersect with racialized landscapes and ideologies of colorblindness. Through interviews and thematic analysis, we look at how administrators and residents describe—and avoid describing—racial dynamics in buyout implementation and relocation decisions.",
            "Our research reveals how colorblind language masks systemic racial disparities in buyout acquisitions and highlights the need for more racially conscious policy design in climate adaptation programs."
        ],
        pubStatus: 'Working Paper. Under review.',
        doiLink: '',
        media: []
    },
    'toxic-fear': {
        category: 'Published • 2026',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Natech Disasters',
        title: 'Toxic Fear: Climate, Contamination, and Worries about Future Flooding in Coastal Industrial Communities',
        authors: 'James R. Elliott, Phylicia Lee Brown, Stephen J. Brown, and A. Alexander Priest',
        venue: 'Natural Hazards Review',
        abstracts: [
            "Published in Natural Hazards Review. This study investigates racial and ethnic disparities in reports of contamination during Hurricane Harvey and its influence on future flooding worries.",
            "We demonstrate how exposure to industrial contamination compounds psychological distress and alters risk perceptions, heightening fears of future flooding among historically marginalized coastal residents near industrial corridors."
        ],
        pubStatus: 'Published in Natural Hazards Review.',
        doiLink: '#',
        media: []
    },
    'here-there': {
        category: 'Published • 2025',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Climate Adaptation',
        title: 'Here, There and Everywhere: Residential Relocation Following a Natural Disaster',
        authors: 'A. Alexander Priest',
        venue: 'Spatial Demography',
        abstracts: [
            "As climate-driven hazards increase in frequency and severity, residential relocation is increasingly viewed as a primary mechanism for climate adaptation. However, not all relocations are equal. Using highly granular consumer reference data, this study examines the spatial and demographic patterns of post-disaster mobility. By tracking address-to-address changes of affected households, the research reveals how the severity of localized flooding interacts with existing socio-economic inequalities to fundamentally shape who gets to move, and where they end up.",
            "Findings indicate that while affluent households leverage mobility to significantly reduce their future risk exposure, historically marginalized communities frequently face 'lateral' or 'downward' mobility, relocating to neighborhoods with similar or even compounding environmental and economic vulnerabilities."
        ],
        pubStatus: 'Published in Spatial Demography. Available to read via Springer Link.',
        doiLink: '#',
        media: [
            { source: 'The New York Times', quote: '"Who actually gets to escape the flood zone?"', link: '#' },
            { source: 'Grist', quote: '"The hidden inequality of climate retreat."', link: '#' }
        ]
    },
    'multiplicity-impact': {
        category: 'Published • 2023',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Environmental Justice',
        title: 'The Multiplicity of Impact: How Social Marginalization Compounds Climate Disasters',
        authors: 'James R. Elliott and A. Alexander Priest',
        venue: 'Environmental Sociology',
        abstracts: [
            "Published in Environmental Sociology. This article reveals how racial marginalization leads to a greater number and wider range of disaster impacts for households of color and their networks.",
            "We demonstrate how social vulnerability does not just affect immediate damage but ripples through personal support networks, exacerbating long-term inequality and slowing household recovery."
        ],
        pubStatus: 'Published in Environmental Sociology.',
        doiLink: '#',
        media: []
    },
    'under-pressure': {
        category: 'Published • 2023',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Social Capital',
        title: 'Under Pressure: Social Capital and Trust in Government After Natural Disasters',
        authors: 'A. Alexander Priest',
        venue: 'Social Currents',
        abstracts: [
            "Published in Social Currents. This solo-authored article explores how an impact to households' close-tie networks acts as a form of collective trauma, significantly reducing trust in government after natural disasters.",
            "Using survey data, we trace the network pathways through which disaster distress decays political trust, highlighting the importance of community infrastructure during recovery."
        ],
        pubStatus: 'Published in Social Currents.',
        doiLink: '#',
        media: []
    }
};

let lastClickedCard = null;

function openProject(event, projectId) {
    event.preventDefault();
    const card = event.currentTarget;
    lastClickedCard = card;

    const project = PROJECTS[projectId];
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

        // Update Abstracts
        const detailAbstract = document.getElementById('project-detail-abstract');
        if (detailAbstract) {
            detailAbstract.innerHTML = project.abstracts.map(para => `<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">${para}</p>`).join('\n');
        }

        // Update Publication link box
        const pubBlock = document.getElementById('project-detail-pub-block');
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
                    <a href="${m.link || '#'}" class="group flex items-start gap-3 p-3 -mx-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 material-transition font-normal no-underline">
                        <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 transition">${m.source}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${m.quote}</p>
                        </div>
                    </a>
                `).join('\n');
            } else {
                mediaBlock.classList.add('hidden');
                mediaLinks.innerHTML = '';
            }
        }
    }

    // 1. "Press Down" Physical Interaction
    card.style.transform = 'scale(0.96)';
    card.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
        const mainView = document.getElementById('main-view');
        const projectView = document.getElementById('project-view');
        const scrollFog = document.getElementById('scroll-fog');

        // Spring the card back visually as the whole page prepares to slide
        card.style.transform = 'scale(1)';

        // Push the main home page down and fade out (Sliding UI out of the way)
        mainView.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        mainView.style.transform = 'translateY(40px) scale(0.98)';
        mainView.style.opacity = '0';

        // Swap content after fade out
        setTimeout(() => {
            mainView.classList.add('hidden');
            
            projectView.classList.remove('hidden');
            scrollFog.classList.remove('hidden');
            
            window.scrollTo({ top: 0, behavior: 'instant' });
            void projectView.offsetWidth; // Force browser reflow

            // Slide project view up and fade in
            projectView.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
            projectView.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            
            // Fade in scroll fog
            scrollFog.classList.remove('opacity-0');
            scrollFog.classList.add('opacity-100');
            
        }, 400); 
    }, 150); // Wait for the physical "press down" to finish
}


function closeProject(targetSectionId = null) {
    const mainView = document.getElementById('main-view');
    const projectView = document.getElementById('project-view');
    const scrollFog = document.getElementById('scroll-fog');

    // Hide actual project view text and fog
    projectView.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    projectView.classList.add('opacity-0', 'translate-y-12', 'scale-95');
    scrollFog.classList.remove('opacity-100');
    scrollFog.classList.add('opacity-0');

    // Slide main view back up
    setTimeout(() => {
        projectView.classList.add('hidden');
        scrollFog.classList.add('hidden');
        mainView.classList.remove('hidden');

        if (targetSectionId === 'top') {
            window.scrollTo({ top: 0, behavior: 'instant' });
        } else if (targetSectionId && targetSectionId !== '#') {
            // Native scrollIntoView strictly respects the scroll-mt-36 classes we added!
            const targetEl = document.querySelector(targetSectionId);
            if (targetEl) targetEl.scrollIntoView({ behavior: 'instant' });
        } else {
            const researchSection = document.getElementById('research');
            researchSection.scrollIntoView({ behavior: 'instant' });
        }

        void mainView.offsetWidth;
        
        // Pull main view back up into place
        mainView.style.transform = 'translateY(0) scale(1)';
        mainView.style.opacity = '1';

    }, 400); 
}

// Project View Scroll Fog Listener (Hides when near bottom)
window.addEventListener('scroll', () => {
    const fog = document.getElementById('scroll-fog');
    if (fog && !fog.classList.contains('hidden')) {
        // Check if user has scrolled near the bottom of the document
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

        // Intercept Home links to guarantee they hit Absolute Zero
        if (targetId === '#hero') {
            e.preventDefault();
            if (!projectView.classList.contains('hidden')) {
                closeProject('top');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return; // Stop execution here
        }

        // Intercept standard nav links ONLY if the project view is open
        if (!projectView.classList.contains('hidden')) {
            e.preventDefault(); // Stop standard browser jump
            closeProject(targetId); // Close project and beautifully route to the tab
        }
    });
});

// --- Light/Dark Mode Toggle Logic ---
const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

// Listen for toggle button clicks (Updates logic to handle both Desktop and Mobile buttons)
themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // If a preference was previously set in local storage
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        } else {
            // If no preference is set, default to swapping whatever the system is
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
