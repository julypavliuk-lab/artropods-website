/* ============================================================
   ARTROPODS — script.js
   ============================================================ */

/* ── SPLASH ── */
const splash     = document.getElementById('splash');
const splashMenu = document.getElementById('splash-menu');
let menuVisible  = false;

function dismissSplash() {
  splash.classList.add('fade-out');
  setTimeout(() => splash.style.display = 'none', 900);
}

splash.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') return; // let nav links handle themselves
  if (!menuVisible) {
    splashMenu.classList.add('visible');
    menuVisible = true;
  } else {
    dismissSplash();
  }
});

/* ── PROJECT PAGES ── */
function openProject(id) {
  const navH = document.getElementById('main-nav').offsetHeight;
  const page = document.getElementById('project-' + id);
  if (!page) return;
  page.style.top = navH + 'px';
  page.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.querySelectorAll('.project-page').forEach(p => p.classList.remove('active'));
  document.body.style.overflow = '';
}

function switchProject(id) {
  document.querySelectorAll('.project-page').forEach(p => p.classList.remove('active'));
  const navH = document.getElementById('main-nav').offsetHeight;
  const page = document.getElementById('project-' + id);
  if (page) {
    page.style.top = navH + 'px';
    page.classList.add('active');
    page.scrollTop = 0;
  }
}

/* Escape key closes project page */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProject();
});

/* ── SCROLL REVEAL (project & contact items) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

/* ── PROJECT HOVER PREVIEW (desktop only) ── */
const preview    = document.getElementById('project-preview');
const previewImg = preview.querySelector('img');

document.querySelectorAll('.project-item[data-preview]').forEach(item => {
  item.addEventListener('mouseenter', () => {
    const rect = item.getBoundingClientRect();
    previewImg.src = item.dataset.preview;
    preview.style.top = rect.top + 'px';
    preview.classList.add('visible');
  });
  item.addEventListener('mouseleave', () => {
    preview.classList.remove('visible');
  });
});
