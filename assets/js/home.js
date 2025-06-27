document.addEventListener('DOMContentLoaded', function() {
  // Initialize all dropdowns with click-only behavior
  var dropdownToggles = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  
  dropdownToggles.forEach(function(dropdownToggle) {
    // Initialize Bootstrap dropdown (click only)
    var dropdown = new bootstrap.Dropdown(dropdownToggle, {
      autoClose: true
    });
    
    // Add click handler directly to toggle
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdownMenu = this.nextElementSibling;
      const isShowing = dropdownMenu.classList.contains('show');
      
      // Close all other dropdowns first
      document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
        if (openMenu !== dropdownMenu) {
          openMenu.classList.remove('show');
        }
      });
      
      // Toggle this dropdown
      if (!isShowing) {
        dropdownMenu.classList.add('show');
        
        // Animation for dropdown items
        anime({
          targets: dropdownMenu.querySelectorAll('.menu-item'),
          translateX: [-20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeOutExpo'
        });
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-toggle') && !e.target.closest('.dropdown-menu')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
        openMenu.classList.remove('show');
      });
    }
  });
});

// Prevent dropdown from closing when clicking inside
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});