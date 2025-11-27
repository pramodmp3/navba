// stackly-navbar.js

(() => {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileDrawer = document.getElementById("mobile-menu");

  // Desktop dropdown: toggle on click, close on outside click + escape
  const desktopDropdownButtons = Array.from(
    document.querySelectorAll(".has-dropdown > .nav-link")
  );

  desktopDropdownButtons.forEach((btn) => {
    const parent = btn.closest(".has-dropdown");
    const dropdown = parent.querySelector(".dropdown");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = parent.classList.contains("open");
      // Close others
      document
        .querySelectorAll(".has-dropdown.open")
        .forEach((d) => d.classList.remove("open"));
      // Toggle current
      if (!isOpen) {
        parent.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        parent.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!parent.contains(e.target)) {
        parent.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        parent.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Hamburger opens mobile drawer
  const toggleMobile = (open) => {
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
    mobileDrawer.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.contains("active");
    toggleMobile(!isOpen);
  });

  // Close mobile drawer on outside click
  mobileDrawer.addEventListener("click", (e) => {
    if (e.target === mobileDrawer) toggleMobile(false);
  });

  // Mobile submenu toggles (arrow opens, text navigates)
  const mobileSubGroups = Array.from(
    document.querySelectorAll(".mobile-item.has-dropdown")
  );
  mobileSubGroups.forEach((group) => {
    const arrowBtn = group.querySelector(".mobile-arrow");
    const sub = group.querySelector(".mobile-sub");
    arrowBtn.addEventListener("click", () => {
      const expanded = arrowBtn.getAttribute("aria-expanded") === "true";
      arrowBtn.setAttribute("aria-expanded", String(!expanded));
      sub.classList.toggle("open", !expanded);
    });
  });

  // Keyboard navigation for accessibility: close drawer on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
      toggleMobile(false);
      hamburger.focus();
    }
  });

  // Prevent focus from escaping modal when open (basic focus trap)
  mobileDrawer.addEventListener("keydown", (e) => {
    if (!mobileDrawer.classList.contains("open")) return;
    const focusable = mobileDrawer.querySelectorAll("a, button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
