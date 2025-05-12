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
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
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
    
    // Function to start counter animation
    function startCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(() => startCounters(), 1);
                } else {
                    counter.innerText = target;
                }
            }
        });
    }
    
    // Start counters when they come into view
    window.addEventListener('scroll', startCounters);
    
    // Initial check on page load
    startCounters();
});