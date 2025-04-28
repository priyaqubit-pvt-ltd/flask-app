document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const toggleButton = document.querySelector('.storage-navbar__toggle');
    const mobileMenu = document.querySelector('.storage-mobile-menu');
    
    if (toggleButton && mobileMenu) {
      toggleButton.addEventListener('click', function() {
        toggleButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }
    
    // Mobile dropdown toggle
    const mobileDropdowns = document.querySelectorAll('.storage-mobile-menu__dropdown');
    
    mobileDropdowns.forEach(dropdown => {
      const dropdownToggle = dropdown.querySelector('span');
      const dropdownContent = dropdown.querySelector('.storage-mobile-menu__dropdown-content');
      
      // Apply the styles to the dropdown content initially
      if (dropdownContent) {
        dropdownContent.style.background = 'linear-gradient(359.87deg, rgba(47, 44, 44, 0.5) -4.16%, rgba(147, 147, 147, 0.5) 99.89%)';
        dropdownContent.style.backdropFilter = 'blur(80px)';
        dropdownContent.style.webkitBackdropFilter = 'blur(80px)';
        dropdownContent.style.borderRadius = '8px';
        dropdownContent.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        
        // Update link colors
        const links = dropdownContent.querySelectorAll('.storage-mobile-menu__dropdown-link');
        links.forEach(link => {
          link.style.color = '#fff';
        });
      }
      
      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        });
      }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (toggleButton && toggleButton.classList.contains('active')) {
          toggleButton.classList.remove('active');
        }
      }
    });
    
    // Prevent parent link click when clicking on dropdown toggle
    const dropdownToggles = document.querySelectorAll('.storage-navbar__dropdown span');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });
  });

  // Add this to your existing Script.js file
// document.addEventListener('DOMContentLoaded', function() {
//     // Get the Contact Us button from your navbar
//     const contactButton = document.querySelector('.storage-navbar__contact-btn');
    
//     // Add click event listener to open the popup
//     if (contactButton) {
//       contactButton.addEventListener('click', function(e) {
//         e.preventDefault();
//         // This calls the function we exposed in the contact-popup.js file
//         if (window.openContactPopup) {
//           window.openContactPopup();
//         }
//       });
//     }
//   });