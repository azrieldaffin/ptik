/* ============================
   Infokan Resep - Main JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Mobile Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Scroll Animations (Intersection Observer) ----
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ---- Recipe Category Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card-full');
    const recipeCount = document.getElementById('recipeCount');
    const recipeEmpty = document.getElementById('recipeEmpty');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active state
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            var count = 0;

            recipeCards.forEach(function (card) {
                if (filter === 'semua' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    count++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            if (recipeCount) {
                recipeCount.textContent = count;
            }

            // Tampilkan pesan kalau kategori belum punya resep
            if (recipeEmpty) {
                recipeEmpty.hidden = count !== 0;
            }
        });
    });

    // ---- Recipe Detail Modal ----
    var recipeData = {
        'ayam-bakar-kecap': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Ayam Bakar Kecap',
            desc: 'Ayam bakar kecap merupakan hidangan khas Indonesia yang memiliki cita rasa manis, gurih, dan sedikit smoky dari proses pembakaran. Ayam dimasak menggunakan bumbu rempah hingga meresap, kemudian dibakar dengan olesan kecap hingga menghasilkan aroma yang menggugah selera.',
            time: '60 menit',
            difficulty: 'Mudah',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '½ KG ayam, potong sesuai selera',
                '5 sendok makan kecap manis',
                '2 lembar daun salam',
                '1 batang serai',
                '300 ml air',
                '1 sendok makan air jeruk nipis',
                'Garam dan gula secukupnya',
                '5 siung bawang merah halus',
                '3 siung bawang putih halus',
                '3 butir kemiri',
                '1 sendok teh ketumbar',
                '1 ruas jahe'
            ],
            steps: [
                'Cuci ayam hingga bersih, lalu lumuri dengan air jeruk nipis.',
                'Haluskan seluruh bumbu halus.',
                'Tumis bumbu hingga harum, masukkan daun salam dan serai.',
                'Masukkan ayam, kecap manis, garam, gula, dan air.',
                'Masak hingga ayam empuk dan bumbu meresap.',
                'Bakar ayam sambil diolesi sisa bumbu hingga kecokelatan.',
                'Sajikan bersama nasi hangat dan sambal.'
            ],
            tips: '?.'
        },
        'rendang-daging-sapi': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Rendang Daging Sapi',
            desc: 'Rendang merupakan salah satu makanan khas Sumatera Barat yang terkenal dengan kekayaan rempahnya. Daging sapi dimasak bersama santan dan berbagai bumbu pilihan dalam waktu cukup lama hingga menghasilkan tekstur empuk serta cita rasa gurih, pedas, dan kaya rempah.',
            time: '3-4 jam',
            difficulty: 'Sulit',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '500 Gram daging sapi',
                '1 liter santan',
                '2 batang serai',
                '4 lembar daun jeruk',
                '2 lembar daun salam',
                '1 lembar daun kunyit',
                'garam secukupnya',
                '8 siung bawang merah halus',
                '5 siung bawang putih halus',
                '5 buah cabai merah',
                '3 butir kemiri',
                '1 ruas jahe',
                '2 ruas lengkuas',
                '1 sendok teh ketumbar'
            ],
            steps: [
                'Potong daging sapi sesuai ukuran yang diinginkan.',
                'Haluskan seluruh bumbu.',
                'Tumis bumbu hingga harum.',
                'Masukkan santan, serai, daun jeruk, daun salam, dan daun kunyit.',
                'Aduk perlahan hingga santan mulai mendidih.',
                'Masukkan daging sapi dan masak menggunakan api kecil.',
                'Aduk sesekali agar santan tidak pecah dan bagian bawah tidak gosong.',
                'Masak hingga daging empuk dan bumbu mengental serta berwarna kecokelatan.'
            ],
            tips: '?.'
        },
        'ayam-geprek-sambal-bawang': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Ayam Geprek Sambal Bawang',
            desc: 'Ayam geprek merupakan makanan populer yang menggabungkan ayam goreng tepung renyah dengan sambal bawang pedas. Ayam yang telah digoreng kemudian digeprek bersama sambal sehingga menghasilkan perpaduan rasa gurih, renyah, dan pedas.',
            time: '40 Menit',
            difficulty: 'Mudah',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '2 potong ayam',
                '100 Gram tepung terigu',
                '50 Gram tepung maizena',
                '1 butir telur',
                '½ sentok teh lada',
                'Garam Secukupnya',
                'Minyak goreng',
                '10 buah cabai rawit',
                '3 siung bawang putih',
                '½ sendok teh garam',
                'Sedikit gula',
                '2 sendok makan minyak panas',
            ],
            steps: [
                'Bumbui ayam dengan garam dan lada.',
                'Celupkan ayam ke dalam telur.',
                'Balurkan ayam ke campuran tepung terigu dan maizena.',
                'Goreng ayam hingga matang dan berwarna keemasan.',
                'Haluskan cabai rawit, bawang putih, garam, dan gula.',
                'Siram sambal dengan minyak panas.',
                'Letakkan ayam di atas sambal dan geprek hingga sedikit hancur.',
                'Sajikan dengan nasi putih dan lalapan.'
            ],
            tips: '?.'
        },
        'mie-goreng-jawa': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Mie Goreng Jawa',
            desc: 'Mie goreng Jawa merupakan hidangan berbahan dasar mi yang dimasak dengan bumbu khas tradisional. Rasanya cenderung gurih dan manis dengan aroma bawang yang kuat. Tambahan telur, ayam, dan sayuran membuat hidangan ini semakin lengkap dan mengenyangkan.',
            time: '25 Menit',
            difficulty: 'Mudah',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '2 bungkus mi telur',
                '2 butir telur',
                '100 Gram ayam suwir',
                '1 batang daun bawang',
                '1 genggam kol',
                '1 buah wortel',
                '2 sendok makan kecap manis',
                'Garam dan lada secukupnuya',
                '4 siung bawang merah halus',
                '3 siung bawang putih',
                '2 butir kemiri',
                '½ sendok teh merica',
            ],
            steps: [
                'Rebus mi hingga setengah matang, kemudian tiriskan.',
                'Tumis bumbu halus hingga harum.',
                'Masukkan telur dan buat orak-arik.',
                'Tambahkan ayam suwir dan sayuran.',
                'Masukkan mi, kecap manis, garam, dan lada.',
                'Aduk hingga seluruh bahan tercampur rata.',
                'Masak hingga matang dan sajikan selagi hangat.',
            ],
            tips: '?.'
        },
        'soto-ayam-lemongan': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Soto Ayam Lamongan',
            desc: 'Soto ayam Lamongan merupakan hidangan berkuah khas Jawa Timur dengan kuah kuning yang kaya rempah. Soto ini memiliki ciri khas taburan koya yang memberikan  tekstur dan cita rasa gurih. Hidangan ini biasanya disajikan dengan suwiran ayam, telur rebus, kol, dan soun.',
            time: '60 Menit',
            difficulty: 'Sedang',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '½ KG ayam',
                '1,5 liter air',
                '2 batang serai',
                '3 lembar daun jeruk',
                '2 lembar daun salam',
                '100 Gram kol',
                '100 Gram soun',
                '2 butir telur rebus',
                'Daun bawang dan seledri',
                '6 siung bawang merah halus',
                '4 siung bawang putih',
                '3 butir kemiri',
                '1 ruas kunyit',
                '1 ruas jahe',
                '1 sendok teh ketumbar'
            ],
            steps: [
                'Rebus ayam hingga matang, kemudian angkat dan suwir-suwir.',
                'Tumis bumbu halus hingga harum.',
                'Masukkan serai, daun jeruk, dan daun salam',
                'Masukkan bumbu ke dalam air kaldu ayam',
                'Tambahkan garam dan penyedap secukupnya',
                'Masak hingga kuah mendidih dan bumbu meresap',
                'Siapkan soun, kol, suwiran ayam, dan telur dalam manguk.',
                'Siram dengan kuah panas dan tambahkan koya'
            ],
            tips: '?.'
        },
        'ikan-bahar-sambal-dabu-dabu': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Ikan Bakar Sambal Dabu-Dabu',
            desc: 'Ikan bakar sambal dabu-dabu merupakan hidangan khas Manado yang memiliki perpaduan rasa gurih, segar, dan sedikit pedas. Ikan dibakar dengan bumbu sederhana, kemudian disajikan bersama sambal dabu-dabu yang terbuat dari cabai, tomat, bawang merah, dan jeruk nipis.',
            time: '45 Menit',
            difficulty: 'Sedang',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '2 ekor ikan nila atau gurame',
                '2 sendok makan air jeruk nipis',
                '3 siung bawang putih',
                '1 sendok teh ketumbar',
                'Garam secukupnya',
                '2 sendok makan kecap manis',
                'Minyak goreng secukupnya',
                '5 buah cabai rawit',
                '3 buah tomat',
                '5 siung bawang merah',
                '1 buah jeruk nipis',
                '3 sendok makan minyak panas',
            ],
            steps: [
                'Bersihkan ikan dan lumuri dengan jeruk nipis.',
                'Haluskan bawang putih, ketumbar, dan garam.',
                'Lumuri ikan dengan bumbu dan diamkan selama 15 menit.',
                'Bakar ikan sambil diolesi kecap manis hingga matang.',
                'Potong cabai, tomat, dan bawang merah untuk sambal.',
                'Campurkan seluruh bahan sambal.',
                'Tambahkan jeruk nipis, garam, dan minyak panas.',
                'Sajikan sambal di atas ikan bakar.'
            ],
            tips: '?.'
        },
        'capcay-kuah-seafood': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Capcay Kuah Seafood',
            desc: 'Capcay kuah seafood merupakan hidangan yang menggabungkan berbagai jenis sayuran dengan tambahan udang, bakso ikan, atau cumi. Kuahnya yang gurih dan hangat membuat makanan ini cocok menjadi menu makan siang maupun malam dengan kandungan sayuran yang beragam.',
            time: '30 Menit',
            difficulty: 'Mudah',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '100 Gram udang',
                '100 Gram bakso ikan',
                '1 buah wortel',
                '100 Gram brokoli',
                '100 Gram kembang kol',
                '1 genggam sawi',
                '2 siung bawang putih',
                '½ buah bawang bombai',
                '500 ml air',
                '1 sendok makan saus tiram',
                'Garam, gula, dan lada secukupnya',
                '1 sendok makan tepung maizena, larutkan dengan sedikit air',
            ],
            steps: [
                'Cuci bersih seluruh sayuran dan potong sesuai selera.',
                'Tumis bawang putih dan bawang bombai hingga harum.',
                'Masukkan udang dan bakso ikan.',
                'Tambahkan air dan wortel, kemudian masak hingga agak empuk.',
                'Masukkan brokoli, kembang kol, dan sawi.',
                'Tambahkan saus tiram, garam, gula, dan lada.',
                'Masukkan larutan maizena untuk mengentalkan kuah.',
                'Masak hingga matang dan sajikan hangat.'
            ],
            tips: '?.'
        },
        'semur-daging-kentang': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Semur Daging Kentang',
            desc: 'Semur daging kentang merupakan makanan tradisional Indonesia yang memiliki cita rasa manis dan gurih. Daging sapi dimasak bersama kentang dan kecap manis dengan tambahan rempah-rempah sehingga menghasilkan kuah kental beraroma khas. Hidangan ini sangat cocok disantap bersama nasi putih hangat.',
            time: '75 Menit',
            difficulty: 'Sedang',
            servings: '?',
            price: 'Rp ?.000',
            ingredients: [
                '300 gram daging sapi',
                '2 buah kentang',
                '5 sdm kecap manis',
                '700 ml air',
                '2 lembar daun salam',
                '2 batang serai',
                '1 ruas kayu manis',
                'Garam dan gula secukupnya',
                '5 siung bawang merah halus',
                '4 siung bawang putih halus',
                '3 butir kemiri halus',
                '½ sdt pala bubuk halus',
                '1 sdt merica halus'
            ],
            steps: [
                'Potong daging sapi dan kentang sesuai selera.',
                'Tumis bumbu halus hingga harum.',
                'Masukkan daun salam, serai, dan kayu manis.',
                'Masukkan daging sapi dan aduk hingga berubah warna.',
                'Tambahkan air, kecap manis, garam, dan gula.',
                'Masak hingga daging mulai empuk.',
                'Masukkan kentang dan lanjutkan memasak hingga semua bahan matang.',
                'Sajikan dengan nasi putih hangat.'
            ],
            tips: '?.'
        },
        'pisang-goreng-crispy': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Pisang Goreng Crispy',
            desc: 'Pisang goreng crispy adalah camilan berbahan dasar pisang yang dibalut adonan tepung, lalu digoreng hingga keemasan. Bagian luarnya renyah, sedangkan bagian dalamnya lembut dan manis.',
            time: '15-20 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '5 buah pisang kepok',
                '100 gram tepung terigu',
                '2 sdm tepung beras',
                '1 sdm gula',
                'Sejumput garam',
                'Air secukupnya',
                'Tepung panir secukupnya',
                'Minyak goreng'
            ],
            steps: [
                'Kupas pisang dan belah menjadi dua bagian.',
                'Campurkan tepung terigu, tepung beras, gula, garam, dan air hingga menjadi adonan.',
                'Celupkan pisang ke dalam adonan tepung.',
                'Balurkan pisang dengan tepung panir.',
                'Goreng hingga berwarna kuning keemasan.',
                'Angkat dan sajikan selagi hangat.'
            ],
            tips: '?'
        },
        'cireng-bumbu-rujak': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Cireng Bumbu Rujak',
            desc: 'Cireng merupakan camilan khas Jawa Barat yang terbuat dari tepung tapioka atau aci. Teksturnya kenyal di bagian dalam dan renyah di bagian luar. Cireng nikmat disajikan dengan bumbu rujak bercita rasa pedas, manis, dan asam.',
            time: '30 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '200 gram tepung tapioka',
                '2 sdm tepung terigu',
                '2 siung bawang putih',
                '1 batang daun bawang',
                'Garam dan penyedap secukupnya',
                '200 ml air',
                'Minyak goreng'
            ],
            steps: [
                'Haluskan bawang putih, lalu rebus bersama air, garam, dan penyedap.',
                'Campurkan tepung tapioka, tepung terigu, dan daun bawang.',
                'Tuangkan air berbumbu sedikit demi sedikit sambil diaduk.',
                'Bentuk adonan sesuai selera.',
                'Goreng dengan api sedang hingga matang.',
                'Haluskan cabai rawit, gula merah, air asam jawa, dan garam. Tambahkan sedikit air, lalu sajikan bersama cireng.'
            ],
            tips: '?'
        },
        'bolu-kukus-mekar': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Bolu Kukus Mekar',
            desc: 'Bolu kukus mekar adalah kue tradisional yang bentuknya menyerupai bunga mekar. Teksturnya lembut dan empuk dengan rasa manis. Cocok disajikan sebagai teman minum teh atau kopi.',
            time: '30 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '250 gram tepung terigu',
                '200 gram gula pasir',
                '2 butir telur',
                '150 ml air soda',
                '1 sdt emulsifier',
                '1 sdt vanili',
                'Pewarna makanan sesuai selera',
            ],
            steps: [
                'Campurkan telur, gula, dan emulsifier.',
                'Mixer hingga adonan mengembang dan kental.',
                'Masukkan tepung terigu dan air soda secara bergantian.',
                'Bagi adonan menjadi beberapa bagian, lalu tambahkan pewarna.',
                'Tuangkan adonan ke dalam cetakan bolu kukus.',
                'Kukus sekitar 15–20 menit dalam kukusan yang sudah panas.',
                'Angkat dan dinginkan sebelum disajikan.'
            ],
            tips: '?'
        },
        'tahu-crispy': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Tahu Crispy',
            desc: 'Tahu crispy adalah camilan dari tahu putih yang dipotong kecil dan dilapisi adonan tepung berbumbu. Hasilnya gurih, renyah di luar, dan lembut di dalam. Bisa disajikan dengan saus sambal atau cabai bubuk.',
            time: '25 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '5 buah tahu putih',
                '100 gram tepung terigu',
                '2 sdm tepung maizena',
                '2 siung bawang putih',
                'Garam secukupnya',
                'Merica secukupnya',
                'Air secukupnya',
                'Minyak goreng'
            ],
            steps: [
                'Potong tahu menjadi ukuran kecil.',
                'Haluskan bawang putih, garam, dan merica.',
                'Campurkan tepung terigu dan maizena dengan bumbu.',
                'Tambahkan air hingga menjadi adonan cair.',
                'Celupkan tahu ke dalam adonan.',
                'Goreng hingga berwarna keemasan dan renyah.',
                'Sajikan bersama saus sambal atau kecap.'
            ],
            tips: '?'
        },
        'popcorn-caramel': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Popcorn Caramel',
            desc: 'Popcorn caramel dibuat dari jagung khusus popcorn yang mengembang ketika dipanaskan, kemudian dilapisi karamel. Rasanya manis dengan tekstur renyah, cocok dinikmati saat menonton film atau berkumpul bersama teman.',
            time: '20 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '100 gram jagung popcorn',
                '2 sdm margarin',
                '100 gram gula pasir',
                '2 sdm air',
                '1 sdm margarin tambahan'
            ],
            steps: [
                'Panaskan margarin dalam panci.',
                'Masukkan jagung popcorn dan tutup panci.',
                'Tunggu hingga jagung mengembang dan suara letupannya berhenti.',
                'Lelehkan gula bersama air menggunakan api kecil.',
                'Tambahkan margarin dan aduk hingga menjadi karamel.',
                'Tuangkan karamel ke popcorn, lalu aduk hingga merata.',
                'Dinginkan sebelum disajikan.'
            ],
            tips: '?'
        },
        'risol-mayo': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Risol Mayo',
            desc: 'Risol mayo adalah camilan berkulit tipis dengan isian mayones, telur, sosis, dan keju. Bagian luarnya dilapisi tepung panir lalu digoreng hingga renyah. Rasanya gurih dan creamy.',
            time: '45-60 menit',
            difficulty: 'Sedang',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                'Kulit: 150 gram tepung terigu, 1 butir telur, 300 ml air, 1 sdm minyak, dan sejumput garam.',
                'Isian: 3 buah sosis, 2 butir telur rebus, mayones secukupnya, dan keju parut secukupnya.',
                'Pelapis: 1 butir telur dan tepung panir secukupnya.'
            ],
            steps: [
                'Campurkan tepung terigu, telur, air, minyak, dan garam hingga rata.',
                'Buat kulit risol tipis menggunakan teflon.',
                'Potong sosis dan telur rebus menjadi bagian kecil.',
                'Letakkan isian, mayones, dan keju di atas kulit.',
                'Lipat kulit hingga membentuk risol.',
                'Celupkan ke dalam telur, lalu balurkan tepung panir.',
                'Goreng hingga berwarna keemasan dan sajikan.'
            ],
            tips: '?'
        },
        'sosis-gulung-mie': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Sosis Gulung Mie',
            desc: 'Sosis gulung mie merupakan camilan praktis yang menggabungkan sosis dan mi instan. Sosis dililit mi, kemudian digoreng hingga bagian luarnya renyah. Cocok untuk bekal maupun camilan bersama teman.',
            time: '30 menit',
            difficulty: 'Mudah',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '5 buah sosis',
                '1 bungkus mi instan',
                '1 butir telur',
                'Minyak goreng',
                'Saus sambal dan saus tomat'
            ],
            steps: [
                'Rebus mi hingga setengah matang, kemudian tiriskan.',
                'Potong sosis menjadi dua bagian jika ukurannya besar.',
                'Kocok telur dalam wadah.',
                'Lilitkan mi pada bagian tengah sosis.',
                'Celupkan ke dalam telur agar mi lebih menempel.',
                'Goreng hingga mi berwarna keemasan dan matang.',
                'Sajikan dengan saus sambal atau saus tomat.'
            ],
            tips: '?'
        },
        'klepon-isi-gula-merah': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Klepon Isi Gula Merah',
            desc: 'Klepon adalah jajanan tradisional berbentuk bola kecil berwarna hijau dari tepung ketan dan aroma pandan. Bagian tengahnya berisi gula merah, sedangkan bagian luarnya dilapisi kelapa parut. Rasanya manis dan gurih.',
            time: '40 menit',
            difficulty: 'Sedang',
            servings: '? porsi',
            price: 'Rp ?.000',
            ingredients: [
                '250 gram tepung ketan',
                '50 gram tepung beras',
                '200 ml air pandan',
                '100 gram gula merah',
                '150 gram kelapa parut',
                'Sejumput garam'
            ],
            steps: [
                'Campurkan tepung ketan dan tepung beras.',
                'Tuangkan air pandan sedikit demi sedikit hingga adonan bisa dibentuk.',
                'Potong gula merah menjadi bagian kecil.',
                'Ambil sedikit adonan, pipihkan, lalu masukkan gula merah ke tengahnya.',
                'Bulatkan adonan hingga gula merah tertutup rapat.',
                'Rebus air hingga mendidih, lalu masukkan klepon.',
                'Tunggu hingga klepon mengapung sebagai tanda matang.',
                'Angkat dan gulingkan ke dalam kelapa parut yang sudah dikukus bersama sedikit garam.'
            ],
            tips: '?'
        },
        'es-cendol': {
            emoji: '🥤',
            gradient: 'linear-gradient(135deg, #3E2723 0%, #DAA520 50%, #C41E3D 100%)',
            title: 'Es Cendol Dawet',
            desc: 'Es cendol atau dawet adalah minuman tradisional Indonesia yang terbuat dari tepung beras yang dibentuk menjadi butiran hijau kenyal, disajikan dengan santan segar dan gula merah cair. Minuman ini sangat menyegarkan di cuaca panas.',
            time: '25 menit',
            difficulty: 'Mudah',
            servings: '4 gelas',
            price: 'Rp 10.000',
            ingredients: [
                'Cendol: 100 gram tepung hunkue',
                'Cendol: 50 gram tepung beras',
                'Cendol: 500 ml air',
                'Cendol: 1 sendok teh pasta pandan (atau 5 lembar daun pandan)',
                'Cendol: ¼ sendok teh garam',
                'Kuah santan: 400 ml santan kental',
                'Kuah santan: ¼ sendok teh garam',
                'Kuah santan: 1 lembar daun pandan',
                'Saus gula merah: 200 gram gula merah, sisir',
                'Saus gula merah: 100 ml air',
                'Saus gula merah: 1 lembar daun pandan',
                'Es batu secukupnya'
            ],
            steps: [
                'Buat cendol: campurkan tepung hunkue, tepung beras, air, pasta pandan, dan garam. Aduk rata.',
                'Masak adonan cendol di atas api sedang sambil terus diaduk hingga mengental dan meletup-letup.',
                'Siapkan wadah berisi air es. Cetak adonan menggunakan saringan/cetakan cendol langsung ke dalam air es.',
                'Buat kuah santan: masak santan dengan garam dan daun pandan hingga mendidih. Biarkan dingin.',
                'Buat saus gula merah: masak gula merah, air, dan daun pandan hingga gula larut dan mengental. Saring dan dinginkan.',
                'Penyajian: masukkan cendol ke dalam gelas, tuang kuah santan, tambahkan saus gula merah.',
                'Tambahkan es batu secukupnya. Aduk rata dan sajikan segera.'
            ],
            tips: 'Kunci cendol yang kenyal adalah memasak adonan sampai benar-benar matang (transparan). Santan yang paling enak adalah santan segar yang baru diperas dari kelapa parut. Gula merah asli akan memberikan warna dan aroma yang lebih kaya.'
        }
    };

    // Open modal
    var detailBtns = document.querySelectorAll('.recipe-detail-btn');
    var modal = document.getElementById('recipeModal');
    var modalBody = document.getElementById('modalBody');
    var modalClose = document.getElementById('modalClose');
    var lastFocus = null;

    detailBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var recipeId = btn.getAttribute('data-recipe');
            var data = recipeData[recipeId];

            if (!data || !modal || !modalBody) return;

            // Gambar modal diambil dari gambar di kartu resep.
            // Jadi kalau foto asli nanti dipasang di kartu, modal ikut berubah otomatis.
            var card = btn.closest('.recipe-card-full');
            var cardImg = card ? card.querySelector('img') : null;
            var headerHtml = cardImg
                ? '<div class="modal-header-image">' +
                  '   <img src="' + cardImg.getAttribute('src') + '" alt="' + (cardImg.getAttribute('alt') || data.title) + '">' +
                  '</div>'
                : '<div class="modal-header-image" style="background: ' + data.gradient + ';">' +
                  '   <span class="recipe-emoji-lg">' + data.emoji + '</span>' +
                  '</div>';

            var ingredientsHtml = data.ingredients.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('');

            var stepsHtml = data.steps.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('');

            modalBody.innerHTML = '' +
                headerHtml +
                '<h2 class="modal-recipe-title">' + data.title + '</h2>' +
                '<p class="modal-recipe-desc">' + data.desc + '</p>' +
                '<div class="modal-meta">' +
                '   <div class="modal-meta-item"><span class="meta-label">Waktu</span><span class="meta-value">⏱️ ' + data.time + '</span></div>' +
                '   <div class="modal-meta-item"><span class="meta-label">Kesulitan</span><span class="meta-value">📊 ' + data.difficulty + '</span></div>' +
                '   <div class="modal-meta-item"><span class="meta-label">Porsi</span><span class="meta-value">👥 ' + data.servings + '</span></div>' +
                '   <div class="modal-meta-item"><span class="meta-label">Estimasi Biaya</span><span class="meta-value">💰 ' + data.price + '</span></div>' +
                '</div>' +
                '<h3 class="modal-section-title">🧂 Bahan-bahan</h3>' +
                '<ul class="modal-ingredients">' + ingredientsHtml + '</ul>' +
                '<h3 class="modal-section-title">👨‍🍳 Langkah Memasak</h3>' +
                '<ol class="modal-steps">' + stepsHtml + '</ol>';
                //+ '<div class="modal-tips"><h4>💡 Tips:</h4><p>' + data.tips + '</p></div>'; 

            lastFocus = btn;
            modalBody.scrollTop = 0;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (modalClose) modalClose.focus();
        });
    });

    // Close modal
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Kalau dibuka lewat link beranda (resep.html#rendang), hapus #hash-nya
        if (window.location.hash && window.history && window.history.replaceState) {
            try {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch (err) { /* abaikan */ }
        }
        if (lastFocus) lastFocus.focus();
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ---- Link dari beranda ----
    // resep.html?kategori=minuman  -> langsung memfilter kategori
    // resep.html#rendang           -> langsung membuka detail rendang
    var kategori = new URLSearchParams(window.location.search).get('kategori');
    if (kategori) {
        filterBtns.forEach(function (b) {
            if (b.getAttribute('data-filter') === kategori) b.click();
        });
    }

    var hashId = window.location.hash.slice(1);
    if (hashId) {
        detailBtns.forEach(function (b) {
            if (b.getAttribute('data-recipe') === hashId) b.click();
        });
    }

    // ---- Contact Form Validation ----
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');
    var resetFormBtn = document.getElementById('resetFormBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var isValid = true;

            // Name validation
            var name = document.getElementById('name');
            var nameError = document.getElementById('nameError');
            if (name && nameError) {
                if (name.value.trim() === '') {
                    nameError.textContent = 'Nama tidak boleh kosong.';
                    name.classList.add('error');
                    isValid = false;
                } else if (name.value.trim().length < 3) {
                    nameError.textContent = 'Nama minimal 3 karakter.';
                    name.classList.add('error');
                    isValid = false;
                } else {
                    nameError.textContent = '';
                    name.classList.remove('error');
                }
            }

            // Email validation
            var email = document.getElementById('email');
            var emailError = document.getElementById('emailError');
            if (email && emailError) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.value.trim() === '') {
                    emailError.textContent = 'Email tidak boleh kosong.';
                    email.classList.add('error');
                    isValid = false;
                } else if (!emailRegex.test(email.value.trim())) {
                    emailError.textContent = 'Format email tidak valid.';
                    email.classList.add('error');
                    isValid = false;
                } else {
                    emailError.textContent = '';
                    email.classList.remove('error');
                }
            }

            // Subject validation
            var subject = document.getElementById('subject');
            var subjectError = document.getElementById('subjectError');
            if (subject && subjectError) {
                if (subject.value === '') {
                    subjectError.textContent = 'Silakan pilih subjek pesan.';
                    subject.classList.add('error');
                    isValid = false;
                } else {
                    subjectError.textContent = '';
                    subject.classList.remove('error');
                }
            }

            // Message validation
            var message = document.getElementById('message');
            var messageError = document.getElementById('messageError');
            if (message && messageError) {
                if (message.value.trim() === '') {
                    messageError.textContent = 'Pesan tidak boleh kosong.';
                    message.classList.add('error');
                    isValid = false;
                } else if (message.value.trim().length < 10) {
                    messageError.textContent = 'Pesan minimal 10 karakter.';
                    message.classList.add('error');
                    isValid = false;
                } else {
                    messageError.textContent = '';
                    message.classList.remove('error');
                }
            }

            if (isValid) {
                // Simulate form submission
                contactForm.style.display = 'none';
                if (formSuccess) formSuccess.style.display = 'block';
            }
        });

        // Clear error on input
        var formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(function (input) {
            input.addEventListener('input', function () {
                this.classList.remove('error');
                var errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan) errorSpan.textContent = '';
            });
        });
    }

    // Reset form
    if (resetFormBtn && contactForm && formSuccess) {
        resetFormBtn.addEventListener('click', function () {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        });
    }

    // ---- FAQ Accordion ----
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function () {
                var isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(function (other) {
                    other.classList.remove('active');
                    var btn = other.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // ---- Active Navigation Highlighting ----
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.classList.remove('active');
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

});
