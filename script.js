const stack = [
  [
    "Programming languages",
    [
      ["Python", "python"],
      ["TypeScript", "typescript"],
      ["JavaScript", "javascript"],
      ["C", "c"],
      ["C++", "cplusplus"],
      ["Java", "openjdk"],
      ["C#", "csharp"],
      ["Go", "go"],
      ["Bash", "gnubash"],
      ["PowerShell", "powershell"],
    ],
  ],
  [
    "Front-end craft",
    [
      ["HTML5", "html5"],
      ["CSS3", "css3"],
      ["React", "react"],
      ["Next.js", "nextdotjs"],
      ["Tailwind CSS", "tailwindcss"],
    ],
  ],
  [
    "Tools & workflow",
    [
      ["Git", "git"],
      ["Docker", "docker"],
      ["Figma", "figma"],
      ["Linux", "linux"],
      ["PostgreSQL", "postgresql"],
    ],
  ],
];
const projects = [
  [
    "Cipherboard",
    "Developer tool",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=840&fit=crop&auto=format",
    "A focused workspace for tracing issues, reviewing pull requests, and shipping cleaner releases.",
    ["React", "TypeScript", "Tailwind"],
  ],
  [
    "Signal / Studio",
    "Digital experience",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=840&fit=crop&auto=format",
    "A high-clarity portfolio platform designed to turn technical stories into memorable case studies.",
    ["Next.js", "Motion", "CMS"],
  ],
  [
    "Greenline",
    "Data interface",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=840&fit=crop&auto=format",
    "An elegant control surface for teams monitoring product signals in real time.",
    ["React", "Charts", "API"],
  ],
];
document.querySelector("#stack-grid").innerHTML = stack
  .map(
    ([title, items]) =>
      `<article class="tech-group"><h3>${title}</h3><div class="tech-list">${items.map(([name, icon]) => `<div class="tech"><img src="https://cdn.simpleicons.org/${icon}/a7f3d0" alt="" />${name}</div>`).join("")}</div></article>`,
  )
  .join("");
document.querySelector("#project-grid").innerHTML = projects
  .map(
    ([title, category, image, description, tags], i) =>
      `<article class="project"><div class="project-image"><img src="${image}" alt="${title} project preview" /><span class="project-number">0${i + 1} — ${category}</span></div><div class="project-copy"><div class="project-title"><h3>${title}</h3><span>↗</span></div><p>${description}</p><div class="tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div></article>`,
  )
  .join("");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector("#form-status").textContent =
    "Message queued — connect this form to your email service when ready.";
});
document.querySelector("#year").textContent = new Date().getFullYear();
