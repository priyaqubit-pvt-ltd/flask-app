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
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 10);
            }
        });

        // Reattach event listeners to new toggle buttons
        attachToggleListeners();
    }

    // Function to attach toggle listeners to buttons
    function attachToggleListeners() {
        const toggleButtons = document.querySelectorAll('.faq-toggle-btn');
        const questionHeaders = document.querySelectorAll('.faq-question-header');
        
        // Add event listeners to toggle buttons
        toggleButtons.forEach(button => {
            // Remove existing event listeners if any
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                toggleQuestion(this);
            });
        });
        
        // Make the question headers clickable to toggle content
        questionHeaders.forEach(header => {
            // Remove existing event listeners if any
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
            
            newHeader.addEventListener('click', function(e) {
                // Don't trigger if the button itself was clicked (handled above)
                if (e.target.closest('.faq-toggle-btn')) return;
                
                // Trigger toggle on the button
                const button = this.querySelector('.faq-toggle-btn');
                toggleQuestion(button);
            });
        });
    }
    
    // Function to toggle question open/closed
    function toggleQuestion(button) {
        // Toggle active class on button
        button.classList.toggle('active');
        
        // Toggle icon
        const icon = button.querySelector('i');
        if (icon.classList.contains('fa-plus')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
        
        // Toggle content visibility with smoother animation
        const content = button.closest('.faq-question-header').nextElementSibling;
        
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

    // Form Submission
    if (faqForm) {
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
    }
    
    // Ensure proper resizing of content when window is resized
    window.addEventListener('resize', function() {
        document.querySelectorAll('.faq-question-content.active').forEach(content => {
            content.style.maxHeight = content.scrollHeight + 'px';
        });
    });
});