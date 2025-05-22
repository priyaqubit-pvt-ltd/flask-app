// adjusting the height of contact-banner image to ensure that it covers its contents
window.addEventListener("DOMContentLoaded", function() {
    adjustContactBannerImage();
    setupFormValidation();
});

window.addEventListener("resize", adjustContactBannerImage);

function adjustContactBannerImage() {
    const contactBannerContent = document.querySelector(".contact-banner-content > h3");
    const contactBtn = document.querySelector(".contact-btn");
    
    if (!contactBannerContent || !contactBtn) return;
    
    const reqHeight = contactBtn.getBoundingClientRect().bottom - contactBannerContent.getBoundingClientRect().top;
    const backgroundImage = document.querySelector(".contact-banner > img");
    
    if (!backgroundImage) return;
    
    if (parseFloat(window.getComputedStyle(backgroundImage).height) >= reqHeight) {
        return;
    } else {
        if (window.innerWidth <= 820) {
            backgroundImage.style.height = reqHeight + 80 + "px";
        } else {
            backgroundImage.style.height = reqHeight + 160 + "px";
        }
    }
}

function setupFormValidation() {
    const form = document.getElementById('blog-contact-form');
    const nameInput = document.getElementById('blog-contact-form-name');
    const emailInput = document.getElementById('blog-contact-form-email');
    const phoneInput = document.getElementById('blog-contact-form-phone');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const successMessage = document.getElementById('form-success-message');
    const failureMessage = document.getElementById('form-failure-message');
    
    if (!form || !nameInput || !emailInput || !phoneInput) return;
    
    // Prevent 'e' character in phone input
    phoneInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // Let it happen
            return;
        }
        
        // Ensure that it's a number or prevent the action
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
    // Input validation
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
        } else {
            nameError.textContent = '';
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    phoneInput.addEventListener('input', function() {
        // Remove any non-numeric characters
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
        
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
        } else {
            phoneError.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {

        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        }
        
        if (isValid) {

            const formData = new FormData(form);

            fetch('/blog-faq-page-submit', {
                method: 'POST',
                body: formData,
            })
            .then(res => {
                if (res.status === 200) {
                    form.reset();
                successMessage.style.display = 'block';
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
                } else if (res.status === 400) {
                failureMessage.style.display = 'block';
                setTimeout(function() {
                    failureMessage.style.display = 'none';
                }, 5000);
                }
  })
  .catch(err => {
    console.error('Network error:', err);
  });
            
        }
    });
}