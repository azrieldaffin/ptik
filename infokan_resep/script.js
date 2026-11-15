/* ============================
   DAPUR NUSANTARA - Main JavaScript
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
        'nasi-goreng': {
            emoji: '🍚',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #C41E3D 50%, #DAA520 100%)',
            title: 'Nasi Goreng Spesial',
            desc: 'Nasi goreng adalah hidangan nasi yang digoreng bersama bumbu dan bahan pelengkap. Masakan ini sudah mendunia dan menjadi ikon kuliner Indonesia yang paling dikenal. Setiap daerah di Indonesia memiliki variasi nasi goreng yang unik.',
            time: '20 menit',
            difficulty: 'Mudah',
            servings: '2 porsi',
            price: 'Rp 15.000',
            ingredients: [
                '2 piring nasi putih (lebih baik nasi dingin)',
                '2 butir telur ayam',
                '100 gram ayam, potong dadu kecil',
                '3 siung bawang merah, iris tipis',
                '2 siung bawang putih, cincang halus',
                '2 sendok makan kecap manis',
                '1 sendok makan saus tiram',
                '1 sendok teh garam',
                '½ sendok teh merica bubuk',
                '2 batang daun bawang, iris',
                'Minyak goreng secukupnya',
                'Kerupuk dan acar sebagai pelengkap'
            ],
            steps: [
                'Panaskan minyak goreng di wajan dengan api sedang. Tumis bawang merah dan bawang putih hingga harum dan layu.',
                'Masukkan potongan ayam, aduk hingga ayam berubah warna dan matang sempurna.',
                'Geser ayam ke pinggir wajan, pecahkan telur di tengah. Orak-arik telur hingga setengah matang.',
                'Masukkan nasi putih, aduk rata dengan seluruh bahan. Pastikan nasi tidak menggumpal.',
                'Tambahkan kecap manis, saus tiram, garam, dan merica. Aduk rata hingga bumbu meresap dan nasi berwarna merata.',
                'Masukkan irisan daun bawang, aduk sebentar. Angkat dan sajikan selagi hangat.',
                'Sajikan dengan pelengkap seperti telur mata sapi, kerupuk, irisan timun, dan tomat.'
            ],
            tips: 'Gunakan nasi yang sudah dingin atau nasi sisa semalam agar hasilnya lebih pulen dan tidak lengket. Api besar saat menggoreng nasi akan menghasilkan aroma dan rasa yang lebih nikmat.'
        },
        'rendang': {
            emoji: '🥘',
            gradient: 'linear-gradient(135deg, #3E2723 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Rendang Daging Sapi',
            desc: 'Rendang adalah masakan khas Minangkabau, Sumatera Barat yang telah dinobatkan oleh CNN sebagai makanan terlezat di dunia. Daging sapi dimasak perlahan dengan santan dan campuran rempah hingga kering dan berwarna cokelat kehitaman.',
            time: '180 menit',
            difficulty: 'Sulit',
            servings: '6 porsi',
            price: 'Rp 85.000',
            ingredients: [
                '1 kg daging sapi, potong dadu besar',
                '800 ml santan kental dari 2 butir kelapa',
                '10 buah cabai merah keriting',
                '5 buah cabai merah besar',
                '8 butir bawang merah',
                '5 siung bawang putih',
                '3 cm jahe, geprek',
                '3 cm lengkuas, geprek',
                '2 batang serai, memarkan',
                '4 lembar daun jeruk',
                '2 lembar daun kunyit',
                '1 sendok teh garam',
                'Santan cair 400 ml',
                'Minyak goreng 3 sendok makan'
            ],
            steps: [
                'Haluskan cabai merah keriting, cabai merah besar, bawang merah, bawang putih, dan jahe menggunakan blender atau ulek.',
                'Panaskan minyak di wajan besar. Tumis bumbu halus bersama lengkuas, serai, daun jeruk, dan daun kunyit hingga harum.',
                'Masukkan potongan daging sapi, aduk rata dengan bumbu. Masak hingga daging berubah warna di permukaannya.',
                'Tuang santan cair terlebih dahulu, aduk rata. Masak dengan api sedang sambil sesekali diaduk agar tidak lengket.',
                'Setelah santan cair menyusut, tuang santan kental. Aduk perlahan dan terus masak dengan api kecil.',
                'Masak selama 2-3 jam sambil terus diaduk perlahan hingga santan mengering dan daging berwarna cokelat kehitaman.',
                'Rendang siap disajikan saat minyak dari santan keluar dan daging sudah empuk serta kering sempurna.'
            ],
            tips: 'Kesabaran adalah kunci memasak rendang. Jangan pernah meninggalkan rendang tanpa diaduk karena bisa gosong. Semakin lama dimasak, semakin nikmat rasanya. Rendang juga semakin enak jika dipanaskan kembali keesokan harinya.'
        },
        'soto-ayam': {
            emoji: '🍲',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #C41E3D 30%, #8B0000 100%)',
            title: 'Soto Ayam Lamongan',
            desc: 'Soto ayam adalah sup tradisional Indonesia dengan kuah kuning yang hangat dan gurih. Setiap daerah memiliki variasi soto yang berbeda, dan Soto Lamongan terkenal dengan cita rasanya yang khas berkat penggunaan koya (kerupuk udang yang dihaluskan).',
            time: '60 menit',
            difficulty: 'Sedang',
            servings: '4 porsi',
            price: 'Rp 35.000',
            ingredients: [
                '500 gram ayam (paha dan dada)',
                '1,5 liter air',
                '5 butir bawang merah',
                '3 siung bawang putih',
                '3 butir kemiri, sangrai',
                '2 cm kunyit, bakar',
                '1 cm jahe',
                '2 batang serai, memarkan',
                '3 lembar daun jeruk',
                '2 lembar daun salam',
                '100 gram soun/bihun, seduh air panas',
                'Pelengkap: tauge, seledri, daun bawang, bawang goreng, jeruk nipis, sambal',
                'Garam dan gula secukupnya',
                'Telur rebus'
            ],
            steps: [
                'Rebus ayam dalam 1,5 liter air hingga matang. Angkat ayam dan suwir-suwir dagingnya. Saring kaldu dan sisihkan.',
                'Haluskan bawang merah, bawang putih, kemiri, kunyit, dan jahe.',
                'Panaskan minyak, tumis bumbu halus bersama serai, daun jeruk, dan daun salam hingga harum dan matang.',
                'Masukkan tumisan bumbu ke dalam kaldu ayam. Aduk rata dan biarkan mendidih.',
                'Tambahkan garam dan gula secukupnya. Masak selama 15-20 menit agar bumbu meresap sempurna.',
                'Siapkan mangkuk saji: tata soun, tauge, dan suwiran ayam. Siram dengan kuah soto panas.',
                'Taburi dengan bawang goreng, irisan seledri, dan daun bawang. Sajikan dengan jeruk nipis dan sambal.'
            ],
            tips: 'Untuk kuah yang lebih bening dan gurih, gunakan api kecil saat merebus ayam dan buang busa yang muncul di permukaan. Tambahkan koya (campuran kerupuk udang halus dan bawang putih goreng) untuk cita rasa khas Lamongan.'
        },
        'gado-gado': {
            emoji: '🥗',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #3E2723 50%, #8B0000 100%)',
            title: 'Gado-gado Jakarta',
            desc: 'Gado-gado adalah salad tradisional Indonesia yang terdiri dari berbagai sayuran rebus dan bahan pelengkap, disiram dengan saus kacang yang gurih. Gado-gado Jakarta terkenal dengan saus kacangnya yang diulek langsung dan lontong yang lembut.',
            time: '30 menit',
            difficulty: 'Mudah',
            servings: '3 porsi',
            price: 'Rp 20.000',
            ingredients: [
                '200 gram kacang tanah, goreng',
                '5 buah cabai rawit merah',
                '2 siung bawang putih, goreng',
                '3 sendok makan air asam jawa',
                '2 sendok makan gula merah, sisir',
                '1 sendok teh garam',
                '150 ml air matang',
                '100 gram kangkung, rebus',
                '100 gram kol, rebus',
                '100 gram tauge, rebus',
                '2 buah tahu putih, goreng dan potong',
                '2 potong tempe, goreng',
                '2 buah kentang, rebus dan iris',
                '2 butir telur, rebus dan belah',
                'Lontong secukupnya',
                'Kerupuk dan bawang goreng'
            ],
            steps: [
                'Ulek kacang tanah goreng bersama cabai rawit, bawang putih goreng, dan garam hingga halus.',
                'Tambahkan gula merah sisir dan air asam jawa, ulek rata.',
                'Tuang air sedikit demi sedikit sambil terus mengaduk hingga mencapai kekentalan yang diinginkan.',
                'Siapkan piring saji. Tata sayuran rebus (kangkung, kol, tauge), kentang, tahu, dan tempe.',
                'Tambahkan potongan lontong dan telur rebus.',
                'Siram dengan saus kacang secukupnya.',
                'Taburi dengan bawang goreng dan sajikan dengan kerupuk.'
            ],
            tips: 'Rahasia saus gado-gado yang nikmat ada pada keseimbangan rasa gurih, manis, asam, dan pedas. Gunakan kacang tanah yang baru digoreng untuk aroma yang lebih harum. Saus akan lebih nikmat jika diulek, bukan diblender.'
        },
        'bakso': {
            emoji: '🍜',
            gradient: 'linear-gradient(135deg, #C41E3D 0%, #8B0000 50%, #3E2723 100%)',
            title: 'Bakso Sapi Malang',
            desc: 'Bakso adalah makanan favorit masyarakat Indonesia yang terdiri dari bola-bola daging sapi yang kenyal, disajikan dalam kuah kaldu yang gurih bersama mie, bihun, dan tahu. Bakso Malang terkenal dengan variasi isian dan topping yang beragam.',
            time: '90 menit',
            difficulty: 'Sedang',
            servings: '5 porsi',
            price: 'Rp 40.000',
            ingredients: [
                '500 gram daging sapi giling (tanpa lemak)',
                '100 gram tepung tapioka',
                '4 siung bawang putih, haluskan',
                '1 butir telur',
                '2 sendok teh garam',
                '1 sendok teh merica bubuk',
                '1 sendok makan bawang putih goreng',
                '100 ml air es',
                'Kuah: 2 liter kaldu sapi',
                'Kuah: 5 siung bawang putih goreng',
                'Kuah: garam dan merica secukupnya',
                'Pelengkap: mie kuning, bihun, tahu goreng',
                'Pelengkap: daun seledri, bawang goreng',
                'Sambal dan kecap manis'
            ],
            steps: [
                'Campurkan daging sapi giling, bawang putih halus, garam, merica, dan telur. Aduk rata dengan tangan atau food processor.',
                'Masukkan tepung tapioka sedikit demi sedikit sambil terus diaduk hingga adonan kalis dan bisa dibentuk.',
                'Tambahkan air es sedikit demi sedikit untuk memudahkan adonan dibentuk bulat.',
                'Siapkan panci berisi air mendidih. Bentuk adonan menjadi bola-bola menggunakan tangan.',
                'Masukkan bola bakso ke air mendidih. Bakso matang saat mengapung ke permukaan. Angkat dan tiriskan.',
                'Untuk kuah: rebus kaldu sapi, tambahkan bawang putih goreng, garam, dan merica. Masak hingga mendidih.',
                'Sajikan bakso dalam mangkuk dengan kuah panas, mie kuning, bihun, tahu goreng, seledri, dan bawang goreng.'
            ],
            tips: 'Kunci bakso kenyal adalah penggunaan air es saat menguleni adonan dan daging yang benar-benar segar. Jangan terlalu banyak tepung karena akan membuat bakso keras. Proses penggilingan daging yang halus juga sangat menentukan tekstur akhir.'
        },
        'sate-ayam': {
            emoji: '🍢',
            gradient: 'linear-gradient(135deg, #C41E3D 0%, #DAA520 50%, #3E2723 100%)',
            title: 'Sate Ayam Madura',
            desc: 'Sate ayam Madura adalah salah satu jenis sate paling populer di Indonesia. Potongan daging ayam yang ditusuk dan dipanggang di atas arang, disajikan dengan saus kacang manis yang khas dan irisan bawang merah serta lontong.',
            time: '45 menit',
            difficulty: 'Sedang',
            servings: '3 porsi',
            price: 'Rp 30.000',
            ingredients: [
                '500 gram daging ayam paha, potong dadu',
                '20 tusuk sate (rendam air)',
                'Bumbu marinasi: 3 sdm kecap manis',
                'Bumbu marinasi: 1 sdm minyak goreng',
                'Bumbu marinasi: 1 sdt ketumbar bubuk',
                'Bumbu marinasi: ½ sdt garam',
                'Saus kacang: 200 gram kacang tanah goreng',
                'Saus kacang: 5 buah cabai merah keriting',
                'Saus kacang: 3 siung bawang putih',
                'Saus kacang: 3 sdm kecap manis',
                'Saus kacang: 1 sdm air jeruk nipis',
                'Saus kacang: garam dan gula secukupnya',
                'Pelengkap: lontong, irisan bawang merah, timun'
            ],
            steps: [
                'Campurkan daging ayam dengan bumbu marinasi (kecap manis, minyak, ketumbar, garam). Diamkan 30 menit di kulkas.',
                'Tusukkan potongan ayam ke tusuk sate, masing-masing 4-5 potong per tusuk.',
                'Untuk saus kacang: haluskan kacang tanah goreng, cabai, dan bawang putih. Campurkan dengan kecap manis, air jeruk nipis, garam, gula, dan air secukupnya.',
                'Panaskan arang atau grill. Panggang sate sambil dibolak-balik dan diolesi sisa bumbu marinasi.',
                'Panggang hingga daging matang sempurna dan bagian pinggirnya sedikit gosong (sekitar 8-10 menit).',
                'Sajikan sate dengan saus kacang, irisan bawang merah, potongan lontong, dan irisan timun.'
            ],
            tips: 'Memanggang di atas arang akan memberikan aroma smoky yang khas. Kipas-kipas saat memanggang agar api merata. Jangan terlalu lama memanggang agar daging tidak kering. Marinasi lebih lama (2-3 jam) akan membuat rasa lebih meresap.'
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
        },
        'pisang-goreng': {
            emoji: '🍌',
            gradient: 'linear-gradient(135deg, #DAA520 0%, #8B0000 50%, #C41E3D 100%)',
            title: 'Pisang Goreng Crispy',
            desc: 'Pisang goreng adalah camilan tradisional Indonesia yang sederhana namun sangat digemari. Pisang matang yang dibalut adonan tepung renyah kemudian digoreng hingga keemasan. Bisa disajikan polos atau dengan berbagai topping seperti keju, cokelat, atau gula halus.',
            time: '15 menit',
            difficulty: 'Mudah',
            servings: '4 porsi',
            price: 'Rp 12.000',
            ingredients: [
                '6 buah pisang raja/kepok matang',
                '100 gram tepung terigu',
                '30 gram tepung beras',
                '2 sendok makan gula pasir',
                '¼ sendok teh garam',
                '½ sendok teh vanili bubuk',
                '150 ml air es',
                '1 sendok makan margarin, lelehkan',
                'Minyak goreng untuk menggoreng',
                'Topping opsional: keju parut, meses cokelat, gula halus, susu kental manis'
            ],
            steps: [
                'Kupas pisang dan belah menjadi dua bagian memanjang (opsional: bisa juga dibiarkan utuh).',
                'Campurkan tepung terigu, tepung beras, gula, garam, dan vanili. Aduk rata.',
                'Tuang air es sedikit demi sedikit sambil diaduk hingga adonan tidak terlalu kental dan tidak terlalu encer.',
                'Tambahkan margarin leleh, aduk rata. Diamkan adonan selama 5 menit.',
                'Panaskan minyak goreng dengan api sedang. Celupkan pisang ke dalam adonan hingga terbalut rata.',
                'Goreng pisang hingga keemasan dan renyah di kedua sisi (sekitar 3-4 menit per sisi).',
                'Angkat dan tiriskan. Sajikan selagi hangat dengan topping favorit Anda.'
            ],
            tips: 'Gunakan pisang raja atau pisang kepok yang sudah matang sempurna untuk rasa manis alami. Air es akan membuat adonan lebih renyah. Pastikan minyak sudah cukup panas sebelum menggoreng agar hasilnya tidak berminyak. Goreng dengan api sedang agar matang merata.'
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
                '<ol class="modal-steps">' + stepsHtml + '</ol>' +
                '<div class="modal-tips"><h4>💡 Tips:</h4><p>' + data.tips + '</p></div>';

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
