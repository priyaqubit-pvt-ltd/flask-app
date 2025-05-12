// document.addEventListener('DOMContentLoaded', function() {
//     // Get DOM elements
//     const contactPopupOverlay = document.getElementById('contactPopupOverlay');
//     const contactPopupClose = document.getElementById('contactPopupClose');
//     const contactPopupContainer = document.querySelector('.contact-popup-container');
//     const submitButton = document.getElementById('submitButton');
//     const contactForm = document.getElementById('contactForm');
   
//     // Function to open the popup
//     function openContactPopup() {
//       contactPopupOverlay.classList.add('active');
//       document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
//     }
   
//     // Function to close the popup
//     function closeContactPopup() {
//       contactPopupOverlay.classList.remove('active');
//       document.body.style.overflow = ''; // Restore scrolling
//     }
   
//     // Close popup when close button is clicked
//     contactPopupClose.addEventListener('click', function() {
//       closeContactPopup();
//     });
   
//     // Close popup when clicking outside the popup container
//     contactPopupOverlay.addEventListener('click', function(e) {
//       if (e.target === contactPopupOverlay) {
//         closeContactPopup();
//       }
//     });
   
//     // Prevent closing when clicking inside the popup container
//     contactPopupContainer.addEventListener('click', function(e) {
//       e.stopPropagation();
//     });
   
//     // Handle form submission
//     submitButton.addEventListener('click', function(e) {
//       e.preventDefault();
     
//       // Trigger form validation
//       if (contactForm.checkValidity()) {
//         // Get form data
//         const formData = new FormData(contactForm);
//         const formDataObj = {};
       
//         formData.forEach((value, key) => {
//           formDataObj[key] = value;
//         });
       
//         // Here you would typically send the data to your backend
//         console.log('Form submitted with data:', formDataObj);
       
//         // Show success message (you can customize this)
//         alert('Thank you for your message! We will get back to you soon.');
       
//         // Reset form and close popup
//         contactForm.reset();
//         closeContactPopup();
//       } else {
//         // Trigger browser's native form validation
//         contactForm.reportValidity();
//       }
//     });
   
//     // Expose the openContactPopup function globally so it can be called from the navbar
//     window.openContactPopup = openContactPopup;
//   });

document.addEventListener("DOMContentLoaded",()=>{
const contactBtn = document.querySelector(".storage-navbar__contact-btn");
const contactPopUp = document.querySelector(".contact-popup-container");


contactBtn.addEventListener("click",()=>{
contactPopUp.classList.toggle("active");
})

document.querySelector(".contact-popup-close").addEventListener("click",()=>{
    contactPopUp.classList.remove("active");
})

document.addEventListener("click",(e)=>{
    if (contactPopUp && !contactPopUp.contains(e.target) && !e.target.classList.contains("storage-navbar__contact-btn")) {
    contactPopUp.classList.remove("active");
  }
})
})
