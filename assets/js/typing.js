/**
 * Smera T S — Typewriter Text Animation
 * Cycles through Smera's professional roles seamlessly
 */

(function () {
  'use strict';

  const roles = [
    'Software Developer',
    'AI & ML Enthusiast',
    'Web Developer',
    'Computer Science Engineering Student'
  ];

  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Removing characters
      typingTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45; // faster deletion
    } else {
      // Adding characters
      typingTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95 + Math.random() * 30; // organic typing jitter
    }

    // Finished typing the whole word
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } 
    // Finished deleting the word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after initial load
  setTimeout(type, 800);
})();

