// Carousel functionality
class Carousel {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 5;
        this.track = document.getElementById('carousel-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dots = document.querySelectorAll('.dot');
        this.cards = document.querySelectorAll('.card');
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot event listeners
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index + 1));
        });
        
        // Add touch/swipe support
        this.addTouchSupport();
        
        // Add keyboard navigation
        this.addKeyboardSupport();
        
        // Initialize first slide
        this.updateSlide();
    }
    
    nextSlide() {
        this.currentSlide = this.currentSlide === this.totalSlides ? 1 : this.currentSlide + 1;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 1 ? this.totalSlides : this.currentSlide - 1;
        this.updateSlide();
    }
    
    goToSlide(slideNumber) {
        this.currentSlide = slideNumber;
        this.updateSlide();
    }
    
    updateSlide() {
        // Calculate transform value (each slide is 20% of track width)
        const transformValue = -(this.currentSlide - 1) * 20;
        this.track.style.transform = `translateX(${transformValue}%)`;
        
        // Update active states
        this.updateActiveStates();
    }
    
    updateActiveStates() {
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === this.currentSlide);
        });
        
        // Update cards (for potential animations)
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index + 1 === this.currentSlide);
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            endX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const deltaX = startX - endX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.prevSlide(); // Swipe right - previous slide
                }
            }
        });
        
        // Mouse drag support for desktop
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDragging = false;
        
        this.track.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.track.style.cursor = 'grabbing';
        });
        
        this.track.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            mouseEndX = e.clientX;
        });
        
        this.track.addEventListener('mouseup', () => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
            
            const deltaX = mouseStartX - mouseEndX;
            const threshold = 50;
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        this.track.addEventListener('mouseleave', () => {
            isMouseDragging = false;
            this.track.style.cursor = 'grab';
        });
        
        // Set initial cursor
        this.track.style.cursor = 'grab';
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
    }
}

// Auto-advance carousel (optional)
class AutoCarousel extends Carousel {
    constructor(autoAdvanceTime = 5000) {
        super();
        this.autoAdvanceTime = autoAdvanceTime;
        this.autoAdvanceTimer = null;
        this.isAutoAdvancing = true;
        
        this.startAutoAdvance();
        this.addAutoAdvanceControls();
    }
    
    startAutoAdvance() {
        if (!this.isAutoAdvancing) return;
        
        this.autoAdvanceTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoAdvanceTime);
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
    
    addAutoAdvanceControls() {
        // Pause auto-advance on hover
        const container = document.querySelector('.carousel-container');
        
        container.addEventListener('mouseenter', () => {
            this.stopAutoAdvance();
        });
        
        container.addEventListener('mouseleave', () => {
            this.startAutoAdvance();
        });
        
        // Pause on focus (accessibility)
        container.addEventListener('focusin', () => {
            this.stopAutoAdvance();
        });
        
        container.addEventListener('focusout', () => {
            this.startAutoAdvance();
        });
    }
    
    // Override navigation methods to reset auto-advance timer
    nextSlide() {
        super.nextSlide();
        this.stopAutoAdvance();
        this.startAutoAdvance();
    }
    
    prevSlide() {
        super.prevSlide();
        this.stopAutoAdvance();
        this.startAutoAdvance();
    }
    
    goToSlide(slideNumber) {
        super.goToSlide(slideNumber);
        this.stopAutoAdvance();
        this.startAutoAdvance();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize basic carousel (uncomment next line for auto-advance)
    new Carousel();
    // new AutoCarousel(4000); // Auto-advance every 4 seconds
});
