// Check if the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to check viewport size and adjust elements if needed
    function checkResponsiveness() {
        const viewportWidth = window.innerWidth;
        
        // Hero section adjustments
        if (viewportWidth <= 480) {
            // Fix the gap in hero title text
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.whiteSpace = 'normal';
            }
        }
        
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
        
        // Stats section adjustments
        if (viewportWidth <= 768) {
            // Adjust stat boxes for mobile
            const statBoxes = document.querySelectorAll('.stat-box');
            statBoxes.forEach(box => {
                box.style.width = '100%';
                box.style.maxWidth = '280px';
            });
            
            // Adjust stat numbers to fit
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                number.style.fontSize = '50px';
            });
        } else if (viewportWidth <= 1024) {
            // Adjust stat boxes for tablet
            const statBoxes = document.querySelectorAll('.stat-box');
            statBoxes.forEach(box => {
                box.style.width = '45%';
                box.style.minWidth = '200px';
            });
            
            // Adjust stat numbers to fit
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                number.style.fontSize = '60px';
            });
        } else {
            // Reset for desktop
            const statBoxes = document.querySelectorAll('.stat-box');
            statBoxes.forEach(box => {
                box.style.width = '22%';
            });
            
            // Adjust stat numbers to fit
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                number.style.fontSize = viewportWidth > 1440 ? '70px' : '80px';
            });
        }
        
        // About section text adjustments
        if (viewportWidth <= 767) {
            // Mobile adjustments for about section
            const visionTitle = document.querySelector('.vision-title');
            if (visionTitle) {
                visionTitle.style.width = '100%';
            }
            
            const aboutParagraphs = document.querySelectorAll('.about-paragraph');
            aboutParagraphs.forEach(paragraph => {
                paragraph.style.width = '100%';
            });
        } else if (viewportWidth <= 1023) {
            // Tablet adjustments for about section
            const visionTitle = document.querySelector('.vision-title');
            if (visionTitle) {
                visionTitle.style.width = '100%';
            }
            
            const aboutParagraphs = document.querySelectorAll('.about-paragraph');
            aboutParagraphs.forEach(paragraph => {
                paragraph.style.width = '100%';
            });
        } else {
            // Reset for desktop
            const visionTitle = document.querySelector('.vision-title');
            if (visionTitle) {
                visionTitle.style.width = '30vw';
            }
            
            const aboutParagraphs = document.querySelectorAll('.about-paragraph');
            aboutParagraphs.forEach(paragraph => {
                paragraph.style.width = '33vw';
            });
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

// Animation for horizontal slider in vision to reality section
window.addEventListener('DOMContentLoaded', ()=>{
    const visionCards = document.querySelector(".vision-horizontal-slider");
    
    if (!visionCards) return; // Safety check
    
    // Set width for dummy and empty cards
    const dummyCard = document.querySelector(".vision-card.dummy");
    const emptyCard = document.querySelector(".vision-card.empty");
    
    if (dummyCard) {
        dummyCard.style.width = window.innerWidth <= 1024 ? 
            (window.innerWidth - parseInt(window.getComputedStyle(visionCards.children[0].children[1]).width))/2 + "px" : 
            window.getComputedStyle(visionCards.children[0].children[1]).width;
    }
    
    if (emptyCard && visionCards.children[0] && visionCards.children[0].children[1]) {
        emptyCard.style.minWidth = parseFloat(window.innerWidth - (visionCards.children[0].children[1]).getBoundingClientRect().right) + "px";
    }
    
    // Get scroll value based on card width
    let scrollValue = 0;
    if (visionCards.children[0] && visionCards.children[0].children[1]) {
        scrollValue = parseFloat(window.getComputedStyle(visionCards.children[0].children[1]).width);
    }
    
    let isDragging = false;
    let startX;
    let scrollStart;
    
    // Mouse events for dragging
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
        scrollStart = visionCards.scrollLeft;
    });
    
    visionCards.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const difference = x - startX;
        visionCards.scrollBy({
            left: -1*difference/50,
            behavior: "smooth"
        });
        startX = x;
        setTimeout(()=>{
            vanishCheck();
        },300);
    });
    
    visionCards.addEventListener("touchend", () => {
        setTimeout(()=>{
            vanishCheck();
        },300);
    });
    
    // Horizontal scroll
    visionCards.addEventListener("scroll",()=>{
        setTimeout(()=>{
            vanishCheck();
        },300);
    });
    
    // Button controls
    const leftButton = document.querySelector(".vision-horizontal-slider-button.left");
    const rightButton = document.querySelector(".vision-horizontal-slider-button.right");
    
    if (leftButton) {
        leftButton.addEventListener("click",()=>{
            visionCards.scrollBy({
                left: -1 * scrollValue,
                behavior: "smooth"
            });
            setTimeout(()=>{
                vanishCheck();
            },300);
        });
    }
    
    if (rightButton) {
        rightButton.addEventListener("click",()=>{
            visionCards.scrollBy({
                left: scrollValue,
                behavior: "smooth"
            });
            setTimeout(()=>{
                vanishCheck();
            },300);
        });
    }
    
    // Function to check if cards should be visible or not
    function vanishCheck() {
        document.querySelectorAll(".vision-card").forEach((i)=>{
            if (!i || !visionCards) return; // Safety check
            
            const threshold = window.innerWidth > 768 ? 100 : 0;
            if(i.getBoundingClientRect().left <= visionCards.getBoundingClientRect().left + threshold && !i.classList.contains("dummy")) {
                i.style.opacity = 0;
                i.style.transform = "scaleY(0.8)";
            } else {
                i.style.opacity = 1;
                i.style.transform = "";
            }
        });
    }
    
    // Initial check
    vanishCheck();
    
    // Adjust on window resize
    window.addEventListener('resize', () => {
        // Recalculate dimensions
        if (dummyCard) {
            dummyCard.style.width = window.innerWidth <= 1024 ? 
                (window.innerWidth - parseInt(window.getComputedStyle(visionCards.children[0].children[1]).width))/2 + "px" : 
                window.getComputedStyle(visionCards.children[0].children[1]).width;
        }
        
        if (emptyCard && visionCards.children[0] && visionCards.children[0].children[1]) {
            emptyCard.style.minWidth = parseFloat(window.innerWidth - (visionCards.children[0].children[1]).getBoundingClientRect().right) + "px";
        }
        
        // Update scroll value
        if (visionCards.children[0] && visionCards.children[0].children[1]) {
            scrollValue = parseFloat(window.getComputedStyle(visionCards.children[0].children[1]).width);
        }
        
        // Check visibility
        vanishCheck();
    });
});

// Form responsiveness
document.addEventListener('DOMContentLoaded', function() {
    function adjustFormResponsiveness() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth <= 768) {
            // Adjust form elements for mobile
            const formInputLabels = document.querySelectorAll('.form-input-label');
            formInputLabels.forEach(label => {
                label.style.fontSize = '24px';
            });
            
            const formInputFields = document.querySelectorAll('.form-input-field');
            formInputFields.forEach(field => {
                field.style.fontSize = '18px';
            });
            
            const formSectionHeadingP = document.querySelector('.form-section-heading p');
            if (formSectionHeadingP) {
                formSectionHeadingP.style.width = '100%';
            }
        } else {
            // Reset for desktop
            const formInputLabels = document.querySelectorAll('.form-input-label');
            formInputLabels.forEach(label => {
                label.style.fontSize = 'clamp(30px, 4vw, 60px)';
            });
            
            const formInputFields = document.querySelectorAll('.form-input-field');
            formInputFields.forEach(field => {
                field.style.fontSize = '22px';
            });
            
            const formSectionHeadingP = document.querySelector('.form-section-heading p');
            if (formSectionHeadingP) {
                formSectionHeadingP.style.width = '50%';
            }
        }
    }
    
    // Run on page load
    adjustFormResponsiveness();
    
    // Run on window resize
    window.addEventListener('resize', adjustFormResponsiveness);
});