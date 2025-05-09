document.addEventListener('DOMContentLoaded', function() {
    // Function to handle scroll events for social links
    function handleSocialScroll() {
        const scrollPosition = window.scrollY;
        const socialLinksContainer = document.querySelector('.social-links-container');
        
        // Adjust the position of social links container based on scroll
        if (scrollPosition > 0) {
            socialLinksContainer.style.top = `${Math.max(621 - scrollPosition, 100)}px`;
        } else {
            socialLinksContainer.style.top = '621px';
        }
    }

    // Add scroll event listener for social links
    window.addEventListener('scroll', handleSocialScroll);

    // Add hover effect for social links
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

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < window.innerHeight &&
            rect.left < window.innerWidth
        );
    }

    const horizontalScrollSection = document.querySelector(".client-horizontal-scroll-container");
    const clientSection = document.querySelector(".client-section");

    window.addEventListener("wheel",(e)=>{

        const rect = clientSection.getBoundingClientRect();
        const maxScroll = clientSection.offsetHeight - window.innerHeight;

        if (rect.top <= 0 && Math.abs(rect.top) <= maxScroll) {
            const scrollProgress = Math.abs(rect.top) / maxScroll;
            const scrollWidth = horizontalScrollSection.scrollWidth - window.innerWidth;
            let transformValue = scrollWidth * scrollProgress * 1.5;
            if(transformValue > window.innerWidth*1.64)
                transformValue = window.innerWidth*1.64;
            horizontalScrollSection.style.transform = `translateX(-${transformValue}px)`;
        }
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
    const section = document.querySelector(".pricing-section");
    const textSpans = document.querySelectorAll(".pricing-text span");
    let filledIndex = 0;
    let locked = false;
    let lockTriggered = false; // track if section was ever locked
  
    window.addEventListener("wheel", (e) => {
      if (!locked) return;
  
      e.preventDefault();
  
      if (filledIndex < textSpans.length) {
        textSpans[filledIndex].classList.add("filled");
        filledIndex++;
      } else {
        // Unlock scroll — but before that, push the page down
        section.style.position = "relative";
        section.style.top = "";
        section.style.left = "";
        section.style.right = "";
        section.style.zIndex = "";
  
        locked = false;
  
        // Scroll past the section to avoid jump
        const offset = section.offsetTop + section.offsetHeight;
        window.scrollTo({
          top: offset,
          behavior: "instant" // or "smooth" if you prefer
        });
      }
    }, { passive: false });
  
    window.addEventListener("scroll", () => {
      const sectionTop = section.getBoundingClientRect().top;
  
      if (sectionTop <= 10 && !locked && !lockTriggered) {
        section.style.position = "fixed";
        section.style.top = "100px";
        section.style.left = "0";
        section.style.right = "0";
        section.style.zIndex = "2000";
  
        locked = true;
        lockTriggered = true;
      }
    });
  });
  
