// document.addEventListener("DOMContentLoaded", function () {
//     function e() {
//       document
//         .querySelectorAll(
//           ".news-section-main-image-container, .news-section-main-heading, .news-section-article-card"
//         )
//         .forEach((e) => {
//           var t;
//           0 <= (t = (t = e).getBoundingClientRect()).top &&
//             0 <= t.left &&
//             t.bottom <=
//               (window.innerHeight || document.documentElement.clientHeight) &&
//             t.right <=
//               (window.innerWidth || document.documentElement.clientWidth) &&
//             !e.classList.contains("animated") &&
//             (e.classList.add("animated"),
//             (e.style.opacity = "1"),
//             (e.style.transform = "translateY(0)"));
//         });
//     }
//     document
//       .querySelectorAll(
//         ".news-section-continue-reading-link, .news-section-article-link"
//       )
//       .forEach((e) => {
//         e.addEventListener("mouseenter", function () {
//           this.querySelector(".news-section-arrow-icon").style.transform =
//             "translateX(5px)";
//         }),
//           e.addEventListener("mouseleave", function () {
//             this.querySelector(".news-section-arrow-icon").style.transform =
//               "translateX(0)";
//           });
//       }),
//       document
//         .querySelectorAll(
//           ".news-section-main-image-container, .news-section-main-heading, .news-section-article-card"
//         )
//         .forEach((e) => {
//           (e.style.opacity = "0"),
//             (e.style.transform = "translateY(20px)"),
//             (e.style.transition = "opacity 0.5s ease, transform 0.5s ease");
//         }),
//       window.addEventListener("scroll", e),
//       e();
//   }),
//   document.addEventListener("DOMContentLoaded", function () {
//     function e() {
//       document
//         .querySelectorAll(
//           ".lozy-news-card, .lozy-business-solutions-heading, .lozy-business-solutions-text, .lozy-business-solutions-image-container"
//         )
//         .forEach((e) => {
//           var t;
//           0 <= (t = (t = e).getBoundingClientRect()).top &&
//             0 <= t.left &&
//             t.bottom <=
//               (window.innerHeight || document.documentElement.clientHeight) &&
//             t.right <=
//               (window.innerWidth || document.documentElement.clientWidth) &&
//             !e.classList.contains("animated") &&
//             (e.classList.add("animated"),
//             (e.style.opacity = "1"),
//             (e.style.transform = "translateY(0)"));
//         });
//     }
//     document.querySelectorAll(".lozy-news-card-link").forEach((e) => {
//       e.addEventListener("mouseenter", function () {
//         this.querySelector(".lozy-news-card-arrow-icon").style.transform =
//           "translateX(5px)";
//       }),
//         e.addEventListener("mouseleave", function () {
//           this.querySelector(".lozy-news-card-arrow-icon").style.transform =
//             "translateX(0)";
//         });
//     }),
//       document
//         .querySelectorAll(
//           ".lozy-news-card, .lozy-business-solutions-heading, .lozy-business-solutions-text, .lozy-business-solutions-image-container"
//         )
//         .forEach((e) => {
//           (e.style.opacity = "0"),
//             (e.style.transform = "translateY(20px)"),
//             (e.style.transition = "opacity 0.5s ease, transform 0.5s ease");
//         }),
//       (document.querySelector(".lozy-latest-news-heading").style.marginTop =
//         "0"),
//       (document.querySelector(
//         ".lozy-business-solutions-content"
//       ).style.marginTop = "0"),
//       (document.querySelector(
//         ".lozy-business-solutions-image-container"
//       ).style.marginTop = "0"),
//       window.addEventListener("scroll", e),
//       e();
//   }),
//   js,
//   document.addEventListener("scroll", function () {
//     var e,
//       t = document.querySelector(".timeline-container"),
//       n = document.querySelector(".dot");
//     t && n
//       ? ((e = t.getBoundingClientRect().top + window.scrollY),
//         (t = t.offsetHeight),
//         (e = (window.scrollY - e) / (t - window.innerHeight)),
//         (e = Math.max(0, Math.min(1, e))),
//         (n.style.top = e * (t - 20) + "px"))
//       : console.error("Error: .timeline-container or .dot not found.");
//   }),
//   document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll(".faq-question").forEach((e) => {
//       e.addEventListener("click", function () {
//         var e = this.nextElementSibling,
//           t = e.classList.contains("active");
//         document.querySelectorAll(".faq-answer").forEach((e) => {
//           e.classList.remove("active");
//         }),
//           document.querySelectorAll(".arrow-button svg").forEach((e) => {
//             e.style.transform = "rotate(0deg)";
//           }),
//           t ||
//             (e.classList.add("active"),
//             (this.querySelector(".arrow-button svg").style.transform =
//               "rotate(90deg)")),
//           e.innerHTML.trim() ||
//             (e.innerHTML =
//               "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>");
//       });
//     });
//   });








// Check if the document is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Function to check if element is in viewport
//     function isInViewport(element) {
//         const rect = element.getBoundingClientRect();
//         return (
//             rect.top >= 0 &&
//             rect.left >= 0 &&
//             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//         );
//     }

//     // Get elements
//     const storageHeading = document.querySelector('.storage-heading');
//     const paragraphs = document.querySelectorAll('.storage-paragraph');
//     const storageImage = document.querySelector('.storage-image');

//     // Add fade-in animation when elements come into view
//     function checkElements() {
//         if (storageHeading && isInViewport(storageHeading)) {
//             storageHeading.style.opacity = '1';
//         }
        
//         paragraphs.forEach(paragraph => {
//             if (isInViewport(paragraph)) {
//                 paragraph.style.opacity = '1';
//             }
//         });
        
//         if (storageImage && isInViewport(storageImage)) {
//             storageImage.style.opacity = '1';
//         }
//     }

//     // Set initial opacity
//     if (storageHeading) storageHeading.style.opacity = '0';
//     paragraphs.forEach(paragraph => paragraph.style.opacity = '0');
//     if (storageImage) storageImage.style.opacity = '0';

//     // Add transition for smooth fade-in
//     if (storageHeading) storageHeading.style.transition = 'opacity 0.5s ease-in';
//     paragraphs.forEach(paragraph => paragraph.style.transition = 'opacity 0.5s ease-in');
//     if (storageImage) storageImage.style.transition = 'opacity 0.5s ease-in 0.3s';

//     // Check elements on load
//     checkElements();

//     // Check elements on scroll
//     window.addEventListener('scroll', checkElements);

//     // Enable lazy loading for images
//     if ('loading' in HTMLImageElement.prototype) {
//         const images = document.querySelectorAll('img[loading="lazy"]');
//         images.forEach(img => {
//             img.src = img.dataset.src;
//         });
//     } else {
//         // Fallback for browsers that don't support lazy loading
//         const script = document.createElement('script');
//         script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
//         document.body.appendChild(script);
//     }
// });














document.addEventListener('DOMContentLoaded', function() {
    // Function to handle responsive adjustments
    function handleResponsiveLayout() {
        const windowWidth = window.innerWidth;
        const contentWrapper = document.querySelector('.lozy-business-content-wrapper');
        const imageWrapper = document.querySelector('.lozy-business-image-wrapper');
        
        // Adjust layout based on screen size
        if (windowWidth <= 1200) {
            // For smaller screens, ensure content is fully visible
            contentWrapper.style.width = '100%';
            imageWrapper.style.width = '100%';
        } else {
            // Reset styles for larger screens
            contentWrapper.style.width = '';
            imageWrapper.style.width = '';
        }
    }

    // Initial call
    handleResponsiveLayout();
    
    // Add resize event listener
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Optional: Add intersection observer for animation when section comes into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('lozy-business-visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(document.querySelector('.lozy-business-section'));
    }
});