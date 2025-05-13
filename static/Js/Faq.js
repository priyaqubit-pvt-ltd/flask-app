document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality with improved animation
    const toggleButtons = document.querySelectorAll('.faq-toggle-btn');
    
    // Initialize accordion heights for smoother animations
    document.querySelectorAll('.faq-question-content.active').forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-plus')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
            
            // Toggle content visibility with smoother animation
            const content = this.closest('.faq-question-header').nextElementSibling;
            
            if (content.classList.contains('active')) {
                content.style.maxHeight = '0px';
                // Small delay to allow the animation to complete before removing the active class
                setTimeout(() => {
                    content.classList.remove('active');
                }, 500);
            } else {
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Form Validation - Fix for phone number accepting characters
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        // Remove any non-numeric characters
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Make the question headers clickable to toggle content
    const questionHeaders = document.querySelectorAll('.faq-question-header');
    
    questionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            // Don't trigger if the button itself was clicked (handled above)
            if (e.target.closest('.faq-toggle-btn')) return;
            
            // Trigger click on the toggle button
            const button = this.querySelector('.faq-toggle-btn');
            button.click();
        });
    });
    
    // Form Submission
    const faqForm = document.getElementById('faqForm');
    
    faqForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(faqForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Here you would typically send the data to your backend
        console.log('Form submitted with data:', formDataObj);
        
        // For demonstration purposes, show success message
        alert('Your question has been submitted successfully!');
        
        // Reset form
        faqForm.reset();
    });
    
    // Ensure proper resizing of content when window is resized
    window.addEventListener('resize', function() {
        document.querySelectorAll('.faq-question-content.active').forEach(content => {
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    });
});