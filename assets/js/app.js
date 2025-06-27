// universal-nav.js - Include this file on every page
document.addEventListener('DOMContentLoaded', function() {
  
  // Function to initialize dropdowns
  function initializeDropdowns() {
    var dropdownToggles = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    
    dropdownToggles.forEach(function(dropdownToggle) {
      const dropdownMenu = dropdownToggle.nextElementSibling;
      const dropdownContainer = dropdownToggle.closest('.dropdown');
      
      // Skip if already initialized
      if (dropdownToggle.hasAttribute('data-dropdown-initialized')) {
        return;
      }
      
      // Mark as initialized
      dropdownToggle.setAttribute('data-dropdown-initialized', 'true');
      
      let hoverTimeout;
      
      // Show dropdown on hover over toggle
      dropdownToggle.addEventListener('mouseenter', function(e) {
        clearTimeout(hoverTimeout);
        
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
          if (openMenu !== dropdownMenu) {
            openMenu.classList.remove('show');
          }
        });
        
        // Show this dropdown
        dropdownMenu.classList.add('show');
        
        // Animation for dropdown items (only if anime.js is loaded)
        if (typeof anime !== 'undefined') {
          anime({
            targets: dropdownMenu.querySelectorAll('.menu-item'),
            translateX: [-20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
          });
        }
      });
      
      // Keep dropdown open when hovering over the entire container
      if (dropdownContainer) {
        dropdownContainer.addEventListener('mouseenter', function(e) {
          clearTimeout(hoverTimeout);
        });
        
        // Hide dropdown when leaving the entire container
        dropdownContainer.addEventListener('mouseleave', function(e) {
          hoverTimeout = setTimeout(() => {
            dropdownMenu.classList.remove('show');
          }, 200);
        });
      }
      
      // Also allow click to toggle
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isShowing = dropdownMenu.classList.contains('show');
        
        if (isShowing) {
          dropdownMenu.classList.remove('show');
        } else {
          // Close all other dropdowns first
          document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
            if (openMenu !== dropdownMenu) {
              openMenu.classList.remove('show');
            }
          });
          
          dropdownMenu.classList.add('show');
        }
      });
    });
  }
  
  // Initialize dropdowns
  initializeDropdowns();
  
  // Global click handler to close dropdowns
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
        openMenu.classList.remove('show');
      });
    }
  });

  // Handle navbar scrolling effect (only on index page)
  if (document.body.classList.contains('index-page')) {
    const navbar = document.querySelector('.main-navbar');
    
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }
  
  // Re-initialize dropdowns if new content is loaded dynamically
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        initializeDropdowns();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});