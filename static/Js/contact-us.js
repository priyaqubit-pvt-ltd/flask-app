document.addEventListener("DOMContentLoaded", function () {
    // Ensure scroll starts at top
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  
    const stepsContainer = document.querySelector(".steps-container");
    const timeline = document.querySelector(".timeline");
    const scrollDot = document.querySelector(".scroll-dot");
    const steps = document.querySelectorAll(".step");
  
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
      background: "white",
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
      scrollDot.style.top = "0px";
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
      scrollDot.style.top = `${finalDotPosition}px`;
  
      console.log("Dot Position (px):", finalDotPosition.toFixed(2));
  
      // Update timeline progress
      timelineProgress.style.height = `${dotPosition}px`;
      timelineProgress.style.opacity = `${1 - scrollProgress * 0.5}`;
  
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
    });
  });











  document.addEventListener("DOMContentLoaded", () => {

    // styled icon for location marker
    const styledIcon = L.divIcon({
      className: 'marker',
      html: '<div class="marker-shape"></div>',
      iconSize: [32, 35]
    });
    // Initialize the map
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
    }).setView([28.5921, 77.046], 13) // Coordinates for Dwarka, New Delhi
  
    // Add a dark-themed map layer
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	    minZoom: 7,
	    maxZoom: 7,
	    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    ext: 'png'
    }).addTo(map)
  
    // Add a marker for the location
    L.marker([28.5921, 77.046], { icon: styledIcon }).addTo(map)
  
    // Handle form submission
    const contactForm = document.getElementById("contactForm")
  
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()
  
      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
      }
  
      // Validate form data
      if (!validateForm(formData)) {
        return
      }
  
      // Send form data to server (simulated)
      submitFormData(formData)
    })
  
    function validateForm(data) {
      // Basic validation
      if (!data.name || !data.location || !data.phone || !data.email) {
        alert("Please fill in all fields")
        return false
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address")
        return false
      }
  
      // Phone validation
      const phoneRegex = /^\+?[0-9]{10,14}$/
      if (!phoneRegex.test(data.phone)) {
        alert("Please enter a valid phone number")
        return false
      }
  
      return true
    }
  
    function submitFormData(data) {
      // Simulate API call
      console.log("Sending form data:", data)
  
      // Show loading state
      const sendButton = document.querySelector(".send-button span")
      const originalText = sendButton.textContent
      sendButton.textContent = "Sending..."
  
      // Simulate server response
      setTimeout(() => {
        // Reset form
        contactForm.reset()
  
        // Show success message
        alert("Thank you for your message! We will get back to you soon.")
  
        // Reset button text
        sendButton.textContent = originalText
      }, 1500)
    }
  
    // Get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.latitude, position.coords.longitude]
  
        // // Add a marker for user's location
        L.marker(userLocation, { icon: styledIcon }).addTo(map)
  
        // Calculate distance to office
        const officeLocation = [28.5921, 77.046]
        const distance = calculateDistance(userLocation, officeLocation)
  
        // Show distance info
        console.log(`You are approximately ${distance.toFixed(2)} km away from our office.`)
      })
    }
  
    function calculateDistance(point1, point2) {
      // Simple haversine formula to calculate distance between two points
      const R = 6371 // Radius of the Earth in km
      const dLat = ((point2[0] - point1[0]) * Math.PI) / 180
      const dLon = ((point2[1] - point1[1]) * Math.PI) / 180
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((point1[0] * Math.PI) / 180) *
          Math.cos((point2[0] * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c
      return distance
    }
  })
  

  