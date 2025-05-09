// JavaScript for enhancing the footer functionality

document.addEventListener("DOMContentLoaded", () => {
    // Enable lazy loading for images
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.loading = "lazy"
    })
  
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add hover effects for links
    const allLinks = document.querySelectorAll("a")
    allLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.opacity = "0.8"
        this.style.transition = "opacity 0.3s ease"
      })
  
      link.addEventListener("mouseleave", function () {
        this.style.opacity = "1"
        this.style.transition = "opacity 0.3s ease"
      })
    })
  
    // Minify CSS and JS in production
    // This is a placeholder - actual minification would be done during build process
  
    // Enable cookies for faster loading
    function setCookie(name, value, days) {
      let expires = ""
      if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = "; expires=" + date.toUTCString()
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/"
    }
  
    // Set a cookie to indicate the user has visited before
    setCookie("visited", "true", 30)
  })
  