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


// animation for horizontal slider in vision to reality section

window.addEventListener('DOMContentLoaded', ()=>{

    const visionCards = document.querySelector(".vision-horizontal-slider");

    document.querySelector(".vision-card.dummy").style.width = window.getComputedStyle(visionCards.children[0].children[1]).width;
    document.querySelector(".vision-card.empty").style.minWidth = 3 * parseFloat(window.getComputedStyle(visionCards.children[0].children[1]).width) + "px";

    const scrollValue = parseFloat(window.getComputedStyle(visionCards.children[0].children[1]).width);

    let isDragging = false;
    let startX;
    let scrollStart;

    visionCards.addEventListener("mousedown", (e) => {
        isDragging = true;
        visionCards.classList.add("dragging");
        startX = e.clientX;
        scrollStart = visionCards.scrollLeft;
    });

    visionCards.addEventListener("mouseleave", () => {
        isDragging = false;
        visionCards.classList.remove("dragging");
    });

    visionCards.addEventListener("mouseup", () => {
        isDragging = false;
        visionCards.classList.remove("dragging");
        setTimeout(()=>{
            vanishCheck();
        },300);
    });

    visionCards.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.clientX;
        const difference = (startX - x)/50;
        visionCards.scrollBy({
            left: difference,
            behavior: "smooth"
        });
        setTimeout(()=>{
            vanishCheck();
        },300);
    });

    // Touch support
    visionCards.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
    });

    visionCards.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const difference = x - startX;
        visionCards.scrollBy({
            left: difference,
            behavior: "smooth"
        });
        setTimeout(()=>{
            vanishCheck();
        },300);
    });

    document.querySelector(".vision-horizontal-slider-button.left").addEventListener("click",()=>{
        visionCards.scrollBy({
            left: scrollValue,
            behavior: "smooth"
        });
        setTimeout(()=>{
            vanishCheck();
        },300);
    });

    document.querySelector(".vision-horizontal-slider-button.right").addEventListener("click",()=>{
        visionCards.scrollBy({
            left: -1 * scrollValue,
            behavior: "smooth"
        });
        setTimeout(()=>{
            vanishCheck();
        },300);
    });

    function vanishCheck() {
        document.querySelectorAll(".vision-card").forEach((i)=>{
            if(i.getBoundingClientRect().left <= visionCards.getBoundingClientRect().left + 100 && !i.classList.contains("dummy")) {
                i.style.opacity = 0;
                i.style.transform = "scaleY(0.8)";
            } else {
                i.style.opacity = 1;
                i.style.transform = "";
            }
        });
    }
});