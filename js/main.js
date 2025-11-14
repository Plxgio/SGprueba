document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm')
  const navToggle = document.createElement('button')
  const nav = document.querySelector('nav ul')
  
  // Menú hamburguesa
  navToggle.className = 'nav-toggle'
  navToggle.innerHTML = '☰'
  document.querySelector('header .container').appendChild(navToggle)

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active')
  })

  // Función para WhatsApp
  function initWhatsApp() {
    const phoneNumber = '+5491124994669'
    const whatsappLinks = document.querySelectorAll('a[href*="tel"]')
    
    whatsappLinks.forEach(link => {
      if (link.getAttribute('href').includes(phoneNumber)) {
        link.setAttribute('href', `https://wa.me/${phoneNumber}`)
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      }
    })

    // Botón flotante de WhatsApp
    const floatingWhatsApp = document.createElement('a')
    floatingWhatsApp.href = `https://wa.me/${phoneNumber}`
    floatingWhatsApp.target = '_blank'
    floatingWhatsApp.rel = 'noopener noreferrer'
    floatingWhatsApp.className = 'floating-whatsapp'
    floatingWhatsApp.innerHTML = 'WhatsApp'
    floatingWhatsApp.setAttribute('aria-label', 'Contactar por WhatsApp')
    document.body.appendChild(floatingWhatsApp)
  }

  // Scroll suave con easing personalizado
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]')
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault()
        
        const targetId = this.getAttribute('href')
        const targetElement = document.querySelector(targetId)
        
        if (targetElement) {
          nav.classList.remove('active')
          
          const headerHeight = document.querySelector('header').offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight
          
          // Scroll suave personalizado
          smoothScrollTo(targetPosition, 1200) // 1200ms = más suave
        }
      })
    })
  }

  // Función de scroll suave personalizada
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    // Función easing para movimiento más natural
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Header sticky con efecto al scroll
  function initStickyHeader() {
    const header = document.querySelector('header')
    const scrollThreshold = 100
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    })
  }

     // PHP - el formulario se envía directamente al archivo PHP
    contactForm.addEventListener('submit', function(e) {
    // Solo agregamos el loading state
    const submitBtn = contactForm.querySelector('button')
    submitBtn.textContent = 'Enviando...'
    submitBtn.disabled = true
    
    // El envío real lo hace PHP
    // No prevenimos el comportamiento por defecto
  })

  // Inicializar funciones
  initWhatsApp()
  initSmoothScroll()
  initStickyHeader()
})