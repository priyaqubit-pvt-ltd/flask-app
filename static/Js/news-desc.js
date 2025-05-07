// JavaScript for lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll("img[data-src]");
    
    // Check if Intersection Observer is supported
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                // If image is in viewport
                if (entry.isIntersecting) {
                    const image = entry.target;
                    // Replace src with data-src
                    image.src = image.dataset.src;
                    // Remove data-src attribute
                    image.removeAttribute("data-src");
                    // Stop observing the image
                    imageObserver.unobserve(image);
                }
            });
        });
        
        // Observe each image
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationChange", lazyLoad);
                }
            }, 20);
        }
        
        // Add event listeners for scroll, resize, and orientation change
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationChange", lazyLoad);
    }
});