// Password protection functionality
const PASSWORD = "iloveyou";

// Get DOM elements
const landingSection = document.getElementById('landing-section');
const messageSection = document.getElementById('message-section');
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMessage = document.getElementById('error-message');
const glassContainer = document.querySelector('.glass-container');

// Add event listeners
unlockBtn.addEventListener('click', handleUnlock);
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleUnlock();
    }
});

// Hide error message when user starts typing
passwordInput.addEventListener('input', function() {
    hideErrorMessage();
});

function handleUnlock() {
    const enteredPassword = passwordInput.value.trim().toLowerCase();
    
    if (enteredPassword === PASSWORD) {
        // Correct password - show the romantic message
        unlockWebsite();
    } else {
        // Wrong password - show error and shake animation
        showErrorMessage();
        shakeContainer();
        passwordInput.value = '';
    }
}

function unlockWebsite() {
    // Hide landing section with fade out
    landingSection.style.opacity = '0';
    landingSection.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        landingSection.classList.add('hidden');
        messageSection.classList.remove('hidden');
        
        // Scroll to top and show message section
        window.scrollTo(0, 0);
        messageSection.style.opacity = '0';
        messageSection.style.transform = 'translateY(50px)';
        
        // Animate message section entrance
        setTimeout(() => {
            messageSection.style.transition = 'all 1s ease-out';
            messageSection.style.opacity = '1';
            messageSection.style.transform = 'translateY(0)';
        }, 100);
        
    }, 500);
}

function showErrorMessage() {
    errorMessage.classList.add('show');
    
    // Hide error message after 3 seconds
    setTimeout(() => {
        hideErrorMessage();
    }, 3000);
}

function hideErrorMessage() {
    errorMessage.classList.remove('show');
}

function shakeContainer() {
    glassContainer.classList.add('shake');
    
    // Remove shake class after animation completes
    setTimeout(() => {
        glassContainer.classList.remove('shake');
    }, 500);
}

// Add focus to password input when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        passwordInput.focus();
    }, 1000);
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent form submission on Enter key to avoid page refresh
passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

// Easter egg: Console message for developers
console.log('💕 Yeh website sirf kisi khaas ke liye hai... 💕');

// Add some sparkle effects for better visual appeal
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'sparkle 2s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles periodically
setInterval(createSparkle, 3000);
