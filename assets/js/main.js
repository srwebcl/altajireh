// main.js - interacción básica

document.addEventListener("DOMContentLoaded", () => {
  /* Header scroll */
  const header = document.querySelector(".aj-header");
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* Mobile menu */
  const toggleBtn = document.querySelector(".aj-menu-toggle");
  const navMobile = document.querySelector(".aj-nav-mobile");
  if (toggleBtn && navMobile) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("is-open");
      const isOpen = toggleBtn.classList.contains("is-open");
      navMobile.style.display = isOpen ? "block" : "none";
    });

    // Cerrar al hacer click en un link
    navMobile.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("is-open");
        navMobile.style.display = "none";
      })
    );
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* Smooth scroll links internos */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top =
            target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });
});
