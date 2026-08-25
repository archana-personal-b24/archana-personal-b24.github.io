/* ============================================================================
   PORTFOLIO, behaviour
   ----------------------------------------------------------------------------
   Five small independent pieces. Nothing here is required for the content to
   be readable, the site works fine with JS disabled.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  /* --- 1. Theme toggle --------------------------------------------------- */

  var themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    /* private browsing, fall back to the system preference */
  }

  applyTheme(stored || (systemDark.matches ? "dark" : "light"));

  // Follow the OS until the visitor makes an explicit choice.
  systemDark.addEventListener("change", function (event) {
    if (!stored) applyTheme(event.matches ? "dark" : "light");
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      stored = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* --- 2. Sidebar toggle (below 900px) ----------------------------------- */

  var menuToggle = document.getElementById("menuToggle");
  var sidenav = document.getElementById("sidenav");

  function setMenu(open) {
    if (!sidenav || !menuToggle) return;
    sidenav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuToggle.innerHTML =
      '<svg><use href="#i-' + (open ? "close" : "menu") + '" /></svg>';
  }

  if (menuToggle && sidenav) {
    menuToggle.addEventListener("click", function () {
      setMenu(!sidenav.classList.contains("is-open"));
    });

    // Close after tapping a link, so the target section is actually visible.
    sidenav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  /* --- 3. Mark the section you're currently reading ---------------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.sidenav__link[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = new Set();

    var markActive = function () {
      // Of everything on screen, highlight whichever section sits highest.
      var top = null;
      visible.forEach(function (section) {
        if (!top || section.offsetTop < top.offsetTop) top = section;
      });
      navLinks.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          !!top && link.getAttribute("href") === "#" + top.id
        );
      });
    };

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        markActive();
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* --- 4. Missing images become monogram placeholders -------------------- */
  /*  So the layout looks finished before you've added photos and logos.
      Delete the data-monogram attribute once a real image is in place.       */

  function placeholder(img) {
    if (!img.parentElement) return;
    var span = document.createElement("span");
    span.className = "monogram";
    span.textContent = img.dataset.monogram || img.alt || "";
    span.setAttribute("aria-hidden", "true");
    img.replaceWith(span);
  }

  Array.prototype.slice
    .call(document.querySelectorAll("img[data-monogram]"))
    .forEach(function (img) {
      if (img.complete) {
        if (img.naturalWidth === 0) placeholder(img);
      } else {
        img.addEventListener("error", function () {
          placeholder(img);
        });
      }
    });

  /* --- 5. Footer year --------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
