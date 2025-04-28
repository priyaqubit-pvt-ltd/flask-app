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