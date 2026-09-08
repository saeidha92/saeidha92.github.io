
// Mobile nav 
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}


// Hero circuit parallax (subtle, mouse-driven)
const circuitBg = document.getElementById('circuitBg');
const heroFull = document.querySelector('.hero-full');

if (circuitBg && heroFull) {
  const heroReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!heroReducedMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    heroFull.addEventListener('mousemove', (event) => {
      const rect = heroFull.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 16;
      targetY = relY * 16;
    });

    heroFull.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      circuitBg.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateParallax);
    }
    animateParallax();
  }
}


// Hero terminal 
let typedCmd = document.getElementById('typedCmd');

if (typedCmd) {
  const lines = [
    { cmd: 'whoami', out: 'Saeid Hasan Abadi — Power Systems Engineer & Full-Stack Developer.' },
    { cmd: 'cat background.txt', out: 'M.Sc Electrical Power Engineering, PLC experience.' },
    { cmd: 'cat stack.txt', out: 'Frontend: JavaScript. Backend: Django.' },
    { cmd: 'cat status.txt', out: 'Open to internships and junior roles.' }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  const typingSpeed = 55;
  const pauseAfterLine = 1400;

  function typeStep() {
    const current = lines[lineIndex];

    if (charIndex <= current.cmd.length) {
      typedCmd.textContent = current.cmd.slice(0, charIndex);
      charIndex++;
      setTimeout(typeStep, typingSpeed);
    } else {
      const out = document.createElement('span');
      out.className = 'out';
      out.textContent = current.out;
      typedCmd.parentElement.appendChild(out);

      setTimeout(() => {
        lineIndex = (lineIndex + 1) % lines.length;
        charIndex = 0;

      
        const promptLine = document.createElement('div');
        promptLine.innerHTML = '<span class="prompt">$</span> <span class="cmd"></span>';
        typedCmd.parentElement.parentElement.insertBefore(promptLine, document.getElementById('caret'));
        typedCmd = promptLine.querySelector('.cmd');

        typeStep();
      }, pauseAfterLine);
    }
  }

 
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    typedCmd.textContent = lines[0].cmd;
    const out = document.createElement('span');
    out.className = 'out';
    out.textContent = lines[0].out;
    typedCmd.parentElement.appendChild(out);
  } else {
    setTimeout(typeStep, 500);
  }
}


// Contact 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  const status = document.getElementById('formStatus');

  const errors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    message: document.getElementById('messageError')
  };

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    let valid = true;

    if (!nameField.value.trim()) {
      errors.name.textContent = 'Please enter your name.';
      valid = false;
    } else {
      errors.name.textContent = '';
    }

    if (!emailField.value.trim() || !isValidEmail(emailField.value.trim())) {
      errors.email.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      errors.email.textContent = '';
    }

    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      errors.message.textContent = 'Message should be at least 10 characters.';
      valid = false;
    } else {
      errors.message.textContent = '';
    }

    return valid;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validate()) {
      status.textContent = `Thanks, ${nameField.value.trim()} — your message looks good. (Connect this form to a backend or a service like Formspree to actually deliver it.)`;
      contactForm.reset();
    } else {
      status.textContent = '';
    }
  });
}
