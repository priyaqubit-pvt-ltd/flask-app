// // Enable cookies for faster loading
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if cookies are enabled
//     if (navigator.cookieEnabled) {
//         // Set a cookie to remember the user has visited this page
//         document.cookie = "visited404=true; max-age=86400; path=/";
//     }
    
//     // Lazy loading for images
//     const lazyImages = document.querySelectorAll('.error-image');
    
//     if ('IntersectionObserver' in window) {
//         const imageObserver = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     const image = entry.target;
//                     image.src = image.dataset.src;
//                     image.classList.remove('lazy');
//                     imageObserver.unobserve(image);
//                 }
//             });
//         });
        
//         lazyImages.forEach(image => {
//             imageObserver.observe(image);
//         });
//     } else {
//         // Fallback for browsers that don't support IntersectionObserver
//         lazyImages.forEach(image => {
//             image.src = image.dataset.src;
//         });
//     }
    
//     // Add event listener for window resize to ensure responsive behavior
//     window.addEventListener('resize', function() {
//         // Adjust any necessary styles based on window size
//         const errorContainer = document.querySelector('.error-container');
//         if (window.innerWidth <= 768) {
//             // Additional responsive adjustments if needed
//         }
//     });
// });