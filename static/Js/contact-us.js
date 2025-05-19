document.addEventListener("DOMContentLoaded", () => {
  // styled icon for location marker
  const styledIcon = L.divIcon({
    className: 'marker',
    html: '<div class="marker-outer"><div class="marker-shape"></div><div class="marker-circle"></div><div class="marker-circle-inner"></div></div>',
    iconSize: [32, 35]
  });
  
  // Initialize the map
  const map = L.map("map", {
    zoom: 15,
    attributionControl: false,
  }).setView([28.5921, 77.046], 13) // Coordinates for Dwarka, New Delhi

  // Add a dark-themed map layer
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 15,
    maxZoom: 15,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
  }).addTo(map)

  // Add a marker for the location
  const marker = L.marker([28.5921, 77.046], { icon: styledIcon });
  marker.addTo(map);

  // Center the map on the marker with an offset to account for the content overlay
  const point = map.latLngToContainerPoint(marker.getLatLng());
  const difference = (window.innerWidth >= 1600) ? 100 : 80;
  const offsetPoint = L.point(point.x - difference, point.y + 40);
  const offsetLatLng = map.containerPointToLatLng(offsetPoint);
  map.setView(offsetLatLng, map.getZoom());

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
  
  // Handle window resize to adjust map view
  window.addEventListener('resize', () => {
    // Re-center the map on resize
    map.invalidateSize();
    const point = map.latLngToContainerPoint(marker.getLatLng());
    const difference = (window.innerWidth >= 1600) ? 100 : 80;
    const offsetPoint = L.point(point.x - difference, point.y + 40);
    const offsetLatLng = map.containerPointToLatLng(offsetPoint);
    map.setView(offsetLatLng, map.getZoom());
  });
})