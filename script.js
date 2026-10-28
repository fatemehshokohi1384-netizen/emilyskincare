const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const closeMenu = () => {
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};

menuToggle?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
const heroMenu = document.querySelector('.hero-menu');
heroMenu?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('open');
  heroMenu.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !menuToggle?.contains(event.target)) {
    closeMenu();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

const tabs = document.querySelectorAll('.service-tabs button');
const serviceGrid = document.querySelector('.service-grid');
const menPanel = document.querySelector('.service-note');

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
  });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');

  const women = tab.dataset.group === 'women';
  if (serviceGrid) serviceGrid.style.display = women ? 'grid' : 'none';
  menPanel?.classList.toggle('active', !women);
}));

const dialog = document.querySelector('#service-dialog');
const dialogTitle = document.querySelector('#dialog-title');
document.querySelectorAll('.details-button').forEach(button => button.addEventListener('click', () => {
  if (!dialog) return;
  if (dialogTitle) dialogTitle.textContent = button.dataset.service || 'جزئیات خدمت';
  if (!dialog.open) dialog.showModal();
}));

document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog?.querySelector('a[href="#booking"]')?.addEventListener('click', () => dialog.close());

const bioToggle = document.querySelector('#bio-toggle');
const bioExtra = document.querySelector('.bio-extra');
bioToggle?.addEventListener('click', () => {
  if (!bioExtra) return;
  const expanded = bioToggle.getAttribute('aria-expanded') === 'true';
  bioToggle.setAttribute('aria-expanded', String(!expanded));
  bioExtra.hidden = expanded;
  const icon = bioToggle.querySelector('span');
  if (icon) icon.textContent = expanded ? '+' : '−';
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const bookingForm = document.querySelector('#booking-form');
bookingForm?.addEventListener('submit', event => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  if (message) message.textContent = 'اطلاعات رزرو ثبت شد؛ مرحلهٔ پرداخت آنلاین پس از اتصال درگاه فعال می‌شود.';
});
