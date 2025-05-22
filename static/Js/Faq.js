document.addEventListener('DOMContentLoaded', function() {
    // Define FAQ content for each category
    const faqContent = {
        "Services related": [
            {
                title: "What services do you offer?",
                answer: "We provide IT consulting, software development, cloud solutions, cybersecurity, and AI/ML-based services tailored to businesses of all sizes."
            },
            {
                title: "Do you offer custom software development?",
                answer: "Yes, we specialize in custom software solutions designed specifically for your business needs, from web applications to enterprise systems."
            },
            {
                title: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity and requirements. Small projects may take 2-4 weeks, while larger enterprise solutions can take 3-6 months or more."
            }
        ],
        "Pricing": [
            {
                title: "How is your pricing structured?",
                answer: "We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers depending on your needs and project scope."
            },
            {
                title: "Do you offer any discounts for startups?",
                answer: "Yes, we have special startup packages and flexible payment terms to help new businesses get off the ground with quality technology solutions."
            },
            {
                title: "What's included in your maintenance packages?",
                answer: "Our maintenance packages include regular updates, security patches, performance monitoring, and technical support with various tiers based on response time and service level."
            }
        ],
        "Location related": [
            {
                title: "Where are your offices located?",
                answer: "Our headquarters is in San Francisco, with additional offices in New York, London, and Singapore, allowing us to serve clients globally."
            },
            {
                title: "Do you work with clients remotely?",
                answer: "Yes, we work with clients worldwide through our secure remote collaboration tools and regular video meetings, ensuring smooth communication regardless of location."
            },
            {
                title: "Do you offer on-site services?",
                answer: "Yes, for certain projects and clients, we can arrange for our team members to work on-site at your location for better integration with your team."
            }
        ],
        "Payment methods": [
            {
                title: "What payment methods do you accept?",
                answer: "We accept credit cards, bank transfers, PayPal, and cryptocurrency payments to accommodate various client preferences."
            },
            {
                title: "What are your payment terms?",
                answer: "Standard payment terms include a 30% deposit upfront, with remaining payments tied to project milestones. For ongoing services, we typically bill monthly."
            },
            {
                title: "Do you offer payment plans?",
                answer: "Yes, we can arrange flexible payment plans for larger projects, spreading the cost over the development timeline to help with cash flow management."
            }
        ]
    };

    // Get DOM elements
    const categoryItems = document.querySelectorAll('.faq-category-item');
    const faqQuestionsContainer = document.querySelector('.faq-questions');
    const phoneInput = document.getElementById('phone');
    const faqForm = document.getElementById('faqForm');
    const successMessage = document.getElementById('form-success-message');
    const failureMessage = document.getElementById('form-failure-message');

    // Function to update FAQ content based on selected category
    function updateFAQContent(category) {
        const questions = faqContent[category] || [];

        // Clear existing questions
        faqQuestionsContainer.innerHTML = '';

        // Add new questions based on selected category
        questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'faq-question-item';
            
            // Set the first question as active by default
            const isActive = index === 0;
            
            questionItem.innerHTML = `
                <div class="faq-question-header">
                    <h3 class="faq-question-title">${question.title}</h3>
                    <button class="faq-toggle-btn ${isActive ? 'active' : ''}">
                        <i class="fas fa-${isActive ? 'minus' : 'plus'}"></i>
                    </button>
                </div>
                <div class="faq-question-content ${isActive ? 'active' : ''}">
                    <p class="faq-question-answer">${question.answer}</p>
                </div>
                <div class="faq-divider"></div>
            `;
            
            faqQuestionsContainer.appendChild(questionItem);
            
            // Set max-height for active content
            if (isActive) {
                const content = questionItem.querySelector('.faq-question-content');
                // Use requestAnimationFrame for smoother animation
                requestAnimationFrame(() => {
                    content.style.opacity = '1';
                    content.style.maxHeight = content.scrollHeight + 'px';
                });
            }
        });

        // Reattach event listeners to new toggle buttons
        attachToggleListeners();
    }

    // Function to attach toggle listeners to buttons
    function attachToggleListeners() {
        // First handle dynamically created FAQ items
        const allQuestionItems = document.querySelectorAll('.faq-question-item');
        
        allQuestionItems.forEach(item => {
            const header = item.querySelector('.faq-question-header');
            const button = item.querySelector('.faq-toggle-btn');
            const icon = item.querySelector('.faq-toggle-btn i');
            
            // Remove existing listeners by cloning and replacing elements
            if (header) {
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                // Get the new references after replacement
                const newButton = newHeader.querySelector('.faq-toggle-btn');
                const newIcon = newHeader.querySelector('.faq-toggle-btn i');
                
                // Add click event to the header (excluding the button)
                newHeader.addEventListener('click', function(e) {
                    // Don't trigger if clicking directly on button or icon (they have their own handlers)
                    if (e.target === newButton || e.target === newIcon) return;
                    toggleQuestion(newButton);
                });
                
                // Add click event to the button
                if (newButton) {
                    newButton.addEventListener('click', function(e) {
                        e.stopPropagation();
                        toggleQuestion(this);
                    });
                }
                
                // Add click event directly to the icon
                if (newIcon) {
                    newIcon.addEventListener('click', function(e) {
                        e.stopPropagation();
                        // Find the parent button and toggle it
                        const parentButton = this.closest('.faq-toggle-btn');
                        if (parentButton) {
                            toggleQuestion(parentButton);
                        }
                    });
                }
            }
        });
    }
    
    // Function to toggle question open/closed with smooth animation
    function toggleQuestion(button) {
        // Toggle active class on button
        button.classList.toggle('active');
        
        // Get the icon element
        const icon = button.querySelector('i');
        
        // Toggle icon with smooth animation
        if (icon.classList.contains('fa-plus')) {
            // Smoothly transition from plus to minus
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            // Smoothly transition from minus to plus
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
        
        // Get the content element
        const content = button.closest('.faq-question-header').nextElementSibling;
        
        // Use GSAP-like smooth animation approach
        if (content.classList.contains('active')) {
            // Closing animation
            content.style.opacity = '0';
            
            // Use a transition end listener to handle the height change
            const transitionEndHandler = () => {
                content.style.maxHeight = '0px';
                content.classList.remove('active');
                content.removeEventListener('transitionend', transitionEndHandler);
            };
            
            // Listen for the opacity transition to end
            content.addEventListener('transitionend', transitionEndHandler, { once: true });
        } else {
            // Opening animation - first add the active class and set initial height
            content.classList.add('active');
            
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                // First frame: set initial state
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                
                // Second frame: animate to final state
                requestAnimationFrame(() => {
                    content.style.opacity = '1';
                    content.style.maxHeight = content.scrollHeight + 'px';
                });
            });
        }
    }

    // Add click event listeners to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all category items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get category text
            const categoryText = this.querySelector('.faq-category-text').textContent;
            
            // Update FAQ content based on selected category
            updateFAQContent(categoryText);
        });
    });

    // Set the first category as active by default and load its content
    if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
        const firstCategoryText = categoryItems[0].querySelector('.faq-category-text').textContent;
        updateFAQContent(firstCategoryText);
    }

    // Form Validation - Fix for phone number accepting characters
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove any non-numeric characters
            this.value = this.value.replace(/\D/g, '');
        });
    }

    
    // Ensure proper resizing of content when window is resized
    window.addEventListener('resize', function() {
        document.querySelectorAll('.faq-question-content.active').forEach(content => {
            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
            });
        });
    });
    
    // Initialize toggle listeners for all FAQ items on page load
    attachToggleListeners();
    
    // Direct fix for the static FAQ items that might not be caught by the above
    document.querySelectorAll('.faq-right > .faq-question-item').forEach(item => {
        const button = item.querySelector('.faq-toggle-btn');
        const icon = item.querySelector('.faq-toggle-btn i');
        const header = item.querySelector('.faq-question-header');
        
        if (icon) {
            // Remove any existing listeners
            const newIcon = icon.cloneNode(true);
            icon.parentNode.replaceChild(newIcon, icon);
            
            // Add direct click handler to the icon
            newIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                const parentButton = this.closest('.faq-toggle-btn');
                if (parentButton) {
                    toggleQuestion(parentButton);
                }
            });
        }
        
        if (button) {
            // Remove any existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add click handler to the button
            newButton.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleQuestion(this);
            });
        }
        
        if (header) {
            // Remove any existing listeners
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            
            // Add click handler to the header (excluding button and icon)
            newHeader.addEventListener('click', function(e) {
                // Don't trigger if clicking directly on button or icon
                if (e.target.closest('.faq-toggle-btn') || e.target.tagName === 'I') return;
                
                const headerButton = this.querySelector('.faq-toggle-btn');
                if (headerButton) {
                    toggleQuestion(headerButton);
                }
            });
        }
    });

    // Form submission
    faqForm.addEventListener('submit', function(e) {

        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        if (document.querySelector(".faq-form-input.name").value.trim() === '') {
            isValid = false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(document.querySelector(".faq-form-input.email").value)) {
            isValid = false;
        }
        
        if (document.querySelector(".faq-form-input.phone").value.trim() === '') {
            isValid = false;
        }
        
        if (isValid) {

            const formData = new FormData(faqForm);

            fetch('/blog-faq-page-submit', {
                method: 'POST',
                body: formData,
            })
            .then(res => {
                if (res.status === 200) {
                    faqForm.reset();
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
});