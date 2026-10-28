const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
const tabs = document.querySelectorAll('.service-tabs button');
const serviceGrid = document.querySelector('.service-grid');
const menPanel = document.querySelector('.service-note');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
  const women = tab.dataset.group === 'women';
  serviceGrid.style.display = women ? 'grid' : 'none';
  menPanel.classList.toggle('active', !women);
}));
const dialog = document.querySelector('#service-dialog');
document.querySelectorAll('.details-button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-title').textContent = button.dataset.service;
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
const bioToggle = document.querySelector('#bio-toggle');
const bioExtra = document.querySelector('.bio-extra');
bioToggle?.addEventListener('click', () => {
  const expanded = bioToggle.getAttribute('aria-expanded') === 'true';
  bioToggle.setAttribute('aria-expanded', String(!expanded));
  bioExtra.hidden = expanded;
  bioToggle.querySelector('span').textContent = expanded ? '+' : '−';
});
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
