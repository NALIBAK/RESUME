'use strict';

import { sendEmail } from './emailjs-config.js';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Contact form validation and submission
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formBtn.disabled = true;
  
  try {
    const formData = new FormData(form);
    await sendEmail(formData);
    alert('Message sent successfully!');
    form.reset();
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    formBtn.disabled = false;
  }
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = {
  about: document.querySelector("[data-page='about']"),
  resume: document.querySelector("[data-page='resume']"),
  contact: document.querySelector("[data-page='contact']")
};

navigationLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    navigationLinks.forEach(l => l.classList.remove("active"));
    Object.values(pages).forEach(page => page.classList.remove("active"));
    
    link.classList.add("active");
    Object.values(pages)[index].classList.add("active");
    window.scrollTo(0, 0);
  });
});

// ── Theme Toggle ──
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') html.setAttribute('data-theme', 'light');

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  });
})();