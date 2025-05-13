// Check if the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to check viewport size and adjust elements if needed
    function checkResponsiveness() {
        const viewportWidth = window.innerWidth;
        
        // Adjust the container width based on viewport
        if (viewportWidth < 1920) {
            // Make sure the yellow line doesn't extend beyond the screen
            const yellowLine = document.querySelector('.yellow-line');
            if (yellowLine) {
                yellowLine.style.width = Math.min(viewportWidth - 200, 1735) + 'px';
            }
            
            // Ensure the image container is properly positioned
            const imageContainer = document.querySelector('.about-image-container');
            if (imageContainer && viewportWidth > 1023) {
                // For desktop, maintain absolute positioning but ensure it fits
                imageContainer.style.width = Math.min(viewportWidth * 0.45, 923) + 'px';
            }
        }
    }
    
    // Run on page load
    checkResponsiveness();
    
    // Run on window resize
    window.addEventListener('resize', checkResponsiveness);
});












// Counter Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const speed = 2000; // Animation duration in milliseconds
    
    // Function to animate counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = speed;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * target);
            
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Start animation when counters are in viewport
    function checkCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
    
    // Initial check
    checkCounters();
    
    // If counters are already in viewport on page load, start animation
    setTimeout(checkCounters, 500);
});