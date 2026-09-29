(function () {
  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle
  var toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Terminal intro
  var terminal = document.getElementById('terminal');
  var script = [
    { cmd: 'whoami', out: 'Mykhailo Salikhanov — Front-End / Full Stack Developer' },
    { cmd: 'cat skills.txt', out: 'TypeScript · React · Redux · AI tools' }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function promptLine() {
    var line = el('span');
    line.appendChild(el('span', 'prompt', '$ '));
    var cmd = el('span', 'cmd');
    line.appendChild(cmd);
    terminal.appendChild(line);
    return cmd;
  }

  var cursor = el('span', 'cursor');

  function renderInstantly() {
    script.forEach(function (step) {
      promptLine().textContent = step.cmd;
      terminal.appendChild(document.createTextNode('\n' + step.out + '\n'));
    });
    promptLine();
    terminal.appendChild(cursor);
  }

  function typeStep(i) {
    if (i >= script.length) {
      promptLine();
      terminal.appendChild(cursor);
      return;
    }
    var step = script[i];
    var cmd = promptLine();
    terminal.appendChild(cursor);
    var pos = 0;
    var timer = setInterval(function () {
      cmd.textContent += step.cmd.charAt(pos++);
      if (pos >= step.cmd.length) {
        clearInterval(timer);
        setTimeout(function () {
          terminal.insertBefore(document.createTextNode('\n' + step.out + '\n'), cursor);
          terminal.removeChild(cursor);
          setTimeout(function () { typeStep(i + 1); }, 450);
        }, 350);
      }
    }, 70);
  }

  if (reducedMotion) {
    renderInstantly();
  } else {
    setTimeout(function () { typeStep(0); }, 500);
  }

  // Reveal sections on scroll
  var sections = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (s) { s.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(function (s) { observer.observe(s); });
})();
