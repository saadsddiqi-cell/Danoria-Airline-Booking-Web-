/* ═══════════════════════════════════════════
   DANORIA — Main Application State (app.js)
   ═══════════════════════════════════════════ */
// 1. Data Registry of 15 Countries
const countries = {
    pakistan: {
        name: 'Pakistan',
        lat: 33.68, lng: 73.04,
        code: 'ISB', price: '$499',
        beauty: {
            nature: 'Featuring the majestic Karakoram (K2), Hunza Valley, and serene alpine lakes like Saif-ul-Muluk.',
            ecosystem: 'Diverse climates ranging from coastal mangrove forests in the south to high altitude snow leopard territories in the north.',
            architecture: 'Rich historic spectrum covering ancient Indus Valley civilizations (Mohenjo-daro), magnificent Mughal monuments (Badshahi Mosque), and modern landmarks like the Faisal Mosque.'
        },
        images: [
            'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=400&q=80', // K2/Mountain
            'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&q=80'  // Faisal Mosque
        ],
        hotels: [
            { name: 'Serena Hotel', city: 'Islamabad', rating: '5.0 ★' },
            { name: 'Pearl Continental', city: 'Lahore', rating: '4.8 ★' },
            { name: 'Avari Towers', city: 'Karachi', rating: '4.7 ★' }
        ],
        flights: ['DN101 ISB→DXB 09:30', 'DN102 ISB→LHR 14:00', 'DN103 ISB→JFK 22:15']
    },
    usa: {
        name: 'United States',
        lat: 40.71, lng: -74.00,
        code: 'JFK', price: '$299',
        beauty: {
            nature: 'Encompasses giant Sequoia forests, the vast geological marvel of the Grand Canyon, and Yellowstone geysers.',
            ecosystem: 'Vast biological zones including Alaskan tundra, Pacific rainforests, arid deserts, and the tropical Florida Everglades.',
            architecture: 'Famous modern steel and glass skyscrapers of New York City and Chicago, contrasted with historic colonial townhouses.'
        },
        images: [
            'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80', // NYC
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80'  // Grand Canyon
        ],
        hotels: [
            { name: 'The Plaza', city: 'New York', rating: '4.9 ★' },
            { name: 'Beverly Hills Hotel', city: 'Los Angeles', rating: '4.9 ★' }
        ],
        flights: ['DN201 JFK→LHR 08:30', 'DN202 JFK→IST 12:45', 'DN203 JFK→NRT 21:00']
    },
    canada: {
        name: 'Canada',
        lat: 43.65, lng: -79.38,
        code: 'YYZ', price: '$350',
        beauty: {
            nature: 'Home to the brilliant turquoise waters of Lake Louise, massive Rocky Mountains, and the powerful Niagara Falls.',
            ecosystem: 'Vast boreal forests, active subarctic tundra zones, and rich coastal ocean life home to whales and bald eagles.',
            architecture: 'Features modern CN Tower skyline architecture alongside European historical quarters in Montreal and Quebec City.'
        },
        images: [
            'https://images.unsplash.com/photo-1489447068241-b3490214e879?w=400&q=80', // CN Tower
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80'  // Lake/Mountains
        ],
        hotels: [
            { name: 'Fairmont Royal York', city: 'Toronto', rating: '4.8 ★' },
            { name: 'Hotel Chateau Frontenac', city: 'Quebec', rating: '4.9 ★' }
        ],
        flights: ['DN301 YYZ→FRA 10:00', 'DN302 YYZ→DXB 20:30']
    },
    germany: {
        name: 'Germany',
        lat: 52.52, lng: 13.40,
        code: 'BER', price: '$420',
        beauty: {
            nature: 'Beautiful Rhine Valley, mystical trails of the Black Forest, and snowcapped Bavarian Alpine peaks.',
            ecosystem: 'Lush temperate deciduous woodlands, river wetland basins, and protected coastal wadden mudflats.',
            architecture: 'Fairy-tale medieval castles like Neuschwanstein, alongside reconstructed modernist architectural designs in Berlin.'
        },
        images: [
            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80', // Castle
            'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80'  // Berlin Gate
        ],
        hotels: [
            { name: 'Hotel Adlon Kempinski', city: 'Berlin', rating: '4.9 ★' },
            { name: 'The Charles Hotel', city: 'Munich', rating: '4.7 ★' }
        ],
        flights: ['DN401 BER→DXB 11:15', 'DN402 BER→CMB 19:45']
    },
    turkey: {
        name: 'Turkey',
        lat: 41.00, lng: 28.97,
        code: 'IST', price: '$450',
        beauty: {
            nature: 'Includes the fairy chimneys of Cappadocia, mineral travertine pools of Pamukkale, and pristine Mediterranean coasts.',
            ecosystem: 'Unique junction of Mediterranean, Aegean, and Black Sea marine biology with diverse Anatolian steppe wildlife.',
            architecture: 'Historic synthesis of Byzantine and Islamic masterpieces like Hagia Sophia, Sultanahmet Mosque, and Topkapi Palace.'
        },
        images: [
            'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80', // Cappadocia
            'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&q=80'  // Hagia Sophia
        ],
        hotels: [
            { name: 'Ciragan Palace Kempinski', city: 'Istanbul', rating: '5.0 ★' },
            { name: 'Museum Hotel', city: 'Cappadocia', rating: '4.9 ★' }
        ],
        flights: ['DN501 IST→ISB 08:30', 'DN502 IST→MLE 16:00', 'DN503 IST→JFK 23:30']
    },
    thailand: {
        name: 'Thailand',
        lat: 13.75, lng: 100.50,
        code: 'BKK', price: '$390',
        beauty: {
            nature: 'White sand shorelines of Phuket, limestone karsts of Phang Nga Bay, and emerald northern jungles of Chiang Mai.',
            ecosystem: 'Lush tropical rainforest canopy habitats teeming with monkeys, elephants, and complex coral reefs in the Andaman Sea.',
            architecture: 'Glimmering gold leaf Buddhist temples (Wat Arun, Wat Phra Kaew) and historic structures of Ayutthaya.'
        },
        images: [
            'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80', // Bangkok Temple
            'https://images.unsplash.com/photo-1528181304800-2f5333a24751?w=400&q=80'  // Island
        ],
        hotels: [
            { name: 'Mandarin Oriental', city: 'Bangkok', rating: '5.0 ★' },
            { name: 'The Pavilions Resort', city: 'Phuket', rating: '4.8 ★' }
        ],
        flights: ['DN601 BKK→KUL 10:45', 'DN602 BKK→HND 18:30']
    },
    malaysia: {
        name: 'Malaysia',
        lat: 3.13, lng: 101.68,
        code: 'KUL', price: '$380',
        beauty: {
            nature: '130-million-year-old Taman Negara rainforest, cool Cameron Highlands tea hills, and diverse Mt. Kinabalu climb.',
            ecosystem: 'Megadiverse biogeographic hotspots containing rare orangutans, hornbills, and marine turtle conservation centers.',
            architecture: 'Petronas Twin Towers defining modern skyline, alongside colonial structures in Penang and Malacca.'
        },
        images: [
            'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=400&q=80', // KL Tower
            'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=400&q=80'  // Beach
        ],
        hotels: [
            { name: 'Shangri-La Hotel', city: 'Kuala Lumpur', rating: '4.9 ★' },
            { name: 'Eastern & Oriental', city: 'Penang', rating: '4.7 ★' }
        ],
        flights: ['DN701 KUL→SIN 09:00', 'DN702 KUL→CMB 15:45']
    },
    sri_lanka: {
        name: 'Sri Lanka',
        lat: 6.92, lng: 79.86,
        code: 'CMB', price: '$370',
        beauty: {
            nature: 'Scenic Ella mountain peaks, cascade waterfalls, Ella rock gap, and golden sand beaches of Mirissa.',
            ecosystem: 'High density of leopard reserves in Yala, whale migratory routes, and protected wetlands.',
            architecture: 'Historic citadel of Sigiriya Rock Fortress, stone caves of Dambulla, and colonial Dutch Fort of Galle.'
        },
        images: [
            'https://images.unsplash.com/photo-1546708973-b339540b5162?w=400&q=80', // Tea fields
            'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=400&q=80'  // Sigiriya
        ],
        hotels: [
            { name: 'Galle Face Hotel', city: 'Colombo', rating: '4.8 ★' },
            { name: 'Heritance Kandalama', city: 'Dambulla', rating: '4.9 ★' }
        ],
        flights: ['DN801 CMB→MLE 08:30', 'DN802 CMB→ISB 17:00']
    },
    uae: {
        name: 'United Arab Emirates',
        lat: 25.20, lng: 55.27,
        code: 'DXB', price: '$460',
        beauty: {
            nature: 'Vast red deserts of Rub al Khali, rugged rocky mountains of Hatta, and marine mangrove reserves.',
            ecosystem: 'Desert-adapted flora, gazelles, falcons, and coastal artificial marine reefs protecting coastal bays.',
            architecture: 'Ultra-modern marvels including the tallest building Burj Khalifa, Palm Jumeirah, and Sheikh Zayed Grand Mosque.'
        },
        images: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', // Dubai
            'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=80'  // Desert
        ],
        hotels: [
            { name: 'Burj Al Arab', city: 'Dubai', rating: '5.0 ★' },
            { name: 'Atlantis The Palm', city: 'Dubai', rating: '4.9 ★' }
        ],
        flights: ['DN901 DXB→JFK 07:30', 'DN902 DXB→ISB 13:45', 'DN903 DXB→MLE 22:00']
    },
    indonesia: {
        name: 'Indonesia',
        lat: -8.40, lng: 115.18,
        code: 'DPS', price: '$410',
        beauty: {
            nature: 'Active volcanoes like Mount Bromo, volcanic lakes (Lake Toba), and rice terrace landscapes of Ubud.',
            ecosystem: 'Megadiverse archipelago home to prehistoric Komodo Dragons, Orangutans, and marine Coral Triangle habitats.',
            architecture: 'Ancient Buddhist structures like Borobudur Temple, Prambanan shrines, and unique Balinese wood architectures.'
        },
        images: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', // Bali
            'https://images.unsplash.com/photo-1588668214407-6eb95a7042f0?w=400&q=80'  // Borobudur
        ],
        hotels: [
            { name: 'Ayana Resort Bali', city: 'Bali', rating: '4.9 ★' },
            { name: 'Hotel Indonesia Kempinski', city: 'Jakarta', rating: '4.8 ★' }
        ],
        flights: ['DN111 DPS→SIN 09:30', 'DN112 DPS→HND 21:00']
    },
    georgia: {
        name: 'Georgia',
        lat: 41.71, lng: 44.82,
        code: 'TBS', price: '$480',
        beauty: {
            nature: 'Snowy peaks of Mount Kazbek, mineral valleys of Borjomi, and vine-growing wine valleys of Kakheti.',
            ecosystem: 'Alpine meadows, thermal mineral springs, and dense mountain forest woodlands of the Caucasus range.',
            architecture: 'Narikala Fortress overlooking Tbilisi, medieval stone defensive towers in Svaneti, and historic churches.'
        },
        images: [
            'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80', // Tbilisi
            'https://images.unsplash.com/photo-1549877452-9c387954fbc2?w=400&q=80'  // Kazbegi Church
        ],
        hotels: [
            { name: 'Radisson Blu', city: 'Tbilisi', rating: '4.8 ★' },
            { name: 'Rooms Hotel Kazbegi', city: 'Kazbegi', rating: '4.9 ★' }
        ],
        flights: ['DN121 TBS→IST 10:15', 'DN122 TBS→BER 17:30']
    },
    nepal: {
        name: 'Nepal',
        lat: 27.71, lng: 85.32,
        code: 'KTM', price: '$440',
        beauty: {
            nature: 'Dominates the world summit with Mount Everest, Annapurna ranges, and sub-tropical valleys of Pokhara.',
            ecosystem: 'Extends from high altitude snow leopard territories down to tropical tiger grasslands in Chitwan National Park.',
            architecture: 'Pagodas of Durbar Square (Kathmandu, Patan, Bhaktapur) and historic stupas like Swayambhunath.'
        },
        images: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80', // Kathmandu stupa
            'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400&q=80'  // Himalayas
        ],
        hotels: [
            { name: "Dwarika's Hotel", city: 'Kathmandu', rating: '4.9 ★' },
            { name: 'The Pavilions Himalayas', city: 'Pokhara', rating: '4.8 ★' }
        ],
        flights: ['DN131 KTM→DEL 08:00', 'DN132 KTM→DXB 16:30']
    },
    maldives: {
        name: 'Maldives',
        lat: 4.17, lng: 73.50,
        code: 'MLE', price: '$590',
        beauty: {
            nature: 'White sand atolls, turquoise lagoons, and crystal clear ocean expanses.',
            ecosystem: 'Lush coral reef lagoons home to manta rays, whale sharks, and reef fish.',
            architecture: 'World-famous overwater wooden villas, sand-floor eco-pavilions, and sub-surface underwater restaurants.'
        },
        images: [
            'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80', // Maldives Beach
            'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80'  // Aerial Atoll
        ],
        hotels: [
            { name: 'Soneva Jani', city: 'Noonu Atoll', rating: '5.0 ★' },
            { name: 'Conrad Rangali', city: 'South Ari Atoll', rating: '4.9 ★' }
        ],
        flights: ['DN141 MLE→CMB 09:30', 'DN142 MLE→DXB 18:00']
    },
    japan: {
        name: 'Japan',
        lat: 35.67, lng: 139.65,
        code: 'HND', price: '$550',
        beauty: {
            nature: 'Snowy peak of Mount Fuji, seasonal cherry blossoms (Sakura), and bamboo forests of Arashiyama in Kyoto.',
            ecosystem: 'Subtropical islands in Okinawa contrasted with heavy snowfall evergreen forests in Hokkaido.',
            architecture: 'Centuries-old wooden Shinto shrines and temples, standing beside modern neon-lit high-tech skyscrapers in Tokyo.'
        },
        images: [
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80', // Tokyo
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80'  // Kyoto Temple
        ],
        hotels: [
            { name: 'Park Hyatt Tokyo', city: 'Tokyo', rating: '4.9 ★' },
            { name: 'Hoshinoya Kyoto', city: 'Kyoto', rating: '5.0 ★' }
        ],
        flights: ['DN151 HND→JFK 11:30', 'DN152 HND→BKK 19:00']
    },
    egypt: {
        name: 'Egypt',
        lat: 30.04, lng: 31.23,
        code: 'CAI', price: '$470',
        beauty: {
            nature: 'Great Sahara Sand dunes, fertile Nile Delta valley, and Red Sea coral reefs in Sharm El Sheikh.',
            ecosystem: 'Arid desert ecosystems populated by gazelles, desert foxes, and highly diverse marine biology in the Red Sea.',
            architecture: 'Monumental ancient structures including the Pyramids of Giza, Sphinx, Luxor Temples, and Islamic Cairo.'
        },
        images: [
            'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400&q=80', // Pyramids
            'https://images.unsplash.com/photo-1572252009286-268acec5a0af?w=400&q=80'  // Nile / Cairo
        ],
        hotels: [
            { name: 'Marriott Mena House', city: 'Cairo', rating: '4.9 ★' },
            { name: 'Four Seasons Resort', city: 'Sharm El Sheikh', rating: '4.8 ★' }
        ],
        flights: ['DN161 CAI→IST 10:30', 'DN162 CAI→DXB 22:00']
    }
};
// 2. Global State Variables
window.selectedFromCountry = '';
window.selectedToCountry = '';
let currentUser = null;
let selectedFlight = null;
let selectedSeat = null;
let base64Photo = '';
let toastCount = 0;
let activeSelectorTab = 'departure'; // 'departure' or 'arrival'
// Setup database on startup (using localStorage wrapper)
const DB = {
    saveBooking: (booking) => {
        let bookings = JSON.parse(localStorage.getItem('danoria_bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('danoria_bookings', JSON.stringify(bookings));
    },
    getBookings: () => {
        return JSON.parse(localStorage.getItem('danoria_bookings') || '[]');
    },
    saveUser: (user) => {
        let users = JSON.parse(localStorage.getItem('danoria_users') || '[]');
        users.push(user);
        localStorage.setItem('danoria_users', JSON.stringify(users));
    },
    findUser: (email, password) => {
        let users = JSON.parse(localStorage.getItem('danoria_users') || '[]');
        return users.find(u => u.email === email && u.password === password);
    },
    getBookedSeats: (flightCode) => {
        let bookings = DB.getBookings();
        return bookings
            .filter(b => b.flightCode === flightCode)
            .map(b => b.seat);
    }
};
// 3. Initial Boot Up
document.addEventListener('DOMContentLoaded', () => {
    buildCountrySelectorGrid();
    initLoaderScreen();
    initAuthSystem();
    initInteractionEvents();
    populateFormSelectors();
    initScrollAnimations();
    restoreUserSession();
});

// Restore saved session if exists
function restoreUserSession() {
    fetch('api_auth.php?action=session')
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success' && data.loggedIn) {
            currentUser = data.user;
            localStorage.setItem('danoria_current_user', JSON.stringify(currentUser));
            
            const userGreeting = document.getElementById('userGreeting');
            const btnLogout = document.getElementById('btnLogout');
            const navBookBtn = document.getElementById('navActionsBookBtn');
            const btnMyBookings = document.getElementById('btnMyBookings');
            
            if (userGreeting) {
                userGreeting.textContent = `Hi, ${currentUser.name}`;
                userGreeting.style.display = 'inline';
            }
            if (btnLogout) btnLogout.style.display = 'inline-block';
            if (btnMyBookings) btnMyBookings.style.display = 'inline-block';
            if (navBookBtn) navBookBtn.style.display = 'none';
            
            // Wait for canvas elements to register then trigger load
            setTimeout(() => {
                window.globeModule.init(countries, handleGlobeMarkerClicked);
                updateGridHighlights();
            }, 300);
        } else {
            currentUser = null;
            localStorage.removeItem('danoria_current_user');
            setTimeout(() => {
                window.globeModule.init(countries, handleGlobeMarkerClicked);
            }, 300);
        }
    })
    .catch(() => {
        const savedUser = localStorage.getItem('danoria_current_user');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            const userGreeting = document.getElementById('userGreeting');
            const btnLogout = document.getElementById('btnLogout');
            const navBookBtn = document.getElementById('navActionsBookBtn');
            const btnMyBookings = document.getElementById('btnMyBookings');
            
            if (userGreeting) {
                userGreeting.textContent = `Hi, ${currentUser.name}`;
                userGreeting.style.display = 'inline';
            }
            if (btnLogout) btnLogout.style.display = 'inline-block';
            if (btnMyBookings) btnMyBookings.style.display = 'inline-block';
            if (navBookBtn) navBookBtn.style.display = 'none';
        }
        setTimeout(() => {
            window.globeModule.init(countries, handleGlobeMarkerClicked);
            if (currentUser) updateGridHighlights();
        }, 300);
    });
}

// Fade in homepage elements as they scroll in
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
// Loader screen animations
function initLoaderScreen() {
    const bar = document.getElementById('loaderProgress');
    const loader = document.getElementById('loader');
    let p = 0;
    const progressInterval = setInterval(() => {
        p += 5 + Math.random() * 15;
        if (p > 100) p = 100;
        bar.style.width = p + '%';
        if (p >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                // Initiate Auth Overlay shortly after loader closes
                setTimeout(() => {
                    const authOverlay = document.getElementById('authOverlay');
                    if (authOverlay && !currentUser) authOverlay.classList.add('visible');
                }, 500);
            }, 300);
        }
    }, 100);
}
// 4. Country Selector Sidebar Grid
function buildCountrySelectorGrid() {
    const grid = document.getElementById('countryGrid');
    if (!grid) return;
    const flags = {
        pakistan: '🇵🇰', usa: '🇺🇸', canada: '🇨🇦', germany: '🇩🇪', turkey: '🇹🇷',
        thailand: '🇹🇭', malaysia: '🇲🇾', sri_lanka: '🇱🇰', uae: '🇦🇪', indonesia: '🇮🇩',
        georgia: '🇬🇪', nepal: '🇳🇵', maldives: '🇲🇻', japan: '🇯🇵', egypt: '🇪🇬'
    };
    grid.innerHTML = '';
    Object.entries(countries).forEach(([key, d]) => {
        const btn = document.createElement('button');
        btn.className = 'country-btn';
        btn.dataset.country = key;
        btn.innerHTML = `
            <span class="country-flag">${flags[key] || '🌍'}</span>
            <span class="country-name">${d.name}</span>
            <span class="country-price">From ${d.price}</span>
        `;
        grid.appendChild(btn);
    });
}
// Populate search drop downs dynamically
function populateFormSelectors() {
    const fromSelect = document.getElementById('fromCountrySelect');
    const toSelect = document.getElementById('toCountrySelect');
    if (!fromSelect || !toSelect) return;
    fromSelect.innerHTML = '<option value="">Choose Origin...</option>';
    toSelect.innerHTML = '<option value="">Choose Destination...</option>';
    Object.entries(countries).forEach(([key, c]) => {
        const optFrom = document.createElement('option');
        optFrom.value = key;
        optFrom.textContent = `${c.name} (${c.code})`;
        fromSelect.appendChild(optFrom);
        const optTo = document.createElement('option');
        optTo.value = key;
        optTo.textContent = `${c.name} (${c.code})`;
        toSelect.appendChild(optTo);
    });
}
// 5. Auth Logic
function initAuthSystem() {
    const authOverlay = document.getElementById('authOverlay');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const toggleAuth = document.getElementById('toggleAuth');
    const nameField = document.getElementById('nameField');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authFooter = document.getElementById('authFooter');
    const authForm = document.getElementById('authForm');
    let isLoginMode = true;
    function toggleMode() {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            nameField.style.display = 'none';
            authSubmitBtn.textContent = 'Log In';
            authFooter.innerHTML = `Don't have an account? <a id="toggleAuth">Register</a>`;
        } else {
            tabLogin.classList.remove('active');
            tabRegister.classList.add('active');
            nameField.style.display = 'block';
            authSubmitBtn.textContent = 'Create Account';
            authFooter.innerHTML = `Already have an account? <a id="toggleAuth">Log In</a>`;
        }
        document.getElementById('toggleAuth').addEventListener('click', toggleMode);
    }
    if (toggleAuth) toggleAuth.addEventListener('click', toggleMode);
    if (tabLogin) tabLogin.addEventListener('click', () => { if (!isLoginMode) toggleMode(); });
    if (tabRegister) tabRegister.addEventListener('click', () => { if (isLoginMode) toggleMode(); });
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('authName')?.value?.trim() || '';
    const email = document.getElementById('authEmail')?.value?.trim() || '';
    const password = document.getElementById('authPassword')?.value || '';
    console.log('DEBUG:', { name, email, password, isLoginMode });
            
            authSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            authSubmitBtn.disabled = true;
            
            const payload = {
                action: isLoginMode ? 'login' : 'register',
                email: email,
                password: password
            };
            if (!isLoginMode) {
                payload.name = name;
            }
            
            fetch('api_auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                authSubmitBtn.innerHTML = isLoginMode ? 'Log In' : 'Create Account';
                authSubmitBtn.disabled = false;
                
                if (data.status === 'success') {
                    currentUser = data.user;
                    localStorage.setItem('danoria_current_user', JSON.stringify(currentUser));
                    
                    authOverlay.classList.remove('visible');
                    // Fire up ThreeJS inside globe.js
                    window.globeModule.init(countries, handleGlobeMarkerClicked);
                    // Update UI greeting
                    const userGreeting = document.getElementById('userGreeting');
                    const btnLogout = document.getElementById('btnLogout');
                    const btnMyBookings = document.getElementById('btnMyBookings');
                    const navBookBtn = document.getElementById('navActionsBookBtn');
                    
                    if (userGreeting) {
                        userGreeting.textContent = `Hi, ${currentUser.name}`;
                        userGreeting.style.display = 'inline';
                    }
                    if (btnLogout) btnLogout.style.display = 'inline-block';
                    if (btnMyBookings) btnMyBookings.style.display = 'inline-block';
                    if (navBookBtn) navBookBtn.style.display = 'none';
                    showToast(isLoginMode ? `Welcome back explorer, ${currentUser.name}!` : `Welcome explorer, ${currentUser.name}!`, 'success');
                    updateGridHighlights();
                } else {
                    showToast(data.message, 'error');
                }
            })
            .catch(err => {
                showToast('Authentication failed. Please check network/database connectivity.', 'error');
                authSubmitBtn.innerHTML = isLoginMode ? 'Log In' : 'Create Account';
                authSubmitBtn.disabled = false;
            });
        });
    }
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            fetch('api_auth.php?action=logout')
            .then(() => {
                currentUser = null;
                localStorage.removeItem('danoria_current_user');
                location.reload();
            });
        });
    }
}
// 6. UI Interactions & Details Side Panel
function handleGlobeMarkerClicked(key) {
    if (activeSelectorTab === 'departure') {
        selectOriginCountry(key);
        switchSelectorTab('arrival');
        showToast(`Departure set: ${countries[key].name}. Now select a destination!`, 'info');
    } else {
        if (window.selectedFromCountry === key) {
            clearSelections();
            showToast(`Selections cleared!`, 'info');
        } else {
            selectDestinationCountry(key);
        }
    }
}
function selectOriginCountry(key) {
    window.selectedFromCountry = key;
    document.getElementById('fromCountrySelect').value = key;
    
    // Update marker coloring on globe
    window.globeModule.setSelectionStates(window.selectedFromCountry, window.selectedToCountry);
    window.globeModule.flyToCountry(key);
    updateSelectedCountryLabel(key, "origin");
    showBeautyDetailsPanel(key);
    updateGridHighlights();
}
function selectDestinationCountry(key) {
    if (!window.selectedFromCountry) {
        selectOriginCountry(key);
        return;
    }
    
    window.selectedToCountry = key;
    document.getElementById('toCountrySelect').value = key;
    
    // Update marker coloring and draw path line
    window.globeModule.setSelectionStates(window.selectedFromCountry, window.selectedToCountry);
    window.globeModule.drawRoute(window.selectedFromCountry, window.selectedToCountry);
    window.globeModule.flyToCountry(key);
    updateSelectedCountryLabel(key, "destination");
    showBeautyDetailsPanel(key);
    showAvailableFlightsPanel(window.selectedFromCountry, key);
    updateGridHighlights();
    
    // Auto scroll down to the available flight and hotel area smoothly
    
}

function updateGridHighlights() {
    document.querySelectorAll('.country-btn').forEach(btn => {
        const key = btn.dataset.country;
        btn.classList.remove('active-origin', 'active-destination', 'active');
        if (key === window.selectedFromCountry) {
            btn.classList.add('active-origin');
        }
        if (key === window.selectedToCountry) {
            btn.classList.add('active-destination');
        }
    });
}
function clearSelections() {
    window.selectedFromCountry = '';
    window.selectedToCountry = '';
    document.getElementById('fromCountrySelect').value = '';
    document.getElementById('toCountrySelect').value = '';
    
    document.querySelectorAll('.country-btn').forEach(btn => btn.classList.remove('active', 'active-origin', 'active-destination'));
    document.getElementById('selectedCountry').textContent = 'Hover the globe';
    document.getElementById('flightInfo').classList.remove('visible');
    document.getElementById('beautyPanel').classList.remove('visible');
    window.globeModule.clearRoute();
    window.globeModule.setSelectionStates('', '');
    window.globeModule.pauseRotation(false);
}
function updateSelectedCountryLabel(key, role) {
    const d = countries[key];
    if (!d) return;
    const label = document.getElementById('selectedCountry');
    if (role === "origin") {
        label.innerHTML = `From: <span style="color:#f97316; font-weight:700;">${d.name}</span>`;
    } else {
        const fromName = countries[window.selectedFromCountry].name;
        label.innerHTML = `<span style="color:#f97316;">${fromName}</span> ✈ <span style="color:#10b981; font-weight:700;">${d.name}</span>`;
    }
}
// Side Panel Beautiful Data Display
function showBeautyDetailsPanel(key) {
    const data = countries[key];
    if (!data) return;
    const panel = document.getElementById('beautyPanel');
    const beautyText = document.getElementById('beautyText');
    const imagesGrid = document.getElementById('beautyImagesGrid');
    const hotelList = document.getElementById('hotelList');
    beautyText.textContent = data.beauty.nature; // Default tab is nature
    
    // Set tabs active class
    const tabs = document.querySelectorAll('.beauty-tab-btn');
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === 0);
        // Bind click events
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const type = tab.dataset.type;
            beautyText.textContent = data.beauty[type];
        };
    });
    // Populate images
    imagesGrid.innerHTML = data.images.map(img => `
        <div class="beauty-image-wrapper">
            <img src="${img}" alt="${data.name} landscape" onerror="this.src='https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=400&q=80'">
        </div>
    `).join('');
    // Populate hotels list
    hotelList.innerHTML = data.hotels.map(h => `
        <div class="hotel-card">
            <div>
                <div class="hotel-name">${h.name}</div>
                <div class="hotel-city">${h.city}</div>
            </div>
            <div class="hotel-rating">${h.rating}</div>
        </div>
    `).join('');
    panel.classList.add('visible');
}
function showAvailableFlightsPanel(fromKey, toKey) {
    const fromData = countries[fromKey];
    const toData   = countries[toKey];
    if (!fromData || !toData) return;
 
    const panel = document.getElementById('flightInfo');
    const list  = document.getElementById('flightList');
    const count = document.getElementById('flightCount');
 
    panel.classList.add('visible');
    list.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--dark-500);"><i class="fas fa-spinner fa-spin"></i> Loading flights...</div>';
    count.textContent = '';
 
    const cabinClass = document.querySelector('input[name="flightClass"]:checked')?.value || 'economy';
 
    fetch(`api_flights.php?action=get_price&from=${fromData.code}&to=${toData.code}&class=${cabinClass}`)
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            count.textContent = `${data.flights.length} flight${data.flights.length !== 1 ? 's' : ''}`;
            list.innerHTML = data.flights.map(f => `
                <div class="flight-route" onclick="window.openBookingPage('${f.flight_code}', '${fromData.name} to ${toData.name}', '${f.price}', '${fromData.code}', '${toData.code}')">
                    <span class="route-code">${f.flight_code}</span>
                    <span class="route-dots"><i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i></span>
                    <span class="route-path">${fromData.code} → ${toData.code}</span>
                    <span class="route-time">${f.departure_time}</span>
                    <span style="font-size:.8rem;font-weight:700;color:var(--success);margin-left:auto;">${f.price}</span>
                </div>
            `).join('');
        } else {
            list.innerHTML = `<div style="text-align:center;padding:1rem;color:var(--error);">${data.message}</div>`;
        }
    })
    .catch(() => {
        list.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--error);">Failed to load flights.</div>';
    });
 
    // ── NO auto-scroll here. Results appear in the side panel only. ──
}
window.openBookingPage = function(flightCode, destName, price, fromCode, toCode) {
    if (!currentUser) {
        showToast('Please log in to book flights!', 'error');
        const authOverlay = document.getElementById('authOverlay');
        if (authOverlay) authOverlay.classList.add('visible');
        return;
    }
 
    const depDate    = document.getElementById('departureDate')?.value  || '';
    const retDate    = document.getElementById('returnDate')?.value     || '';
    const cabinClass = document.querySelector('input[name="flightClass"]:checked')?.value || 'economy';
 
    // Read the passenger dropdown — e.g. "2 Adults" or "2 Adults, 1 Child"
    const paxSelect  = document.getElementById('passengers');
    const paxValue   = paxSelect ? paxSelect.value : '1 Adult';
 
    const url = `booking.html`
        + `?flight=${encodeURIComponent(flightCode)}`
        + `&route=${encodeURIComponent(destName)}`
        + `&price=${encodeURIComponent(price)}`
        + `&depDate=${encodeURIComponent(depDate)}`
        + `&retDate=${encodeURIComponent(retDate)}`
        + `&class=${encodeURIComponent(cabinClass)}`
        + `&from=${encodeURIComponent(fromCode || '')}`
        + `&to=${encodeURIComponent(toCode   || '')}`
        + `&pax=${encodeURIComponent(paxValue)}`;
 
    window.location.href = url;
};
// 7. Booking Modal, Seat Selection & Identity Forms
window.openBookingModal = function(flightCode, destName, price) {
    if (!currentUser) {
        showToast('Please log in to book flights!', 'error');
        document.getElementById('authOverlay').classList.add('visible');
        return;
    }
    selectedFlight = { code: flightCode, dest: destName, price: price };
    selectedSeat = null;
    const summary = document.getElementById('bookingFlightSummary');
    summary.innerHTML = `
        <div>
            <div style="font-weight:700;color:var(--white)">${destName}</div>
            <div style="font-size:.85rem;color:var(--dark-500)">Flight: ${flightCode}</div>
        </div>
        <div class="flight-price">${price}</div>
    `;
    // Pre-fill fields if logged in
    document.getElementById('bookingEmail').value = currentUser.email;
    document.getElementById('passengerName').value = currentUser.name;
    document.getElementById('passportId').value = '';
    document.getElementById('cnicId').value = '';
    
    // Clear Photo Uploads
    base64Photo = '';
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('uploadPlaceholderText').style.display = 'block';
    // Build Seat Grid
    buildSeatSelectorGrid(flightCode);
    document.getElementById('bookingModal').classList.add('visible');
};

function getFlightOccupiedSeats(flightCode) {
    // Create a simple deterministic hash of the flight code
    let hash = 0;
    for (let i = 0; i < flightCode.length; i++) {
        hash = flightCode.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const rows = 8;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    const occupied = [];
    
    // Generate about 35% random occupied seats deterministically
    let seed = Math.abs(hash);
    for (let r = 1; r <= rows; r++) {
        cols.forEach(col => {
            // Simple pseudo-random check based on seed
            seed = (seed * 9301 + 49297) % 233280;
            const rand = seed / 233280;
            if (rand < 0.35) { // 35% occupancy rate
                occupied.push(`${r}${col}`);
            }
        });
    }
    return occupied;
}

function buildSeatSelectorGrid(flightCode) {
    const grid = document.getElementById('seatGrid');
    if (!grid) return;
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:1rem;color:var(--dark-500);"><i class="fas fa-spinner fa-spin"></i> Loading Seat Map...</div>';
    
    fetch(`api_bookings.php?action=booked_seats&flightCode=${encodeURIComponent(flightCode)}`)
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            const dbBooked = data.seats;
            const randomOccupied = getFlightOccupiedSeats(flightCode);
            // Merge both and remove duplicates
            const allOccupied = [...new Set([...dbBooked, ...randomOccupied])];
            
            grid.innerHTML = '';
            const rows = 8;
            const seatsPerRow = ['A', 'B', 'C', '', 'D', 'E', 'F']; // empty string represents aisle
            for (let r = 1; r <= rows; r++) {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'seat-row';
                // Row number label
                const rowLabel = document.createElement('div');
                rowLabel.className = 'seat-row-label';
                rowLabel.textContent = r;
                rowDiv.appendChild(rowLabel);
                seatsPerRow.forEach(col => {
                    if (col === '') {
                        // Aisle Spacer
                        const aisle = document.createElement('div');
                        aisle.className = 'seat-aisle';
                        rowDiv.appendChild(aisle);
                    } else {
                        const seatName = `${r}${col}`;
                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = 'seat-btn';
                        
                        if (allOccupied.includes(seatName)) {
                            btn.classList.add('occupied');
                            btn.textContent = '✖';
                            btn.title = `Seat ${seatName} (Occupied)`;
                        } else {
                            btn.classList.add('available');
                            btn.textContent = seatName;
                            btn.title = `Seat ${seatName} (Available)`;
                            // Click handler
                            btn.addEventListener('click', () => {
                                // Clear previous selection
                                document.querySelectorAll('.seat-btn.selected').forEach(s => {
                                    s.classList.remove('selected');
                                    s.classList.add('available');
                                });
                                selectedSeat = seatName;
                                btn.classList.remove('available');
                                btn.classList.add('selected');
                                
                                document.getElementById('selectedSeatNumber').textContent = seatName;
                            });
                        }
                        rowDiv.appendChild(btn);
                    }
                });
                grid.appendChild(rowDiv);
            }
            document.getElementById('selectedSeatNumber').textContent = 'None';
        }
    })
    .catch(() => {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:1rem;color:var(--error);"><i class="fas fa-exclamation-circle"></i> Error loading seating map.</div>';
    });
}

function processFinalBooking() {
    const passport = document.getElementById('passportId').value;
    const cnic = document.getElementById('cnicId').value;
    const email = document.getElementById('bookingEmail').value;
    const name = document.getElementById('passengerName').value;
    if (!name || name.trim() === '') {
        showToast('Please enter passenger full name', 'error');
        return;
    }
    if (!passport || passport.trim() === '') {
        showToast('Valid Passport ID is required for international travel', 'error');
        return;
    }
    if (!cnic || cnic.trim() === '') {
        showToast('National ID / CNIC is required', 'error');
        return;
    }
    if (!selectedSeat) {
        showToast('Please select a seat from the seating map', 'error');
        return;
    }
    if (!base64Photo) {
        showToast('Please upload a passport photo', 'error');
        return;
    }
    const btn = document.getElementById('confirmBookingBtn');
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Booking Ticket...';
    btn.disabled = true;
    
    // Save record into database
    const pnr = 'DN' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const depDate = document.getElementById('departureDate')?.value || new Date().toLocaleDateString();
    
    const bookingRecord = {
        action: 'save',
        pnr,
        flightCode: selectedFlight.code,
        route: selectedFlight.dest,
        price: selectedFlight.price,
        passengerName: name,
        passportId: passport,
        cnicId: cnic,
        photoBase64: base64Photo,
        email: email,
        seat: selectedSeat,
        bookingDate: depDate
    };
    
    fetch('api_bookings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingRecord)
    })
    .then(res => res.json())
    .then(data => {
        btn.innerHTML = '<span>Confirm & Send Email</span> <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        
        if (data.status === 'success') {
            document.getElementById('bookingModal').classList.remove('visible');
            showToast(`Booking Successful! PNR: ${pnr}`, 'success');

            // Send e-ticket email via PHPMailer
            fetch('send_ticket_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toEmail:       email,
                    passengerName: name,
                    pnr,
                    flightCode:    selectedFlight.code,
                    route:         selectedFlight.dest,
                    cabinClass:    'Economy',
                    fare:          selectedFlight.price,
                    totalPrice:    selectedFlight.price,
                    bookingDate:   depDate,
                    duration:      selectedFlight.duration || '',
                    departureTime: selectedFlight.departure_time || '',
                    paymentMethod: 'card',
                    passengers:    [{ name, seat: selectedSeat, type: 'adult' }],
                })
            })
            .then(r => r.json())
            .then(res => {
                if (res.status === 'success') {
                    showToast('E-ticket sent to your email!', 'success');
                } else {
                    console.warn('Email failed:', res.message);
                }
            })
            .catch(err => console.warn('Email error:', err));

            clearSelections();
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(() => {
        btn.innerHTML = '<span>Confirm & Send Email</span> <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        showToast('Checkout failed. Please check network/database connectivity.', 'error');
    });
}
// 8. Photo Upload Handling (Convert to Base64 for database storage)
function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file only', 'error');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
        base64Photo = evt.target.result;
        
        const preview = document.getElementById('photoPreview');
        const text = document.getElementById('uploadPlaceholderText');
        
        preview.src = base64Photo;
        preview.style.display = 'block';
        text.style.display = 'none';
        
        showToast('Passport Photo Uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
}
// 9. Event Hooks Initialization
function initInteractionEvents() {
    // Globe interactions dispatch custom custom events
    window.addEventListener('globe-hover', e => {
        const d = e.detail;
        document.getElementById('selectedCountry').innerHTML = `
            <span style="color:#fff">${d.name}</span> 
            <span style="color:var(--primary)">From ${d.price}</span>
        `;
        window.globeModule.highlight(d.key);
    });
    window.addEventListener('globe-hover-clear', () => {
        if (!window.selectedFromCountry) {
            document.getElementById('selectedCountry').textContent = 'Hover the globe';
        } else {
            updateSelectedCountryLabel(window.selectedFromCountry, window.selectedToCountry ? "destination" : "origin");
        }
    });
    // Zoom buttons
    document.getElementById('zoomIn').addEventListener('click', () => window.globeModule.zoom('in'));
    document.getElementById('zoomOut').addEventListener('click', () => window.globeModule.zoom('out'));
    // Day night button
    document.getElementById('dayNightToggle').addEventListener('click', function() {
        const btn = this;
        btn.classList.toggle('night');
        const isNight = btn.classList.contains('night');
        window.globeModule.toggleDayNight(isNight);
    });
    // Country Grid panel buttons click
    document.getElementById('countryGrid').addEventListener('click', e => {
        const btn = e.target.closest('.country-btn');
        if (btn) {
            const key = btn.dataset.country;
            handleGlobeMarkerClicked(key);
        }
    });
    // Country sidebar Search functionality
    document.getElementById('destinationSearch').addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.country-btn').forEach(btn => {
            const name = btn.querySelector('.country-name').textContent.toLowerCase();
            btn.style.display = name.includes(term) ? 'flex' : 'none';
        });
    });
    // Dropdown selectors in form
    document.getElementById('fromCountrySelect').addEventListener('change', e => {
        const key = e.target.value;
        if (key) selectOriginCountry(key);
    });
    
    document.getElementById('toCountrySelect').addEventListener('change', e => {
        const key = e.target.value;
        if (key) selectDestinationCountry(key);
    });
    // Search Flights booking form submit
    document.getElementById('bookingForm').addEventListener('submit', e => {
        e.preventDefault();
        const from = document.getElementById('fromCountrySelect').value;
        const to = document.getElementById('toCountrySelect').value;
        if (!from || !to) {
            showToast('Please select both Origin and Destination countries first', 'error');
            return;
        }
        const btn = document.getElementById('btnSearch');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Querying Route...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = `<i class="fas fa-check"></i> Flights Available!`;
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            showToast(`Flights found! Select a flight in the available list.`, 'success');
            
            // Scroll to selection
            document.getElementById('countrySelector').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-search"></i> Search Flights';
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
    // Booking modal confirmation trigger
    document.getElementById('confirmBookingBtn').addEventListener('click', processFinalBooking);
    // Photo upload event triggers
    const uploadArea = document.getElementById('photoUploadArea');
    const photoFileInput = document.getElementById('photoFileInput');
    if (uploadArea && photoFileInput) {
        uploadArea.addEventListener('click', () => photoFileInput.click());
        photoFileInput.addEventListener('change', handlePhotoSelect);
    }
    // Modal closes
    const closeBooking = document.getElementById('closeBooking');
    if (closeBooking) {
        closeBooking.addEventListener('click', () => {
            document.getElementById('bookingModal').classList.remove('visible');
        });
    }
    // Explore / Auto Rotate button trigger
    document.getElementById('exploreBtn').addEventListener('click', () => {
        clearSelections();
        window.globeModule.pauseRotation(false);
        showToast('Auto-rotation resumed. Drag the globe to explore manually!', 'info');
    });
    // Hamburger Mobile Menu
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
        document.getElementById('mobileMenuBtn').classList.toggle('active');
    });
    document.getElementById('scrollIndicator').addEventListener('click', () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    });
    // Popular trending destination clicks
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', () => {
            const d = card.dataset.dest;
            if (d && countries[d]) {
                selectDestinationCountry(d);
            }
        });
    });

    // Selector tabs click listeners
    const tabDepartureBtn = document.getElementById('tabDepartureBtn');
    const tabArrivalBtn = document.getElementById('tabArrivalBtn');
    
    function switchSelectorTab(tab) {
        activeSelectorTab = tab;
        if (!tabDepartureBtn || !tabArrivalBtn) return;
        if (tab === 'departure') {
            tabDepartureBtn.classList.add('active');
            tabArrivalBtn.classList.remove('active');
        } else {
            tabDepartureBtn.classList.remove('active');
            tabArrivalBtn.classList.add('active');
        }
    }
    window.switchSelectorTab = switchSelectorTab;

    if (tabDepartureBtn && tabArrivalBtn) {
        tabDepartureBtn.addEventListener('click', () => switchSelectorTab('departure'));
        tabArrivalBtn.addEventListener('click', () => switchSelectorTab('arrival'));
    }
    // Refresh flight prices when cabin class changes
    document.querySelectorAll('input[name="flightClass"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (window.selectedFromCountry && window.selectedToCountry) {
                showAvailableFlightsPanel(window.selectedFromCountry, window.selectedToCountry);
            }
        });
    });

    // Trigger auth overlay if redirected from booking page while logged out
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('triggerAuth') && !currentUser) {
        setTimeout(() => {
            const authOverlay = document.getElementById('authOverlay');
            if (authOverlay) authOverlay.classList.add('visible');
        }, 800);
    }

    // My Bookings history modal controllers
    const btnMyBookings = document.getElementById('btnMyBookings');
    const myBookingsModal = document.getElementById('myBookingsModal');
    const closeMyBookings = document.getElementById('closeMyBookings');
    const myBookingsList = document.getElementById('myBookingsList');

    if (btnMyBookings && myBookingsModal && closeMyBookings) {
        btnMyBookings.addEventListener('click', () => {
            if (!currentUser) return;
            
            myBookingsList.innerHTML = `
                <div style="text-align:center;padding:2rem;color:var(--dark-500);">
                    <i class="fas fa-spinner fa-spin" style="font-size:2rem;margin-bottom:1rem;"></i>
                    <p>Fetching your bookings from database...</p>
                </div>`;
            myBookingsModal.classList.add('visible');
            
            fetch('api_bookings.php?action=list')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success' && data.bookings.length > 0) {
                    myBookingsList.innerHTML = data.bookings.map(b => {
    const seats = (b.passengers || []).map(p => p.seat).join(', ') || 'N/A';
    const names = (b.passengers || []).map(p => p.name).join(', ') || 'N/A';
    const isCancelled = b.status === 'cancelled';
    const statusBadge = isCancelled
        ? `<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;background:rgba(239,68,68,0.12);color:#ef4444;letter-spacing:.5px;">CANCELLED</span>`
        : `<span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600;background:rgba(16,185,129,0.12);color:#10b981;letter-spacing:.5px;">CONFIRMED</span>`;
    return `
        <div class="ticket-card" style="${isCancelled ? 'opacity:0.65;' : ''}">
            <div class="ticket-info">
                <div class="ticket-route">${b.route} &nbsp;${statusBadge}</div>
                <div class="ticket-meta">
                    <span>PNR: <strong>${b.pnr}</strong></span>
                    <span>Flight: <strong>${b.flightCode}</strong></span>
                    <span>Passenger: <strong>${names}</strong></span>
                    <span>Seat: <strong>${seats}</strong></span>
                    <span>Date: <strong>${b.date}</strong></span>
                    <span>Fare: <strong>${b.totalPrice}</strong></span>
                </div>
            </div>
            <div class="ticket-actions">
                <button class="btn-ticket-print" onclick="window.printTicket('${b.pnr}')" ${isCancelled ? 'disabled style="opacity:.5;cursor:not-allowed;"' : ''}><i class="fas fa-print"></i> E-Ticket</button>
                ${!isCancelled ? `<button class="btn-ticket-cancel" onclick="window.cancelBooking('${b.pnr}', '${encodeURIComponent(names)}', '${encodeURIComponent(b.route)}', '${encodeURIComponent(b.flightCode)}', '${encodeURIComponent(b.totalPrice)}', '${encodeURIComponent(b.date)}')" style="background:rgba(239,68,68,0.1);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:.45rem 1.1rem;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;"><i class="fas fa-times-circle"></i> Cancel</button>` : ''}
            </div>
        </div>
    `;
}).join('');
                } else {
                    myBookingsList.innerHTML = `
                        <div class="no-bookings">
                            <i class="fas fa-ticket-alt" style="font-size:2rem;margin-bottom:1rem;color:var(--dark-600)"></i>
                            <p>No bookings found in database for your account.</p>
                        </div>`;
                }
            })
            .catch(() => {
                myBookingsList.innerHTML = `
                    <div class="no-bookings">
                        <i class="fas fa-exclamation-circle" style="font-size:2rem;margin-bottom:1rem;color:var(--error)"></i>
                        <p>Failed to connect to database. Please check your XAMPP Apache/MySQL server.</p>
                    </div>`;
            });
        });

        closeMyBookings.addEventListener('click', () => {
            myBookingsModal.classList.remove('visible');
        });
    }

    window.cancelBooking = function(pnr, encodedName, encodedRoute, encodedFlight, encodedFare, encodedDate) {
        if (!confirm(`Are you sure you want to cancel booking ${pnr}?\n\nThis action cannot be undone.`)) return;

        fetch('api_bookings.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'cancel', pnr })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                // Refresh the bookings list
                btnMyBookings.click();

                // Send cancellation email
                const userEmail = currentUser?.email || '';
                if (userEmail) {
                    fetch('send_ticket_email.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type:          'cancellation',
                            toEmail:       userEmail,
                            passengerName: decodeURIComponent(encodedName),
                            pnr,
                            flightCode:    decodeURIComponent(encodedFlight),
                            route:         decodeURIComponent(encodedRoute),
                            fare:          decodeURIComponent(encodedFare),
                            bookingDate:   decodeURIComponent(encodedDate),
                        })
                    })
                    .then(r => r.json())
                    .then(res => console.log('Cancellation email:', res.message))
                    .catch(err => console.warn('Email error:', err));
                }
            } else {
                alert('Cancellation failed: ' + (data.message || 'Unknown error'));
            }
        })
        .catch(() => alert('Failed to connect. Please check your server.'));
    };

    window.printTicket = function(pnr) {
    fetch('api_bookings.php?action=list')
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            const b = data.bookings.find(x => x.pnr === pnr);
            if (!b) return;

            const w = window.open('', '_blank');
            const passengersHTML = (b.passengers || []).map((p, i) => `
                <div class="row">
                    <div class="col">
                        <div class="label">Passenger ${i + 1}</div>
                        <div class="val">${p.name}</div>
                    </div>
                    <div class="col">
                        <div class="label">Seat</div>
                        <div class="val" style="color:#10b981;font-size:18px;">${p.seat}</div>
                    </div>
                    <div class="col">
                        <div class="label">Passport / ID</div>
                        <div class="val">${p.passport}</div>
                    </div>
                </div>
            `).join('');

            w.document.write(`
                <html>
                <head>
                    <title>Danoria Airways — E-Ticket ${b.pnr}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Poppins', sans-serif; background: #fafafa; padding: 20px; }
                        .ticket { max-width: 640px; margin: 30px auto; background: white; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #0ea5e9, #06b6d4); color: white; padding: 25px; display: flex; justify-content: space-between; align-items: center; }
                        .header h2 { margin: 0; font-size: 24px; }
                        .body { padding: 30px; }
                        .pnr { font-size: 18px; font-weight: 700; color: #fff; background: rgba(0,0,0,0.15); padding: 4px 12px; border-radius: 4px; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 20px; gap: 1rem; }
                        .col { flex: 1; }
                        .label { font-size: 11px; text-transform: uppercase; color: #888; font-weight: 600; margin-bottom: 4px; }
                        .val { font-size: 15px; font-weight: 600; color: #333; }
                        .divider { border-top: 2px dashed #eee; margin: 25px 0; }
                        .barcode { text-align: center; margin-top: 20px; }
                        .barcode-bars { height: 40px; background: repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 8px); margin: 0 auto 10px; max-width: 300px; }
                        .barcode-num { font-family: monospace; letter-spacing: 4px; color: #555; }
                        .pax-section { background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
                        .pax-title { font-size: 11px; text-transform: uppercase; color: #0ea5e9; font-weight: 700; margin-bottom: 12px; letter-spacing: 1px; }
                        .print-btn { background: #0ea5e9; color: white; padding: 10px 20px; font-weight: 600; border-radius: 8px; border: none; cursor: pointer; display: block; margin: 20px auto; font-family: inherit; font-size: 15px; }
                        @media print { .print-btn { display: none; } }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <div class="header">
                            <div>
                                <h2>Danoria Airways</h2>
                                <div style="font-size:12px;opacity:0.8;">E-Ticket Boarding Pass</div>
                            </div>
                            <div class="pnr">${b.pnr}</div>
                        </div>
                        <div class="body">
                            <div class="row">
                                <div class="col">
                                    <div class="label">Flight Route</div>
                                    <div class="val">${b.route}</div>
                                </div>
                                <div class="col">
                                    <div class="label">Flight Code</div>
                                    <div class="val">${b.flightCode}</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="label">Date of Travel</div>
                                    <div class="val">${b.date}</div>
                                </div>
                                <div class="col">
                                    <div class="label">Cabin Class</div>
                                    <div class="val">${b.cabinClass || 'Economy'}</div>
                                </div>
                                <div class="col">
                                    <div class="label">Total Fare</div>
                                    <div class="val" style="color:#10b981;">${b.totalPrice}</div>
                                </div>
                            </div>
                            <div class="pax-section">
                                <div class="pax-title">Passenger Details</div>
                                ${passengersHTML}
                            </div>
                            <div class="divider"></div>
                            <div class="barcode">
                                <div class="barcode-bars"></div>
                                <div class="barcode-num">*${b.pnr}*</div>
                            </div>
                        </div>
                    </div>
                    <button class="print-btn" onclick="window.print()">🖨️ Print Ticket</button>
                </body>
                </html>
            `);
            w.document.close();
        }
    });
  };
}
// 10. Toast Messaging System
function showToast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    t.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`;
    
    t.style.top = (90 + toastCount * 65) + 'px';
    document.body.appendChild(t);
    toastCount++;
    gsap.fromTo(t, { x: 100, opacity: 0 }, {
        x: 0, opacity: 1,
        duration: .5,
        ease: 'back.out(1.7)'
    });
    setTimeout(() => {
        gsap.to(t, {
            x: 100, opacity: 0,
            duration: .3,
            onComplete: () => {
                t.remove();
                toastCount = Math.max(0, toastCount - 1);
            }
        });
    }, 3500);
}

// ═══════════════════════════════════════
// OPEN COUNTRY IN NEW TAB
// ═══════════════════════════════════════
window.openCountryPage = function(key) {
    const pageMap = {
        pakistan:  'pakistan.html',
        usa:       'usa.html',
        canada:    'canada.html',
        germany:   'germany.html',
        turkey:    'turkey.html',
        thailand:  'thailand.html',
        malaysia:  'malaysia.html',
        sri_lanka: 'sri_lanka.html',
        uae:       'uae.html',
        indonesia: 'indonesia.html',
        georgia:   'georgia.html',
        nepal:     'nepal.html',
        maldives:  'maldives.html',
        japan:     'japan.html',
        egypt:     'egypt.html'
    };
    const page = pageMap[key];
    if (page) window.open(page, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('countryGrid').addEventListener('dblclick', e => {
        const btn = e.target.closest('.country-btn');
        if (btn) window.openCountryPage(btn.dataset.country);
    });
});