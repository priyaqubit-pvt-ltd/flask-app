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