// Password protection and animations
const CORRECT_PASSWORD = "tumhara"; // Hindi for "yours"

// DOM Elements
const landingSection = document.getElementById('landing-section');
const messageSection = document.getElementById('message-section');
const footerSection = document.getElementById('footer-section');
const passwordInput = document.getElementById('password-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMessage = document.getElementById('error-message');
const passwordBox = document.getElementById('password-box');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Focus on password input
    passwordInput.focus();
    
    // Add event listeners
    unlockBtn.addEventListener('click', handlePasswordSubmit);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handlePasswordSubmit();
        }
    });
    
    // Clear error message when user starts typing
    passwordInput.addEventListener('input', function() {
        hideErrorMessage();
        passwordBox.classList.remove('shake');
    });
});

// Handle password submission
function handlePasswordSubmit() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === '') {
        showErrorMessage('Kuch toh likho...');
        shakeBox();
        return;
    }
    
    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password - unlock the message
        unlockMessage();
    } else {
        // Wrong password - show error and shake
        showErrorMessage('Shayad yeh tum nahi ho...');
        shakeBox();
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Show error message
function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Hide error message
function hideErrorMessage() {
    errorMessage.classList.remove('show');
}

// Shake animation for wrong password
function shakeBox() {
    passwordBox.classList.add('shake');
    setTimeout(() => {
        passwordBox.classList.remove('shake');
    }, 500);
}

// Unlock and show the hidden message
function unlockMessage() {
    // Fade out landing section
    landingSection.style.transition = 'opacity 1s ease';
    landingSection.style.opacity = '0';
    
    setTimeout(() => {
        landingSection.style.display = 'none';
        
        // Show message section with animation
        messageSection.style.display = 'block';
        setTimeout(() => {
            messageSection.classList.add('show');
            
            // Animate letter content with staggered timing
            animateLetterContent();
            
            // Show footer after message animation completes
            setTimeout(() => {
                footerSection.style.display = 'block';
                setTimeout(() => {
                    footerSection.classList.add('show');
                }, 100);
            }, 3000);
            
        }, 100);
    }, 1000);
}

// Animate letter content with typewriter effect
function animateLetterContent() {
    const letterParagraphs = document.querySelectorAll('.letter-content p');
    const finalMessageParagraphs = document.querySelectorAll('.final-message p');
    
    // Animate letter paragraphs
    letterParagraphs.forEach((p, index) => {
        setTimeout(() => {
            p.style.opacity = '1';
        }, index * 200);
    });
    
    // Animate final message paragraphs
    setTimeout(() => {
        finalMessageParagraphs.forEach((p, index) => {
            setTimeout(() => {
                p.style.opacity = '1';
            }, index * 200);
        });
    }, 1500);
}

// Optional: Add subtle parallax effect on scroll (if content is long enough)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.body;
    const rate = scrolled * -0.5;
    
    background.style.transform = `translateY(${rate}px)`;
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Prevent right-click context menu for a more immersive experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press Escape to blur password input
    if (e.key === 'Escape') {
        passwordInput.blur();
    }
    
    // Press F1 to focus password input (if still on landing page)
    if (e.key === 'F1' && landingSection.style.display !== 'none') {
        e.preventDefault();
        passwordInput.focus();
    }
});
