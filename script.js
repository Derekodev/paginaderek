document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById("theme-toggle-btn")
  
    // Language functionality
    const languageToggleBtn = document.getElementById("language-toggle-btn")
    const currentLangSpan = document.querySelector(".current-lang")
  
    // Eliminar el código que intenta cargar translations.json
    // Reemplazar:
    // let translations; // Declare translations variable
  
    // fetch('translations.json')
    //   .then(response => response.json())
    //   .then(data => {
    //     translations = data;
  
    //     // ... resto del código ...
    //   })
    //   .catch(error => console.error("Error loading translations:", error));
  
    // Con:
    // Detect browser language
    function detectBrowserLanguage() {
      const browserLang = navigator.language || navigator.userLanguage
      return browserLang.startsWith("es") ? "es" : "en"
    }
  
    // Get saved language or detect browser language
    let currentLang = localStorage.getItem("language") || detectBrowserLanguage()
  
    // Update UI with the current language
    function updateLanguageUI() {
      currentLangSpan.textContent = currentLang.toUpperCase()
      document.documentElement.setAttribute("lang", currentLang)
    }
  
    // Apply translations
    // Eliminar esta línea que está sobrescribiendo las traducciones globales:
    // let translations = {}; // Declare translations variable
  
    // Reemplazar con:
    // Verificar que las traducciones estén disponibles globalmente
    if (typeof translations === "undefined") {
      console.error(
        "Error: translations no está definido. Asegúrate de que translations.js se cargue antes que script.js",
      )
      // Crear un objeto vacío para evitar errores
      window.translations = {
        es: { btn_view_more: "Ver más", btn_view_less: "Ver menos" },
        en: { btn_view_more: "View more", btn_view_less: "View less" },
      }
    }
    function applyTranslations() {
      const elements = document.querySelectorAll("[data-i18n]")
      elements.forEach((element) => {
        const key = element.getAttribute("data-i18n")
        // Check if translations[currentLang] exists before accessing it
        if (typeof translations !== "undefined" && translations[currentLang] && translations[currentLang][key]) {
          element.textContent = translations[currentLang][key]
        }
      })
  
      // Update toggle button text for projects
      const detailsToggles = document.querySelectorAll(".details-toggle")
      detailsToggles.forEach((toggle) => {
        const card = toggle.closest(".project-card")
        if (card.classList.contains("active")) {
          toggle.setAttribute("aria-label", translations[currentLang].btn_view_less)
        } else {
          toggle.setAttribute("aria-label", translations[currentLang].btn_view_more)
        }
      })
    }
  
    // Initialize language
    updateLanguageUI()
    // Descomentar estas líneas para aplicar las traducciones:
    // applyTranslations() // Commented out because translations is not defined
    // Cambiar a:
    applyTranslations()
  
    // Toggle language when button is clicked
    languageToggleBtn.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es"
      localStorage.setItem("language", currentLang)
      updateLanguageUI()
      // Y también descomentar:
      // applyTranslations() // Commented out because translations is not defined
      // Cambiar a:
      applyTranslations()
      console.log("Language changed to:", currentLang) // Debug log
    })
  
    // Project details toggle functionality
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      const toggleBtn = card.querySelector(".details-toggle")
  
      toggleBtn.addEventListener("click", () => {
        // Close all other cards
        projectCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove("active")
          }
        })
  
        // Toggle the clicked card
        card.classList.toggle("active")
  
        // Update the toggle button text based on the current language
        // Check if translations[currentLang] exists before accessing it
        if (typeof translations !== "undefined") {
          if (card.classList.contains("active")) {
            toggleBtn.setAttribute("aria-label", translations[currentLang].btn_view_less)
          } else {
            toggleBtn.setAttribute("aria-label", translations[currentLang].btn_view_more)
          }
        }
      })
    })
    //   })
    //   .catch((error) => console.error("Error loading translations:", error))
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark")
    } else if (savedTheme === "light") {
      document.body.classList.remove("dark")
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark")
    }
  
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark")
  
      // Save preference to localStorage
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for fixed nav
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll("nav a")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Añadir efecto hover a las tarjetas de proyectos
    // const projectCards = document.querySelectorAll(".project-card") // Remove duplicated declaration
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)"
        card.style.boxShadow = "0 8px 25px var(--shadow-color)"
      })
  
      card.addEventListener("mouseleave", () => {
        if (!card.classList.contains("active")) {
          card.style.transform = ""
          card.style.boxShadow = ""
        }
      })
    })
  
    // Añadir efecto hover a los elementos de habilidades
    const skillItems = document.querySelectorAll(".skill-item")
    skillItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-3px)"
      })
  
      item.addEventListener("mouseleave", () => {
        item.style.transform = ""
      })
    })
  
    // Detectar cuando el carrusel de tecnologías está en el viewport
    const techCarousel = document.querySelector(".tech-carousel")
    if (techCarousel) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.querySelector(".tech-items").style.animationPlayState = "running"
            } else {
              entry.target.querySelector(".tech-items").style.animationPlayState = "paused"
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(techCarousel)
    }
  })
  
  