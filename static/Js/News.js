document.addEventListener("DOMContentLoaded", () => {
  // Function to handle responsive adjustments
  function handleResponsiveLayout() {
    const windowWidth = window.innerWidth
    const contentWrapper = document.querySelector(".lozy-business-content-wrapper")
    const imageWrapper = document.querySelector(".lozy-business-image-wrapper")

    // Adjust layout based on screen size
    if (windowWidth <= 1200) {
      // For smaller screens, ensure content is fully visible
      if (contentWrapper) contentWrapper.style.width = "100%"
      if (imageWrapper) imageWrapper.style.width = "100%"
    } else {
      // Reset styles for larger screens
      if (contentWrapper) contentWrapper.style.width = ""
      if (imageWrapper) imageWrapper.style.width = ""
    }

    // Fix for images not fully displayed on tablet devices
    if (windowWidth >= 768 && windowWidth <= 1024) {
      const newsCardImages = document.querySelectorAll(".lozy-news-card-image")
      newsCardImages.forEach((img) => {
        img.style.width = "85%"
        img.style.margin = "0 auto"
        img.style.display = "block"
      })

      // Fix line spacing issues
      const readingTexts = document.querySelectorAll(
        ".news-section-continue-reading-text, .news-section-article-link-text, .lozy-news-card-link-text",
      )
      readingTexts.forEach((text) => {
        text.style.lineHeight = "1.5"
        text.style.height = "auto"
        text.style.minHeight = "34px"
      })
    }
  }

  // Initial call
  handleResponsiveLayout()

  // Add resize event listener
  window.addEventListener("resize", handleResponsiveLayout)

  // Optional: Add intersection observer for animation when section comes into view
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lozy-business-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const businessSection = document.querySelector(".lozy-business-section")
    if (businessSection) {
      observer.observe(businessSection)
    }
  }

  // Fix for images not displaying properly on load
  window.addEventListener("load", () => {
    // Force image containers to maintain proper aspect ratio
    const imageContainers = document.querySelectorAll(
      ".news-section-main-image-container, .lozy-news-card-image-container, .storage-image-container",
    )
    imageContainers.forEach((container) => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        container.style.height = "auto"
      }
    })
  })
})
