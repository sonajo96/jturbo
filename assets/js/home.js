document.addEventListener('DOMContentLoaded', function() {
  // Initialize all dropdowns with click-only behavior
  var dropdownToggles = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  
  dropdownToggles.forEach(function(dropdownToggle) {
    // Initialize Bootstrap dropdown (click only)
    var dropdown = new bootstrap.Dropdown(dropdownToggle, {
      autoClose: true // This ensures dropdown closes when clicking outside
    });
  });

  // Animation for dropdown items (only on click)
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dropdown = toggle.nextElementSibling;
      if (dropdown.classList.contains('show')) {
        anime({
          targets: dropdown.querySelectorAll('.menu-item'),
          translateX: [-20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeOutExpo'
        });
      }
    });
  });
});

// Prevent dropdown from closing when clicking inside
document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});