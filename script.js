// Global variables
let currentPage = 1;
const totalPages = 3;
let musicPlaying = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    initializeLandingPage();
    initializeStorybook();
    initializeMusic();
    createSakuraPetals();
    createFireflies();
});

// Custom Cursor
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('story-photo') || 
            e.target.classList.contains('hidden-note')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.innerHTML = '💖';
            cursor.style.background = 'transparent';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('story-photo') || 
            e.target.classList.contains('hidden-note')) {
            cursor.style.transform = 'scale(1)';
            cursor.innerHTML = '';
            cursor.style.background = 'radial-gradient(circle, #ff6b9d, #f06292)';
        }
    });
}

// Landing Page Functions
function initializeLandingPage() {
    const enterBtn = document.getElementById('enter-btn');
    const doorContainer = document.querySelector('.door-container');
    
    // Automatically open door after 2 seconds
    setTimeout(() => {
        doorContainer.classList.add('opened');
    }, 2000);
    
    enterBtn.addEventListener('click', () => {
        transitionToStorybook();
    });
}

function transitionToStorybook() {
    const landingPage = document.getElementById('landing-page');
    const storybook = document.getElementById('storybook');
    
    landingPage.classList.remove('active');
    setTimeout(() => {
        storybook.classList.add('active');
    }, 500);
}

// Storybook Functions
function initializeStorybook() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            navigateToPage(currentPage - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            navigateToPage(currentPage + 1);
        }
    });
    
    // Initialize hidden notes
    initializeHiddenNotes();
    
    // Initialize special song button
    initializeSpecialSong();
    
    // Update navigation
    updateNavigation();
    
    // Add scroll navigation
    let isScrolling = false;
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        if (document.getElementById('storybook').classList.contains('active')) {
            isScrolling = true;
            
            if (e.deltaY > 0 && currentPage < totalPages) {
                navigateToPage(currentPage + 1);
            } else if (e.deltaY < 0 && currentPage > 1) {
                navigateToPage(currentPage - 1);
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    });
}

function navigateToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    // Remove active class from current page
    document.querySelector('.story-page.active').classList.remove('active');
    
    // Add active class to new page
    document.querySelector(`.story-page[data-page="${pageNumber}"]`).classList.add('active');
    
    currentPage = pageNumber;
    updateNavigation();
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    currentPageSpan.textContent = currentPage;
}

// Hidden Notes Functionality
function initializeHiddenNotes() {
    const hiddenNotes = document.querySelectorAll('.hidden-note');
    
    hiddenNotes.forEach(note => {
        note.addEventListener('click', () => {
            if (!note.classList.contains('revealed')) {
                const message = note.dataset.message;
                const secretDiv = document.createElement('div');
                secretDiv.className = 'secret-message';
                secretDiv.textContent = message;
                note.appendChild(secretDiv);
                note.classList.add('revealed');
            }
        });
    });
}

// Special Song Functionality
function initializeSpecialSong() {
    const specialSongBtn = document.getElementById('special-song-btn');
    const specialSong = document.getElementById('special-song');
    
    specialSongBtn.addEventListener('click', () => {
        if (specialSong.paused) {
            // Note: In a real implementation, you would add a romantic song URL
            // For demo purposes, we'll just show the interaction
            specialSongBtn.textContent = '🎵 Playing our song...';
            specialSongBtn.style.background = 'linear-gradient(45deg, #ff6b9d, #f06292)';
            
            // Simulate playing
            setTimeout(() => {
                specialSongBtn.textContent = '🎵 Song complete ✨';
            }, 3000);
        }
    });
}

// Music Control
function initializeMusic() {
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const backgroundMusic = document.getElementById('background-music');
    
    musicToggleBtn.addEventListener('click', () => {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicToggleBtn.textContent = '🎵';
            musicToggleBtn.style.opacity = '0.7';
            musicPlaying = false;
        } else {
            // Note: In a real implementation, you would add a romantic instrumental URL
            // For demo purposes, we'll just show the interaction
            musicToggleBtn.textContent = '🎶';
            musicToggleBtn.style.opacity = '1';
            musicPlaying = true;
        }
    });
}

// Sakura Petals Animation
function createSakuraPetals() {
    const sakuraContainer = document.querySelector('.sakura-petals');
    const petals = ['🌸', '🌺', '🌼', '💐'];
    
    function createPetal() {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.position = 'absolute';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = Math.random() * 10 + 15 + 'px';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.animation = `fall ${Math.random() * 3 + 5}s linear forwards`;
        
        sakuraContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 8000);
    }
    
    // Create petals periodically
    setInterval(createPetal, 2000);
}

// Fireflies for final page
function createFireflies() {
    const firefliesContainer = document.querySelector('.fireflies');
    const firefly = ['✨', '⭐', '💫'];
    
    function createFirefly() {
        const fly = document.createElement('div');
        fly.textContent = firefly[Math.floor(Math.random() * firefly.length)];
        fly.style.position = 'absolute';
        fly.style.left = Math.random() * 100 + '%';
        fly.style.top = Math.random() * 100 + '%';
        fly.style.fontSize = Math.random() * 5 + 10 + 'px';
        fly.style.animation = `firefly ${Math.random() * 2 + 3}s infinite ease-in-out`;
        fly.style.animationDelay = Math.random() * 2 + 's';
        
        firefliesContainer.appendChild(fly);
        
        setTimeout(() => {
            fly.remove();
        }, 5000);
    }
    
    // Create fireflies periodically when on final page
    setInterval(() => {
        if (currentPage === 3) {
            createFirefly();
        }
    }, 1000);
}

// Photo interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('story-photo')) {
        // Create a popup note
        const note = document.createElement('div');
        note.textContent = 'Every picture tells our beautiful story 💕';
        note.style.position = 'fixed';
        note.style.left = e.clientX + 'px';
        note.style.top = e.clientY - 50 + 'px';
        note.style.background = 'rgba(255, 107, 157, 0.9)';
        note.style.color = 'white';
        note.style.padding = '10px 15px';
        note.style.borderRadius = '20px';
        note.style.fontSize = '0.9rem';
        note.style.zIndex = '10000';
        note.style.pointerEvents = 'none';
        note.style.transform = 'translateX(-50%)';
        note.style.animation = 'fadeIn 0.3s ease';
        
        document.body.appendChild(note);
        
        setTimeout(() => {
            note.remove();
        }, 2000);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('storybook').classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentPage < totalPages) {
                navigateToPage(currentPage + 1);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentPage > 1) {
                navigateToPage(currentPage - 1);
            }
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (document.getElementById('storybook').classList.contains('active')) {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages) {
                // Swipe left (next page)
                navigateToPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 1) {
                // Swipe right (previous page)
                navigateToPage(currentPage - 1);
            }
        }
    }
}
