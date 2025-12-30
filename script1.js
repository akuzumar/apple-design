document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1, // Trigger saat 10% elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hanya animasi sekali
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // 2. Navbar Glass Effect Transition on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(22, 22, 23, 0.95)';
            navbar.style.boxShadow = '0 1px 0 rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'rgba(22, 22, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Burger Menu Toggle (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Tambahkan CSS untuk .active di style.css jika perlu
            // Simple toggle logic for demo
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#000';
                navLinks.style.padding = '20px';
            }
        });
    }
});


// ... KODE SEBELUMNYA ...

/* LOGIKA UNTUK HALAMAN PEMBELIAN (BUY.HTML)
   Menghitung total harga berdasarkan pilihan user
*/

// Harga Dasar
const basePrice = 35000000;
let currentSelection = {
    chip: 0,
    ram: 0,
    storage: 0
};

// Fungsi Update Harga dan UI
function selectOption(category, index, priceAdd) {
    // 1. Simpan harga tambahan untuk kategori ini
    currentSelection[category] = priceAdd;

    // 2. Update UI (Visual Active State)
    // Cari semua elemen di dalam section yang sesuai
    // Catatan: Ini implementasi sederhana. Di proyek nyata gunakan ID spesifik per section.
    
    // Kita cari element yang diklik secara manual melalui event handling di HTML
    // Cara yang lebih bersih:
    const clickedElement = event.currentTarget; // Element yang diklik
    const parentSection = clickedElement.closest('.config-section'); // Section pembungkus
    
    // Hapus class 'selected' dari semua opsi di section ini
    parentSection.querySelectorAll('.option-card, .tile-btn').forEach(el => {
        el.classList.remove('selected');
    });

    // Tambahkan class 'selected' ke elemen yang diklik
    clickedElement.classList.add('selected');

    // 3. Kalkulasi Total
    const total = basePrice + currentSelection.chip + currentSelection.ram + currentSelection.storage;

    // 4. Update Teks Harga
    updatePriceText(total);
}

function updatePriceText(amount) {
    const priceElement = document.getElementById('total-price');
    if (priceElement) {
        // Format Rupiah
        priceElement.innerText = "Rp " + amount.toLocaleString('id-ID');
        
        // Efek animasi kecil saat harga berubah
        priceElement.style.transform = "scale(1.1)";
        setTimeout(() => {
            priceElement.style.transform = "scale(1)";
        }, 200);
    }
}

// Inisialisasi event listener jika perlu (opsional karena kita pakai onclick di HTML)
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan harga awal benar
    updatePriceText(basePrice);
});



window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Efek Zoom pada Hero Image saat scroll
    const heroImg = document.querySelector('.hero-image-wrap img');
    if(heroImg) {
        let scaleValue = 1 + (scrolled * 0.0005);
        heroImg.style.transform = `scale(${scaleValue})`;
    }

    // Teks Reveal pada Hero
    const reveals = document.querySelectorAll('.reveal-text');
    reveals.forEach((el, index) => {
        if(scrolled > 100 * (index + 1)) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "all 1s ease";
        }
    });

    // Display Tilt Effect
    const displayImg = document.querySelector('.display-video-mockup img');
    if(displayImg) {
        let rotation = 5 - (scrolled * 0.01);
        if(rotation < 0) rotation = 0; // Berhenti miring saat sudah di scroll
        displayImg.style.transform = `rotateX(${rotation}deg)`;
    }
});








document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu'); // Tombol garis tiga
    const navLinks = document.querySelector('.nav-links'); // Wadah menu
    const productTrigger = document.querySelector('.menu-item-has-children > a'); // Tulisan 'Produk'

    // 1. Fungsi buka-tutup menu utama
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('is-active');
        });
    }

    // 2. Fungsi buka-tutup sub-menu 'Produk' khusus di HP
    if (productTrigger) {
        productTrigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Mencegah link pindah halaman
                productTrigger.parentElement.classList.toggle('open');
            }
        });
    }
});








 document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navList = document.querySelector('#nav-list');
    const triggerProduk = document.querySelector('#trigger-produk');
    const popupProduk = document.querySelector('#popup-produk');

    // 1. Klik Garis 3 -> Muncul Popup Utama
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navList.classList.toggle('active');
        // Tutup popup produk jika popup utama ditutup
        if (!navList.classList.contains('active')) {
            popupProduk.classList.remove('show');
        }
    });

    // 2. Klik Tulisan 'Produk' -> Muncul Popup Kedua
    triggerProduk.addEventListener('click', (e) => {
        if (window.innerWidth <= 950) {
            e.preventDefault();
            e.stopPropagation();
            popupProduk.classList.toggle('show');
        }
    });

    // 3. Klik di mana saja di luar menu -> Tutup semua popup
    document.addEventListener('click', () => {
        navList.classList.remove('active');
        popupProduk.classList.remove('show');
    });
});