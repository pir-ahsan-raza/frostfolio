// bar animtion   
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll("#skills .bar");

  const animateSkill = (bar) => {
    const fill = bar.querySelector(".fill");
    const circle = bar.querySelector(".circle");
    const percent = parseInt(fill.getAttribute("data-percent"), 10);

    fill.style.width = percent + "%";
    circle.style.left = percent + "%";

    let current = 0;
    const duration = 1500;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = percent / steps;

    const counter = setInterval(() => {
      current += increment;
      if (current >= percent) {
        current = percent;
        clearInterval(counter);
      }
      circle.textContent = Math.floor(current) + "%";
    }, stepTime);
  };

  // use IntersectionObserver to trigger when skills are visible
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          obs.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
});

//-------------------------------------------
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

// coggle sidebar
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

// close sidebar when clicking overlay
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// close when clicking a link
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });
});
//-------------------------------------------

// active link on scroll
const sections = [...document.querySelectorAll("main section")];
const links = [...document.querySelectorAll("nav a")];
const setActive = (id) => {
  links.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + id)
  );
};
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setActive(e.target.id);
      }
    });
  },
  { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);
sections.forEach((s) => observer.observe(s));

// reveal o view
const revObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        revObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.22 }
);
document.querySelectorAll(".reveal").forEach((el) => revObs.observe(el));

// Contact form: open mailto (your choice!)
// const form = document.getElementById("contactForm");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const data = new FormData(form);
//   const name = encodeURIComponent(data.get("name"));
//   const email = encodeURIComponent(data.get("email"));
//   const msg = encodeURIComponent(data.get("message"));
//   const subject = `Portfolio inquiry from ${name}`;
//   const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${msg}`;
//   window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
// });

// getting year!
document.getElementById("year").textContent = new Date().getFullYear();

