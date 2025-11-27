document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".navbar");
  const dropdownTriggers = nav.querySelectorAll(".dropdown-trigger");
  const hamburger = document.querySelector(".hamburger-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  // New selector for the separate arrow button
  const mobileDropdownArrows = mobileMenu.querySelectorAll(
    ".mobile-dropdown-arrow"
  );

  // --- Desktop Dropdown Handlers ---

  dropdownTriggers.forEach((trigger) => {
    const navItem = trigger.closest(".nav-item");
    let timeout;

    // Open dropdown on mouse enter
    navItem.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      navItem.classList.add("dropdown-open");
      trigger.setAttribute("aria-expanded", "true");
    });

    // Close dropdown on mouse leave (with slight delay)
    navItem.addEventListener("mouseleave", () => {
      timeout = setTimeout(() => {
        navItem.classList.remove("dropdown-open");
        trigger.setAttribute("aria-expanded", "false");
      }, 200); // 200ms delay for a better feel
    });
  });

  // --- Mobile Menu Handlers ---

  function toggleMobileMenu() {
    const isActive = mobileMenu.classList.toggle("is-active");
    hamburger.classList.toggle("is-active");
    hamburger.setAttribute("aria-expanded", isActive);
    document.body.style.overflow = isActive ? "hidden" : ""; // Prevent body scrolling
  }

  hamburger.addEventListener("click", toggleMobileMenu);

  // --- Mobile Dropdown Handlers (for the new separate arrow button) ---

  mobileDropdownArrows.forEach((arrowBtn) => {
    const parentItem = arrowBtn.closest(".mobile-nav-item");
    // Use the aria-controls attribute to find the controlled dropdown <ul>
    const dropdownId = arrowBtn.getAttribute("aria-controls");
    const dropdown = document.getElementById(dropdownId);

    if (!dropdown) return; // Guard clause

    arrowBtn.addEventListener("click", (e) => {
      // This click only targets the dropdown arrow button, ensuring the link is untouched.

      // Toggle the open state on the parent item
      const isNowOpen = parentItem.classList.toggle("is-open");

      // Apply max-height transition class for slide effect
      if (isNowOpen) {
        dropdown.classList.add("is-open");
        arrowBtn.setAttribute("aria-expanded", "true");
      } else {
        dropdown.classList.remove("is-open");
        arrowBtn.setAttribute("aria-expanded", "false");
      }
    });
  });
});
