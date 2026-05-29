function startSurprise() {
    const music = document.getElementById('bg-music');
    music.play().catch(err => console.log("Musiqa cheklovi:", err));

    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

// Kamon mexanizmi boshqaruvi
const arrow = document.getElementById('drag-arrow');
const track = document.querySelector('.arrow-slider-track');
const heart = document.getElementById('target-heart');
const letter = document.getElementById('letter-content');
const gameZone = document.getElementById('game-zone');

let isDragging = false;

// Sichqoncha va Sensorli ekranlar (Mobil) uchun voqealar
arrow.addEventListener('mousedown', startDrag);
arrow.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    arrow.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;

    const trackRect = track.getBoundingClientRect();
    let clientX = e.clientX || (e.touches && e.touches[0].clientX);
    
    // O'qning yo'lak ichidagi pozitsiyasini hisoblash
    let x = clientX - trackRect.left;
    let maxX = trackRect.width - arrow.offsetWidth;

    if (x < 0) x = 0;
    if (x > maxX) x = maxX;

    arrow.style.left = x + 'px';

    // Agar o'q oxirigacha (yurakka) borib tegsa
    if (x >= maxX - 5) {
        successUnlock();
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    
    // Agar oxirigacha yetkazmay qo'yib yuborsa, o'q silliq joyiga qaytadi
    if (!heart.classList.contains('active-heart')) {
        arrow.style.transition = 'left 0.3s ease';
        arrow.style.left = '0px';
    }
}

function successUnlock() {
    isDragging = false;
    
    // Effektlar faollashadi
    heart.classList.add('active-heart');
    heart.innerHTML = '<i class="fa-solid fa-heart-crack"></i>'; // Yurakka o'q sanchildi!
    
    setTimeout(() => {
        // O'yin zonasini yo'qotib, xatni chiroyli ochish
        gameZone.style.opacity = '0';
        setTimeout(() => {
            gameZone.classList.add('hidden');
            letter.classList.remove('hidden');
            // Xat ochilgach ekranni unga silliq to'g'rilash
            letter.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }, 600);
}
