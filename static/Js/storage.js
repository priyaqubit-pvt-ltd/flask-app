document.addEventListener("DOMContentLoaded", function () {
  // Ensure scroll starts at top
  window.scrollTo(0, 0);
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const stepsContainer = document.querySelector(".steps-container");
  const timeline = document.querySelector(".timeline");
  const scrollDot = document.querySelectorAll(".scroll-dot");
  const steps = document.querySelectorAll(".step");
  const stepNumbers = document.querySelectorAll(".step-number");
  const stepText = document.querySelectorAll(".step-text");
  const scrollContainers = document.querySelectorAll(".scroll-dot-container");

  const scrollDotMargin = [null,null,null];
    scrollDotMargin[0] = Math.abs(stepText[0].getBoundingClientRect().top - timeline.getBoundingClientRect().top) + 35;
    scrollDotMargin[1] = Math.abs(stepText[1].getBoundingClientRect().top - timeline.getBoundingClientRect().top) + 35;
    scrollDotMargin[2] = Math.abs(stepText[2].getBoundingClientRect().top - timeline.getBoundingClientRect().top) + 35;

  // Store the initial top position of the container
  let initialContainerTop = 0;

  // Create timeline progress element
  const timelineProgress = document.createElement("div");
  timelineProgress.classList.add("timeline-progress");
  Object.assign(timelineProgress.style, {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    background: "#FFDE59",
    zIndex: "-1",
    height: "0",
    opacity: "1",
    transition: "height 0.2s ease, opacity 0.2s ease",
  });
  timeline.appendChild(timelineProgress);

  // Get initial position after a small delay to ensure accurate measurement
  setTimeout(() => {
    initialContainerTop =
      stepsContainer.getBoundingClientRect().top + window.scrollY;

    // Force initial state - dot at top
    timelineProgress.style.height = "0px";

    // Set initial opacity for steps
    steps.forEach((step) => {
      step.style.opacity = "0";
      step.style.transform = "translateY(20px)";
    });

    // Make first step visible if in view
    if (window.innerHeight > stepsContainer.getBoundingClientRect().top + 100) {
      steps[0].style.opacity = "1";
      steps[0].style.transform = "translateY(0px)";
    }

    updateTimeline();
  }, 100);

  function updateTimeline() {
    const containerRect = stepsContainer.getBoundingClientRect();
    const timelineHeight = timeline.offsetHeight;
    const scrollPosition = window.scrollY;

    console.log("---- Scroll Update ----");
    console.log("Steps Container Top:", containerRect.top);
    console.log("Steps Container Height:", containerRect.height);

    // Calculate how far we've scrolled into the section
    // This ensures we start at 0 and only progress as we scroll down
    const scrollStart = initialContainerTop - window.innerHeight;
    const scrollEnd =
      initialContainerTop + containerRect.height - window.innerHeight * 0.5;
    const scrollRange = scrollEnd - scrollStart;

    const scrollProgress = Math.max(
      0,
      Math.min(1, (scrollPosition - scrollStart) / scrollRange)
    );

    console.log("Scroll Progress:", scrollProgress.toFixed(2));

    // Update dot position
    const dotPosition = timelineHeight * scrollProgress;
    const finalDotPosition = Math.min(timelineHeight - 10, dotPosition);

    console.log("Dot Position (px):", finalDotPosition.toFixed(2));

    // Update timeline progress

    const heightValue = Math.min(Math.max(0,window.innerHeight / 2 - timelineProgress.getBoundingClientRect().top),timeline.getBoundingClientRect().bottom-timeline.getBoundingClientRect().top);
    timelineProgress.style.height = `${heightValue}px`;
    updateDotPosition(heightValue);

    console.log("Timeline Progress Height:", timelineProgress.style.height);
    console.log("Timeline Opacity:", timelineProgress.style.opacity);

    // Update step visibility
    steps.forEach((step, index) => {
      const stepRect = step.getBoundingClientRect();
      const stepTop = stepRect.top;
      const triggerPoint = window.innerHeight * 0.7;

      // Calculate progress for each step
      const stepProgress = Math.max(
        0,
        Math.min(1, ((triggerPoint - stepTop) / triggerPoint) * 1.5)
      );

      console.log(`Step ${index + 1} - Progress: ${stepProgress.toFixed(2)}`);

      // Apply styles based on progress
      step.style.opacity = Math.min(1, stepProgress * 1.2);
      step.style.transform = `translateY(${(1 - stepProgress) * 30}px)`;

      const isCentered = stepNumbers[index].getBoundingClientRect().top <= window.innerHeight / 2 + 200 && stepNumbers[index].getBoundingClientRect().bottom >= window.innerHeight / 2 - 200;

      if(isCentered) {
        stepNumbers[index].style.color = "#FFDE59";
      } else {
        stepNumbers[index].style.color = "#FFFFFF";
      }
    });
  }

  function updateDotPosition(height) {
    Array.from(scrollContainers).forEach((container , i) => {
      container.style.height = Math.max(Math.min (height, stepText[i].getBoundingClientRect().bottom - timeline.getBoundingClientRect().top),scrollDotMargin[i]) + "px";
    });
  }

  // Initial update
  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateTimeline);
  });

  window.addEventListener("resize", () => {
    // Recalculate initial position on resize
    initialContainerTop =
      stepsContainer.getBoundingClientRect().top + window.scrollY;
    updateTimeline();
    initScrollDotsMargins();
  });

  function initScrollDotsMargins() {
    document.querySelector(".scroll-dot-container.first").style.height = scrollDotMargin[0] + "px";
    document.querySelector(".scroll-dot-container.second").style.height = scrollDotMargin[1] + "px";
    document.querySelector(".scroll-dot-container.third").style.height = scrollDotMargin[2] + "px";
  }
  initScrollDotsMargins();
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all sections and dots
  const sections = document.querySelectorAll(".storage-section");
  const contents = document.querySelectorAll(".storage-content");
  const storageText = document.querySelectorAll(".storage-text-container");
  const storageImage = document.querySelectorAll(".storage-image");

  contents.forEach((i)=>{
    i.style.minHeight = window.getComputedStyle(contents[0]).height;
  });

  // commented out the following code as scroll behavior for storage sections is handled in css in this commit

  // // Current section index
  // let currentIndex = 0;

  // // Flag to prevent rapid scrolling
  // let isScrolling = false;

  // // Flag to track if we're inside the showcase container
  // let isInsideShowcase = false;

  // // Timeout for scroll debounce
  // let scrollTimeout;

  // // Function to change section
  // function changeSection(newIndex) {
  //   console.log("Changing section from", currentIndex, "to", newIndex);

  //   if (newIndex < 0) {
  //     newIndex = 0;
  //     console.log("Reached top of showcase, allowing normal scroll");
  //     return false; // Allow normal scroll up
  //   } else if (newIndex >= totalSections) {
  //     newIndex = totalSections - 1;
  //     console.log("Reached bottom of showcase, allowing normal scroll");
  //     return false; // Allow normal scroll down
  //   }

  //   // Remove active class from current section and dot
  //   sections[currentIndex].classList.remove("active");
  //   dots[currentIndex].classList.remove("active");

  //   // Update current index
  //   currentIndex = newIndex;

  //   // Add active class to new section and dot
  //   sections[currentIndex].classList.add("active");
  //   dots[currentIndex].classList.add("active");

  //   return true; // Section changed successfully
  // }

  // // Function to check if element is in viewport
  // function isInViewport(element) {
  //   const rect = element.getBoundingClientRect();
  //   return (
  //     rect.top <= window.innerHeight / 2 &&
  //     rect.bottom >= window.innerHeight / 2
  //   );
  // }

  // Make the previous sections fade as the user scrolls
  window.addEventListener('scroll', () => {
    sections.forEach((section, i) => {
      const nextSection = sections[i + 1];

      // If current is the last
      if (!nextSection) return;
  
      const nextRect = nextSection.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const baseWidth = 90*(1+(i/50));
  
      if (nextRect.top <= sectionRect.bottom) {
        const transformValue = Math.max((1-((sectionRect.bottom - nextRect.top) / sectionRect.height)*0.1)*(100),baseWidth);
        section.children[0].style.transform = `scale(${transformValue}%) translateY(-${100-transformValue}%)`;
      } else {
        section.children[0].style.transform = "";
      }

      if(section.style.opacity <= 0.7) {
        Array.from(section.children[0].children).forEach(element => {
          element.style.opacity = 1 - Math.min((sectionRect.bottom - nextRect.top) / sectionRect.height, 1);
        }); } else {
          Array.from(section.children[0].children).forEach(element => {
            element.style.opacity = 1;
          });
        }
    });
  });

  // function initStorageImageSize() {
  //   storageText.forEach((text,i)=>{
  //     const textHeight = window.getComputedStyle(text).height;
  //     storageImage[i].style.maxHeight = textHeight;
  //   });
  // }

  // initStorageImageSize();
  // // Handle wheel event for showcase scrolling
  // window.addEventListener(
  //   "wheel",
  //   (event) => {
  //     // Only handle special scrolling when inside showcase
  //     if (!isInsideShowcase) {
  //       console.log("Normal scrolling (outside showcase)");
  //       return; // Allow normal scrolling
  //     }
      
      
  //   },
  //   { passive: true }
  // );

  // // Handle touch events for mobile
  // let touchStartY = 0;
  // let touchEndY = 0;

  // document.addEventListener(
  //   "touchstart",
  //   (event) => {
  //     touchStartY = event.touches[0].clientY;
  //     console.log("Touch start at Y:", touchStartY);
  //   },
  //   { passive: true }
  // );

  // document.addEventListener(
  //   "touchmove",
  //   (event) => {
  //     // Only track touch if inside showcase
  //     if (!isInsideShowcase) return;

  //     touchEndY = event.touches[0].clientY;
  //   },
  //   { passive: true }
  // );

  // document.addEventListener(
  //   "touchend",
  //   () => {
  //     // Only handle special scrolling when inside showcase
  //     if (!isInsideShowcase) {
  //       return;
  //     }

  //     // If already scrolling, return
  //     if (isScrolling) {
  //       return;
  //     }

  //     // Calculate swipe direction
  //     const direction = touchStartY > touchEndY ? 1 : -1;
  //     const swipeDistance = Math.abs(touchStartY - touchEndY);

  //     // Only change section if the swipe is significant
  //     if (swipeDistance > 50) {
  //       const sectionChanged = changeSection(currentIndex + direction);

  //       if (sectionChanged) {
  //         // Set scrolling flag
  //         isScrolling = true;

  //         // Clear previous timeout
  //         clearTimeout(scrollTimeout);

  //         // Set timeout to reset scrolling flag
  //         scrollTimeout = setTimeout(() => {
  //           isScrolling = false;
  //         }, 800);
  //       }
  //     }
  //   },
  //   { passive: true }
  // );

  // Handle dot clicks
  // dots.forEach((dot, index) => {
  //   dot.addEventListener("click", () => {
  //     console.log("Dot clicked:", index);
  //     changeSection(index);
  //   });
  // });

  // Handle keyboard navigation
  // document.addEventListener("keydown", (event) => {
  //   // Only handle keyboard navigation when inside showcase
  //   if (!isInsideShowcase) return;

  //   if (event.key === "ArrowDown" || event.key === "ArrowRight") {
  //     changeSection(currentIndex + 1);
  //   } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
  //     changeSection(currentIndex - 1);
  //   }
  // });

  // // Initialize first section
  // changeSection(0);

  // Add resize event listener to handle responsive adjustments
  window.addEventListener("resize", () => {
    // initStorageImageSize();
  });
});

// faq question js

document.addEventListener("DOMContentLoaded", function () {
  const questionButtons = document.querySelectorAll(".faq-question");

  questionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = answer.classList.contains("active");

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((item) => {
        item.classList.remove("active");
      });

      // Reset all arrow buttons
      document.querySelectorAll(".arrow-button img").forEach((svg) => {
        svg.style.transform = "rotate(0deg)";
      });

      // If the clicked answer wasn't active, open it
      if (!isActive) {
        answer.classList.add("active");
        this.querySelector(".arrow-button img").style.transform =
          "rotate(90deg)";
      }
      if (!answer.innerHTML.trim()) {
        answer.innerHTML =
          "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>";
      }
    });
  });
});

// platimum page contact from

document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const contactForm = document.getElementById("lozy_contact_form_element");
  const nameInput = document.getElementById("lozy_contact_name_input");
  const emailInput = document.getElementById("lozy_contact_email_input");
  const phoneInput = document.getElementById("lozy_contact_phone_input");
  const locationInput = document.getElementById("lozy_contact_location_input");
  const successPopup = document.getElementById("lozy_contact_success_popup");
  const popupClose = document.querySelector(".lozy_contact_popup_close");

  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number format (accepts various formats)
  function isValidPhone(phone) {
    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }

  // Add input validation styling
  function setInputValidation(input, isValid) {
    if (isValid) {
      input.style.borderColor = "#4CAF50";
      input.style.backgroundColor = "rgba(76, 175, 80, 0.05)";
    } else {
      input.style.borderColor = "#F44336";
      input.style.backgroundColor = "rgba(244, 67, 54, 0.05)";
    }
  }

  // Reset input styling
  function resetInputStyling(input) {
    input.style.borderColor = "#333";
    input.style.backgroundColor = "transparent";
  }

  // Add input event listeners for real-time validation
  emailInput.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      setInputValidation(this, isValidEmail(this.value));
    } else {
      resetInputStyling(this);
    }
  });

  phoneInput.addEventListener("input", function () {
    if (this.value.trim() !== "") {
      setInputValidation(this, isValidPhone(this.value));
    } else {
      resetInputStyling(this);
    }
  });

  // Form submission handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === "") {
      setInputValidation(nameInput, false);
      isValid = false;
    } else {
      setInputValidation(nameInput, true);
    }

    // Email validation
    if (!isValidEmail(emailInput.value)) {
      setInputValidation(emailInput, false);
      isValid = false;
    } else {
      setInputValidation(emailInput, true);
    }

    // Phone validation
    if (!isValidPhone(phoneInput.value)) {
      setInputValidation(phoneInput, false);
      isValid = false;
    } else {
      setInputValidation(phoneInput, true);
    }

    // Location validation
    if (locationInput.value.trim() === "") {
      setInputValidation(locationInput, false);
      isValid = false;
    } else {
      setInputValidation(locationInput, true);
    }

    // If all validations pass
    if (isValid) {
      // In a real application, you would send the form data to the server here
      // For this example, we'll just show the success popup

      // Show success popup
      successPopup.style.display = "flex";

      // Reset form
      contactForm.reset();

      // Reset all input styling
      resetInputStyling(nameInput);
      resetInputStyling(emailInput);
      resetInputStyling(phoneInput);
      resetInputStyling(locationInput);
    }
  });

  // Close popup when clicking the X
  popupClose.addEventListener("click", function () {
    successPopup.style.display = "none";
  });

  // Close popup when clicking outside the content
  successPopup.addEventListener("click", function (e) {
    if (e.target === successPopup) {
      successPopup.style.display = "none";
    }
  });
});
