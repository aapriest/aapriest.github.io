const PROJECTS_DATA = {
    'revolving-door': {
        id: 'revolving-door',
        category: 'Forthcoming • Summer 2026',
        categoryClass: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300',
        topic: 'Managed Retreat',
        title: 'The Revolving Door of Risk: Climate Hazards, Risk Containment and the Hidden Social Dynamics of Managed Retreat',
        authors: 'James R. Elliott, Kevin Loughran, Phylicia Lee Brown, and A. Alexander Priest',
        affiliation: 'Rice University & University of Alberta',
        venue: 'RSF: Russell Sage Foundation Journal of Social Sciences',
        abstracts: [
            'This study investigates the social dynamics of managed retreat and the "revolving door" of climate risk. We analyze how climate hazard exposure interacts with local retreat programs to create patterns of risk containment or migration, looking at who participates in managed retreat and where they relocate.',
            'By tracking household relocations, the study highlights critical challenges in current buyout policies, showing that while buyouts remove people from immediate risk, systemic inequalities often lead to participants resettling in areas with similar environmental vulnerabilities.'
        ],
        pubStatus: 'Forthcoming in RSF: Russell Sage Foundation Journal of Social Sciences.',
        doiLink: '',
        media: [],
        keywords: ['Managed retreat', 'Buyouts', 'Environmental hazards', 'Climate migration'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-indigo-100/50 dark:bg-indigo-900/20',
        cardIcon: `<svg class="w-14 h-14 text-indigo-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2V15"></path></svg>`,
        badgeColor: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300'
    },
    'blowin-wind': {
        id: 'blowin-wind',
        category: 'In Progress',
        categoryClass: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
        topic: 'Residential Instability',
        title: "Blowin' in the Wind: Disaggregating Patterns of Residential Relocation Following Four Major Hurricanes",
        authors: 'A. Alexander Priest',
        affiliation: 'University of Alberta',
        venue: 'Prepared for the 2026 Population Association of America meeting',
        abstracts: [
            "This solo-authored paper leverages restricted consumer reference data to track the address-to-address relocation of nearly four million households impacted by major hurricanes. We examine how displacement patterns differ by socio-economic class, demographic profile, and local storm severity, uncovering previously hidden disparities in post-storm recovery journeys.",
            "The findings emphasize that residential instability is highly stratified, with lower-income households experiencing longer periods of instability and less successful long-term resettlement outcomes compared to higher-income counterparts."
        ],
        pubStatus: 'Working Paper. Prepared for presentation at the 2026 Population Association of America meeting.',
        doiLink: '',
        media: [],
        keywords: ['Displacement', 'Hurricanes', 'Consumer reference data', 'Residential instability'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-cyan-100/50 dark:bg-cyan-900/20',
        cardIcon: `<svg class="w-14 h-14 text-cyan-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>`,
        badgeColor: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
    },
    'race-relocation': {
        id: 'race-relocation',
        category: 'In Progress',
        categoryClass: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
        topic: 'Qualitative Study',
        title: "How People (Don't) Talk about Race in Climate Relocation",
        authors: 'Kevin Loughran, James R. Elliott, Phylicia Lee Brown, and A. Alexander Priest',
        affiliation: 'Temple University, Rice University & University of Alberta',
        venue: 'Working Paper / Nationwide Qualitative Study',
        abstracts: [
            "This nationwide qualitative study investigates how government buyout programs intersect with racialized landscapes and ideologies of colorblindness. Through interviews and thematic analysis, we look at how administrators and residents describe—and avoid describing—racial dynamics in buyout implementation and relocation decisions.",
            "Our research reveals how colorblind language masks systemic racial disparities in buyout acquisitions and highlights the need for more racially conscious policy design in climate adaptation programs."
        ],
        pubStatus: 'Working Paper. Under review.',
        doiLink: '',
        media: [],
        keywords: ['Race and ethnicity', 'Colorblindness', 'Buyouts', 'Qualitative methods'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-orange-100/50 dark:bg-orange-900/20',
        cardIcon: `<svg class="w-14 h-14 text-orange-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>`,
        badgeColor: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
    },
    'toxic-fear': {
        id: 'toxic-fear',
        category: 'Published • 2026',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Natech Disasters',
        title: 'Toxic Fear: Climate, Contamination, and Worries about Future Flooding in Coastal Industrial Communities',
        authors: 'James R. Elliott, Phylicia Lee Brown, Stephen J. Brown, and A. Alexander Priest',
        affiliation: 'Rice University & University of Alberta',
        venue: 'Natural Hazards Review',
        abstracts: [
            "This study investigates racial and ethnic disparities in reports of contamination during Hurricane Harvey and its influence on future flooding worries among coastal residents living in industrial corridors.",
            "We demonstrate how exposure to industrial contamination compounds psychological distress and alters risk perceptions, heightening fears of future flooding among historically marginalized coastal residents near industrial corridors."
        ],
        pubStatus: 'Published in Natural Hazards Review.',
        doiLink: '#',
        media: [],
        keywords: ['Natech disasters', 'Contamination', 'Environmental justice', 'Risk perception'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-rose-100/50 dark:bg-rose-900/20',
        cardIcon: `<svg class="w-14 h-14 text-rose-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
        badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
    },
    'here-there': {
        id: 'here-there',
        category: 'Published • 2025',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Climate Adaptation',
        title: 'Here, There and Everywhere: Residential Relocation Following a Natural Disaster',
        authors: 'A. Alexander Priest',
        affiliation: 'University of Alberta',
        venue: 'Spatial Demography',
        abstracts: [
            "Residential relocation has become an ascendant form of climate adaptation as households and communities across the United States grapple with the effects of environmental hazards intensified by climate change. However, research on relocation often relies on county-level measures of net population change, overlooking crucial spatial and temporal nuances in how racial privilege and inequality shape residential relocation patterns at a local level. For these reasons, recent reviews of the literature have called for innovative, spatially, and temporally granular research on relocation as climate adaptation.",
            "To address this gap, I leverage restricted, longitudinal consumer reference data to track 832,212 unique households' annual address-to-address residential movements before and after the impact of Hurricane Harvey on Harris County, Texas. Using 3x3 meter flood data aggregated to the block-group level, I examine how the severity of flooding affects averaged, yearly block-group rates of residential relocation, how those effects persist over time, and how these processes are moderated by climate apartheid. I find that extreme flooding within majority Black, Hispanic, or Asian block groups results in increases in residential relocation for up to two years following Hurricane Harvey. Lower levels of flooding and flooding within majority-White and no-majority block groups does not affect residential relocation. These results provide insight into how, even when inundated with similar levels of flooding, racialized socio-spatial environmental inequalities, indicative of climate apartheid, produce divergent relocation outcomes between majority White, no-majority, and majority Black, Hispanic, or Asian spaces."
        ],
        pubStatus: 'Published in Spatial Demography. Available to read via Springer Link.',
        doiLink: 'https://doi.org/10.1007/s40980-025-00140-8',
        media: [
            { source: 'The New York Times', quote: '"Who actually gets to escape the flood zone?"', link: '#' },
            { source: 'Grist', quote: '"The hidden inequality of climate retreat."', link: '#' }
        ],
        keywords: ['Environmental hazards', 'Relocation', 'Racial inequality', 'Climate change'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-blue-100/50 dark:bg-blue-900/20',
        cardIcon: `<svg class="w-14 h-14 text-blue-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
        badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
    },
    'multiplicity-impact': {
        id: 'multiplicity-impact',
        category: 'Published • 2023',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Environmental Justice',
        title: 'The Multiplicity of Impact: How Social Marginalization Compounds Climate Disasters',
        authors: 'James R. Elliott and A. Alexander Priest',
        affiliation: 'Rice University & University of Alberta',
        venue: 'Environmental Sociology',
        abstracts: [
            "This article reveals how racial marginalization leads to a greater number and wider range of disaster impacts for households of color and their networks.",
            "We demonstrate how social vulnerability does not just affect immediate damage but ripples through personal support networks, exacerbating long-term inequality and slowing household recovery."
        ],
        pubStatus: 'Published in Environmental Sociology.',
        doiLink: '#',
        media: [],
        keywords: ['Social marginalization', 'Environmental justice', 'Disaster impact', 'Coping mechanisms'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-emerald-100/50 dark:bg-emerald-900/20',
        cardIcon: `<svg class="w-14 h-14 text-emerald-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
        badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
    },
    'under-pressure': {
        id: 'under-pressure',
        category: 'Published • 2023',
        categoryClass: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
        topic: 'Social Capital',
        title: 'Under Pressure: Social Capital and Trust in Government After Natural Disasters',
        authors: 'A. Alexander Priest',
        affiliation: 'University of Alberta',
        venue: 'Social Currents',
        abstracts: [
            "This solo-authored article explores how an impact to households' close-tie networks acts as a form of collective trauma, significantly reducing trust in government after natural disasters.",
            "Using survey data, we trace the network pathways through which disaster distress decays political trust, highlighting the importance of community infrastructure during recovery."
        ],
        pubStatus: 'Published in Social Currents.',
        doiLink: '#',
        media: [],
        keywords: ['Social capital', 'Political trust', 'Disaster recovery', 'Social networks'],
        email: 'aapriest@ualberta.ca',
        cardColor: 'bg-purple-100/50 dark:bg-purple-950/20',
        cardIcon: `<svg class="w-14 h-14 text-purple-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
        badgeColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
    }
};
