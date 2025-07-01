// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Background Music Functionality
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

// Music toggle event
if (musicToggle) {
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            if (backgroundMusic) backgroundMusic.pause();
            musicIcon.textContent = '🔇';
            musicToggle.style.background = 'rgba(255, 255, 255, 0.1)';
            isPlaying = false;
        } else {
            if (backgroundMusic) {
                backgroundMusic.play().catch(e => {
                    console.log('Audio autoplay prevented');
                });
            }
            musicIcon.textContent = '🎵';
            musicToggle.style.background = 'rgba(255, 255, 255, 0.3)';
            isPlaying = true;
        }
    });
}

// Password Functionality for Lock Box - wrapped in window.onload
window.addEventListener('load', function() {
    console.log('Window loaded, initializing password functionality...');
    
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordSection = document.getElementById('password-section');
    const letterSection = document.getElementById('letter-section');

    // Correct password
    const correctPassword = 'tumnaam';

    console.log('Password elements found:', {
        passwordInput: !!passwordInput,
        unlockBtn: !!unlockBtn,
        passwordSection: !!passwordSection,
        letterSection: !!letterSection
    });

    // Unlock button event
    if (unlockBtn && passwordInput && passwordSection && letterSection) {
        console.log('Adding event listeners...');
        
        unlockBtn.addEventListener('click', function() {
            const enteredPassword = passwordInput.value.toLowerCase().trim();
            console.log('Entered password:', enteredPassword, 'Expected:', correctPassword);
            
            if (enteredPassword === correctPassword) {
                console.log('Password correct! Showing letter...');
                // Correct password - show letter
                passwordSection.style.display = 'none';
                letterSection.style.display = 'block';
                
                // Re-initialize AOS for the new content
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
                
                // Add celebration effect
                showCelebration();
            } else {
                console.log('Password incorrect!');
                // Wrong password - shake effect
                passwordInput.style.border = '2px solid #ff6b6b';
                passwordInput.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    passwordInput.style.border = 'none';
                    passwordInput.style.animation = '';
                    passwordInput.value = '';
                    passwordInput.placeholder = 'Galat password! Phir try karo...';
                }, 500);
                
                setTimeout(() => {
                    passwordInput.placeholder = 'Password dalo...';
                }, 2000);
            }
        });

        // Enter key support for password input
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    } else {
        console.error('Password elements not found!', {
            passwordInput: passwordInput,
            unlockBtn: unlockBtn,
            passwordSection: passwordSection,
            letterSection: letterSection
        });
    }
});

// Celebration effect when password is correct
function showCelebration() {
    // Create floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 100);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Smooth scrolling for any navigation links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for welcome section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const welcomeSection = document.getElementById('welcome');
    const animatedBg = document.querySelector('.animated-bg');
    
    if (animatedBg) {
        animatedBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic particle movement
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        const amplitude = 20 + (index * 5);
        
        let position = 0;
        
        setInterval(() => {
            position += speed;
            const x = Math.sin(position * 0.01) * amplitude;
            const y = Math.cos(position * 0.01) * amplitude;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        }, 50);
    });
}

// Start particle animation when page loads
window.addEventListener('load', function() {
    animateParticles();
    
    // Add a subtle fade-in effect to the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add typing effect to welcome section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when welcome section comes into view
const welcomeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const highlights = entry.target.querySelectorAll('.highlight');
            highlights.forEach((highlight, index) => {
                setTimeout(() => {
                    const originalText = highlight.textContent;
                    typeWriter(highlight, originalText, 150);
                }, index * 1000);
            });
            welcomeObserver.unobserve(entry.target);
        }
    });
});

// Observe welcome section for typing effect
const welcomeSection = document.getElementById('welcome');
if (welcomeSection) {
    welcomeObserver.observe(welcomeSection);
}

// Add glowing effect to important elements on hover
document.querySelectorAll('.message-item, .center-box, .letter-container').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
        this.style.transition = 'box-shadow 0.3s ease';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

console.log('💕 Website loaded with love! 💕');
