(() => {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !reveals.length) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
})();
