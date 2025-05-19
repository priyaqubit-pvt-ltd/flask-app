// This script handles any dynamic functionality for the news section
document.addEventListener("DOMContentLoaded", () => {
  // Placeholder for future JavaScript functionality
  // For example, you could add click event listeners to the "Continue Reading" links

  const readMoreLinks = document.querySelectorAll(".featured-read-more, .news-item-read-more")

  readMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default behavior for demo purposes
      e.preventDefault()

      // Get the article title from the closest parent with a title
      let articleTitle
      if (this.classList.contains("featured-read-more")) {
        articleTitle = document.querySelector(".featured-title").textContent
      } else {
        articleTitle = this.closest(".news-item").querySelector(".news-item-title").textContent
      }

      // Log which article was clicked (for demonstration)
      console.log(`User clicked to read more about: "${articleTitle}"`)

      // In a real implementation, you would navigate to the article page
      // window.location.href = this.getAttribute('href');
    })
  })

  // Add lazy loading for images to improve performance
  const lazyLoadImages = () => {
    const images = document.querySelectorAll(".featured-image, .news-item-image")

    // Replace with actual image sources when implementing
    const imageSources = {
      ".featured-image": "path/to/featured-image.webp",
      ".news-item-image:nth-of-type(1)": "path/to/sustainable-storage.webp",
      ".news-item-image:nth-of-type(2)": "path/to/iba-bank.webp",
      ".news-item-image:nth-of-type(3)": "path/to/inventory-management.webp",
    }

    // This is just a placeholder function - you would replace with actual image paths
    // when implementing on your site
  }

  // Call lazy load function
  lazyLoadImages()

  // Add functionality for latest news section
  const latestNewsReadMoreLinks = document.querySelectorAll(".news-card-read-more")

  latestNewsReadMoreLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default behavior for demo purposes
      e.preventDefault()

      // Get the article title from the closest parent with a title
      const articleTitle = this.closest(".news-card").querySelector(".news-card-title").textContent

      // Log which article was clicked (for demonstration)
      console.log(`User clicked to read more about: "${articleTitle}"`)

      // In a real implementation, you would navigate to the article page
      // window.location.href = this.getAttribute('href');
    })
  })

  // Add lazy loading for images to improve performance
  const lazyLoadLatestImages = () => {
    const images = document.querySelectorAll(".news-card-image")

    // Replace with actual image sources when implementing
    const imageSources = {
      ".news-card:nth-child(1) .news-card-image": "path/to/home-storage.webp",
      ".news-card:nth-child(2) .news-card-image": "path/to/business-storage.webp",
      ".news-card:nth-child(3) .news-card-image": "path/to/art-storage.webp",
    }

    // This is just a placeholder function - you would replace with actual image paths
    // when implementing on your site
  }

  // Call lazy load function
  lazyLoadLatestImages()

  // Add animation for cards on scroll
  const animateOnScroll = () => {
    const cards = document.querySelectorAll(".news-card")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: 0.1 },
    )

    cards.forEach((card) => {
      card.style.opacity = 0
      card.style.transform = "translateY(20px)"
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(card)
    })
  }

  // Call animation function
  animateOnScroll()
})
