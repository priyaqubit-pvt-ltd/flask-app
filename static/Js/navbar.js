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
      const dropdownToggle = dropdown.querySelector('.storage-mobile-menu__item_wrapper');
      const dropdownContent = dropdown.querySelector('.storage-mobile-menu__dropdown-content');
      
      // Apply the styles to the dropdown content initially
      if (dropdownContent) {
        // dropdownContent.style.background = 'linear-gradient(359.87deg, rgba(47, 44, 44, 0.5) -4.16%, rgba(147, 147, 147, 0.5) 99.89%)';
        // dropdownContent.style.backdropFilter = 'blur(80px)';
        // dropdownContent.style.webkitBackdropFilter = 'blur(80px)';
        // dropdownContent.style.borderRadius = '8px';
        // dropdownContent.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        
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
    const dropdownMenu = document.querySelector(".storage-navbar__dropdown-content");
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('mouseenter', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle("active");
        document.querySelector(".storage-navbar__dropdown-icon").classList.toggle("active");
      });
    });

    dropdownMenu.addEventListener("mouseleave",()=>{
      dropdownMenu.classList.remove("active");
        document.querySelector(".storage-navbar__dropdown-icon").classList.remove("active");
    })

const navbarImage = document.querySelector(".storage-navbar__dropdown-image");
const navbarContent = document.querySelector(".storage-navbar__dropdown-description");
const navbarLink = document.querySelector(".storage-navbar__dropdown-know-more");
const Images = [
  {"src":"img1.png", "content":`Self-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`
                      , "link":"/storage/self-storage"},
  {"src":"img2.png", "content":`Commercial-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/commercial-storage"},
  {"src":"img3.png", "content":`Business-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/business-storage"},
  {"src":"img1.png", "content":`Enterprise-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/enterprises-storage"},
  {"src":"img2.png", "content":`3pl-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/3pl-storage"},
  {"src":"img3.png", "content":`Vehicle-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/vehicle-storage"},
  {"src":"img1.png", "content":`Warehouse-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/warehouse-storage"},
  {"src":"img2.png", "content":`Platinum-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/platinum-storage"},
  {"src":"img3.png", "content":`Bonded-storage offers a secure, flexible, and convenient
                      solution for storing your belongings, whether for
                      short-term or long-term needs.`, "link":"/storage/bonded-storage"},
]
// change images in mega menu on hover 
document.querySelectorAll(".storage-navbar__dropdown-item").forEach((dropdownItem,idx) =>{
  dropdownItem.addEventListener("mouseenter",()=>{
    navbarImage.src = `/static/images/${Images[idx].src}`;
    navbarContent.innerText = Images[idx].content;
    navbarLink.href = Images[idx].link;
  })
})

  // Add this to your existing Script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Get the Contact Us button from your navbar
    const contactButton = document.querySelector('.storage-navbar__contact-btn');
  
    // Add click event listener to open the popup
    if (contactButton) {
      contactButton.addEventListener('click', function(e) {
        e.preventDefault();
        // This calls the function we exposed in the contact-popup.js file
        const contactPopUp = document.querySelector(".contact-popup-container");
        if (contactPopUp) {
          contactPopUp.classList.toggle("active");
        }
      });
    }

       
  });

    document.addEventListener('click', function(e) {
    if (contactPopUp && contactPopUp.classList.contains("active")) {
      // Check if click target is outside the popup and button
      if (!contactPopUp.contains(e.target) && !contactButton.contains(e.target)) {
        contactPopUp.classList.remove("active");
      }
    }
  });
  });

