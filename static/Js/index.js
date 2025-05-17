document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('.social-icon').style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.querySelector('.social-icon').style.transform = 'scale(1)';
        });
    });

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle scroll events for pricing text
    function handlePricingScroll() {
        const pricingTexts = document.querySelectorAll('.pricing-text');
        let delay = 0;
        
        pricingTexts.forEach((text, index) => {
            if (isInViewport(text) && !text.classList.contains('visible')) {
                setTimeout(() => {
                    text.classList.add('visible');
                }, delay);
                delay += 300; // Add delay for each subsequent line
            }
        });
    }
    
    // Initial check on page load
    handlePricingScroll();
    
    // Add scroll event listener for pricing text
    window.addEventListener('scroll', handlePricingScroll);
    
    // Also trigger on resize
    window.addEventListener('resize', handlePricingScroll);

    // Toggle between default and alternate views
    const defaultView = document.getElementById('default-view');
    const alternateView = document.getElementById('alternate-view');
    const arrowButton = document.querySelector('.arrow-button');
    
    // Set initial state
    let isAlternateViewVisible = false;
    alternateView.style.display = 'none';
    defaultView.style.display = 'flex';
    
    // Add click event for arrow button to toggle views
    if (arrowButton) {
        arrowButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle between views
            isAlternateViewVisible = !isAlternateViewVisible;
            
            if (isAlternateViewVisible) {
                // Show alternate view (storage categories)
                defaultView.style.display = 'none';
                alternateView.style.display = 'grid';
                arrowButton.classList.add('rotated');
            } else {
                // Show default view (three cards)
                defaultView.style.display = 'flex';
                alternateView.style.display = 'none';
                arrowButton.classList.remove('rotated');
            }
        });
        
        // Also toggle on hover for better UX
        arrowButton.addEventListener('mouseenter', function() {
            // Toggle between views
            if (!isAlternateViewVisible) {
                defaultView.style.display = 'none';
                alternateView.style.display = 'grid';
                arrowButton.classList.add('rotated');
                isAlternateViewVisible = true;
            }
        });
    }
});

// video animation
document.addEventListener('DOMContentLoaded', function() {
    // Get all text lines
    const textLines = document.querySelectorAll('.text-line');
    
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
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        textLines.forEach((line, index) => {
            if (isInViewport(line)) {
                // Add delay based on the index for sequential animation
                setTimeout(() => {
                    line.classList.add('visible');
                }, index * 200);
            }
        });
    }
    
    // Check on initial load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Ensure video plays automatically
    const video = document.querySelector('.background-video');
    
    // Function to handle video playback
    function handleVideoPlayback() {
        if (video.paused) {
            video.play().catch(error => {
                console.error("Video play failed:", error);
            });
        }
    }
    
    // Try to play video on page load
    handleVideoPlayback();
    
    // Try to play video on user interaction (helps with autoplay restrictions)
    document.addEventListener('click', handleVideoPlayback);
    document.addEventListener('touchstart', handleVideoPlayback);
});

// JavaScript for Blog Section
document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading for images
    const blogImages = document.querySelectorAll('.blog-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // If using placeholder, replace with actual image
                    if (src.includes('placeholder')) {
                        // In a real implementation, you would replace this with your actual image path
                        // img.src = img.getAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        blogImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Enable cookies for faster loading (as per SEO requirements)
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    // Set a cookie to indicate the user has visited before
    setCookie('visited', 'true', 30);
    
    // View More button functionality
    const viewMoreButton = document.querySelector('.blog-view-more');
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your view more functionality here
            console.log('View more blogs clicked');
            // Example: window.location.href = '/all-blogs';
        });
    }
});

// For handling horizontal scroll in client section
document.addEventListener('DOMContentLoaded', function() {

    const horizontalScrollSection = document.querySelector(".clients-say-horizontal-scroll-container");
    const clientSection = document.querySelector(".clients-say-section");
    const widthRef = document.querySelector(".clients-say-container");

    const sectionWidth = widthRef.getBoundingClientRect().right - widthRef.getBoundingClientRect().left;

    const maxThreshold = (window.innerWidth > 1024) ? sectionWidth * 2 : sectionWidth * 2 + 0.4 * window.innerWidth;

    window.addEventListener("scroll",()=>{


        const rect = clientSection.getBoundingClientRect();
        const maxScroll = clientSection.offsetHeight - window.innerHeight;

        if (rect.top <= 0 && Math.abs(rect.top) <= maxScroll) {
            const scrollProgress = Math.abs(rect.top) / maxScroll;
            const scrollWidth = horizontalScrollSection.scrollWidth - window.innerWidth;
            let transformValue = scrollWidth * scrollProgress * 1.5;
            if(transformValue > maxThreshold)
                transformValue = maxThreshold;
            horizontalScrollSection.style.transform = `translateX(-${transformValue}px)`;
        } else if (rect.top > 0) {
            horizontalScrollSection.style.transform = `translateX(0px)`;
        }
    });

    // add event handler for scroll up button
    document.querySelector(".scroll-up-button").addEventListener("click",()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});

// This script handles any dynamic functionality for the locations section
document.addEventListener('DOMContentLoaded', function() {
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

    // Function to add animation class when element is in viewport
    function handleScrollAnimation() {
        const locationCards = document.querySelectorAll('.location-card');
        
        locationCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Add hover effect for location cards
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});


document.addEventListener("DOMContentLoaded", function(){
  document.querySelector(".hero-image-up").classList.add("show");
  document.querySelector(".hero-image-down").classList.add("show");

  const headings = document.querySelectorAll(".heading-line");

  headings.forEach((heading) => {
    let textSpans = heading.querySelectorAll("span");
    let index = 0;
    const interval = setInterval(() => {
      if (index < textSpans.length) {
        textSpans[index].classList.add("show");
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  });
});

// text span filling color animation
document.addEventListener('DOMContentLoaded', function() {
    const pricingSection = document.querySelector(".pricing-section");
    const textSpans = document.querySelectorAll(".pricing-text span");
    let isScrollBlocked = false;
    let currentFilledIndex = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lock scroll when section enters view
                isScrollBlocked = true;
                document.body.style.overflow = 'hidden';
            } else {
                // Release scroll when section exits view
                isScrollBlocked = false;
                document.body.style.overflow = '';
            }
        });
    }, { threshold: 0.9 });

    observer.observe(pricingSection);

    window.addEventListener('wheel', (e) => {
        if (!isScrollBlocked) return;
        
        const isScrollingDown = e.deltaY > 0;
        e.preventDefault(); // Block default scroll

        if (isScrollingDown) {
            // Fill next span if not all filled
            if (currentFilledIndex < textSpans.length) {
                textSpans[currentFilledIndex].classList.add('filled');
                currentFilledIndex++;
            }
            // Unlock if all spans are now filled
            if (currentFilledIndex === textSpans.length) {
                releaseScrollLock();
            }
        } else {
            // Unfill last span if not all unfilled
            if (currentFilledIndex > 0) {
                currentFilledIndex--;
                textSpans[currentFilledIndex].classList.remove('filled');
            }
            // Unlock if all spans are now empty
            if (currentFilledIndex === 0) {
                releaseScrollLock();
            }
        }
    }, { passive: false });

    function releaseScrollLock() {
        isScrollBlocked = false;
        document.body.style.overflow = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const block1 = document.querySelector(".block-1");
  const block2 = document.querySelector(".pricing-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {

            
          // When block-2 is in view — add a scroll listener
          window.addEventListener("scroll", moveBlock1);
        } else {
          // Remove the scroll listener when out of view
          window.removeEventListener("scroll", moveBlock1);
        }
      });
    },
    {
      threshold: 0.1, // 10% visibility
    }
  );

  observer.observe(block2);

  function moveBlock1() {
    console.log("block one move down bitch")
    const rect = block2.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much block2 has moved into the viewport
    const progress = Math.min(Math.max(0, (viewportHeight - rect.top) / viewportHeight), 1);

    // Move block1 down based on progress — you can multiply for speed
    block1.style.transform = `translateY(${progress * 200}px)`;
  }
});

// JavaScript for lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    // Get all images with class 'achievement-image' and 'about-image'
    const images = document.querySelectorAll('.achievement-image, .about-image');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the image is in the viewport
            if (entry.isIntersecting) {
                const img = entry.target;
                // Set the src attribute to the data-src value
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                }
                // Stop observing the image
                observer.unobserve(img);
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the image must be visible
    });
    
    // Observe each image
    images.forEach(image => {
        observer.observe(image);
    });
    
    // Add animation to achievement boxes on scroll
    const achievementBoxes = document.querySelectorAll('.achievement-box');
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    achievementBoxes.forEach(box => {
        achievementObserver.observe(box);
    });
});

// Valuuable client 
document.addEventListener('DOMContentLoaded', () => {
    const clientRows = document.querySelectorAll('.client-row');
    let lastScrollY = window.scrollY;
    let scrollDirection = 0;
    let ticking = false;
    
    // Initial positions - start at center
    let positions = [];
    clientRows.forEach(() => {
        positions.push(0);
    });
    
    function updateRowPositions() {
        // Get current scroll position and calculate direction and speed
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
        
        // Calculate scroll speed - how fast user is scrolling
        const scrollSpeed = Math.min(Math.abs(currentScrollY - lastScrollY), 50) / 5;
        
        clientRows.forEach((row, index) => {
            const speed = parseFloat(row.getAttribute('data-speed')) * 15; // Increased base speed
            const direction = row.getAttribute('data-direction');
            
            // Apply movement based on row direction (zig-zag pattern)
            // Movement is proportional to scroll speed
            if (direction === 'left') {
                positions[index] -= speed * scrollSpeed * scrollDirection;
            } else {
                positions[index] += speed * scrollSpeed * scrollDirection;
            }
            
            // Apply limits to prevent rows from moving too far
            const limit = 250; // Increased limit for more dramatic effect
            if (direction === 'left') {
                positions[index] = Math.max(Math.min(positions[index], 100), -limit);
            } else {
                positions[index] = Math.max(Math.min(positions[index], limit), -100);
            }
            
            // Apply the transform with minimal transition for immediate response
            row.style.transform = `translateX(${positions[index]}px)`;
            row.style.transition = 'transform 0.1s linear'; // Very fast transition
        });
        
        lastScrollY = currentScrollY;
    }
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateRowPositions();
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Check if section is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            (rect.top <= windowHeight && rect.top >= -rect.height) ||
            (rect.bottom >= 0 && rect.bottom <= windowHeight + rect.height) ||
            (rect.top <= 0 && rect.bottom >= windowHeight)
        );
    }
    
    // Reset positions when section comes into view
    function resetPositions() {
        clientRows.forEach((row, index) => {
            const direction = row.getAttribute('data-direction');
            positions[index] = direction === 'left' ? 0 : 0;
            row.style.transform = `translateX(${positions[index]}px)`;
            row.style.transition = 'none';
        });
    }
    
    // Handle visibility and scrolling
    function checkVisibility() {
        const clientsSection = document.querySelector('.clients-section');
        const isVisible = isInViewport(clientsSection);
        
        if (isVisible) {
            // If section just came into view, reset positions
            if (!clientsSection.classList.contains('in-view')) {
                clientsSection.classList.add('in-view');
                resetPositions();
            }
            window.addEventListener('scroll', onScroll, { passive: true });
        } else {
            clientsSection.classList.remove('in-view');
            window.removeEventListener('scroll', onScroll);
        }
    }
    
    // Initial check and setup event listeners
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    checkVisibility();
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const clientsSection = document.querySelector('.clients-section');
        if (!isInViewport(clientsSection)) return;
        
        // Calculate swipe direction and speed
        const swipeDirection = touchEndX < touchStartX ? 1 : -1;
        const swipeSpeed = Math.min(Math.abs(touchEndX - touchStartX), 200) / 20;
        
        clientRows.forEach((row, index) => {
            const speed = parseFloat(row.getAttribute('data-speed')) * 20;
            const direction = row.getAttribute('data-direction');
            
            // Apply movement based on row direction (zig-zag pattern)
            if (direction === 'left') {
                positions[index] -= speed * swipeSpeed * swipeDirection;
            } else {
                positions[index] += speed * swipeSpeed * swipeDirection;
            }
            
            // Apply limits
            const limit = 250;
            if (direction === 'left') {
                positions[index] = Math.max(Math.min(positions[index], 100), -limit);
            } else {
                positions[index] = Math.max(Math.min(positions[index], limit), -100);
            }
            
            // Apply the transform with minimal transition
            row.style.transform = `translateX(${positions[index]}px)`;
            row.style.transition = 'transform 0.1s linear';
        });
    }
    
    // Intersection Observer for better visibility detection
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    resetPositions();
                    checkVisibility();
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
        
        observer.observe(document.querySelector('.clients-section'));
    }
});