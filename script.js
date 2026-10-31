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

// Jalali booking calendar and step-by-step reservation UI.
const bookingWizard = document.querySelector('#booking-wizard');
if (bookingWizard) {
  const bookingState = { step: 1, service: null, serviceName: '', date: null, time: null, timeLabel: '' };
  const serviceButtons = [...document.querySelectorAll('.booking-service-option')];
  const panels = [...document.querySelectorAll('.booking-step-panel')];
  const indicators = [...document.querySelectorAll('[data-step-indicator]')];
  const daysHost = document.querySelector('#jalali-calendar-days');
  const monthLabel = document.querySelector('#jalali-month-label');
  const timesHost = document.querySelector('#available-times');
  const status = document.querySelector('#booking-submit-message');
  const summary = document.querySelector('#booking-summary');
  const jalaliDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'numeric', day: 'numeric' });
  const jalaliMonth = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric', month: 'long' });
  const faDigits = new Intl.NumberFormat('fa-IR');
  let monthAnchor = new Date();
  monthAnchor.setHours(0,0,0,0);
  let availabilityRequest = 0;

  const latinDigits = value => String(value).replace(/[۰-۹٠-٩]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit) >= 0 ? '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit) : '٠١٢٣٤٥٦٧٨٩'.indexOf(digit));
  const jalaliParts = date => {
    const parts = Object.fromEntries(jalaliDate.formatToParts(date).map(part => [part.type, part.value]));
    return { year: Number(latinDigits(parts.year)), month: Number(latinDigits(parts.month)), day: Number(latinDigits(parts.day)) };
  };
  const isoDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const dateAt = (date, offset) => { const copy = new Date(date); copy.setDate(copy.getDate()+offset); return copy; };
  const monthStart = date => {
    let cursor = new Date(date); cursor.setHours(0,0,0,0);
    for (let i=0;i<32;i++) { if (jalaliParts(cursor).day === 1) return cursor; cursor.setDate(cursor.getDate()-1); }
    return cursor;
  };
  const isSameJalaliMonth = (a,b) => { const x=jalaliParts(a), y=jalaliParts(b); return x.year===y.year && x.month===y.month; };
  const prettyJalali = date => new Intl.DateTimeFormat('fa-IR-u-ca-persian', { weekday:'long', year:'numeric', month:'long', day:'numeric' }).format(date);

  function renderCalendar() {
    if (!daysHost || !monthLabel) return;
    const start = monthStart(monthAnchor);
    const startOffset = (start.getDay()+1)%7; // Saturday is the first day of the Persian week.
    const gridStart = dateAt(start, -startOffset);
    monthLabel.textContent = jalaliMonth.format(monthAnchor);
    daysHost.replaceChildren();
    const today = new Date(); today.setHours(0,0,0,0);
    for (let i=0;i<42;i++) {
      const date = dateAt(gridStart, i);
      const parts = jalaliParts(date);
      const inMonth = isSameJalaliMonth(date, monthAnchor);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = faDigits.format(parts.day);
      button.classList.toggle('outside-month', !inMonth);
      button.classList.toggle('today', isoDate(date)===isoDate(today));
      button.classList.toggle('selected', bookingState.date===isoDate(date));
      button.setAttribute('aria-label', prettyJalali(date));
      const isFriday = date.getDay() === 5;
      button.disabled = !inMonth || date < today || isFriday;
      if (!button.disabled) button.addEventListener('click', () => {
        bookingState.date = isoDate(date);
        bookingState.time = null;
        bookingState.timeLabel = '';
        renderCalendar();
        loadAvailableTimes();
      });
      daysHost.append(button);
    }
  }

  async function loadAvailableTimes() {
    if (!timesHost || !bookingState.service || !bookingState.date) return;
    const requestNumber = ++availabilityRequest;
    timesHost.innerHTML = '<p class="booking-api-note">در حال بررسی ساعت‌های آزاد…</p>';
    try {
      const query = new URLSearchParams({ service: bookingState.service, date: bookingState.date });
      const response = await fetch(`/api/booking/availability?${query}`, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('availability_unavailable');
      const data = await response.json();
      if (requestNumber !== availabilityRequest) return;
      const available = Array.isArray(data.availableTimes) ? data.availableTimes : [];
      timesHost.replaceChildren();
      if (!available.length) {
        const note = document.createElement('p'); note.className='booking-api-note';
        note.textContent = 'برای این روز ساعت آزادی پیدا نشد. روز دیگری را انتخاب کن.';
        timesHost.append(note); return;
      }
      available.forEach(slot => {
        const label = typeof slot === 'string' ? slot : (slot.label || slot.startTime || slot.time || '');
        const value = typeof slot === 'string' ? slot : (slot.id || slot.startTime || slot.time || label);
        if (!label) return;
        const button = document.createElement('button'); button.type='button'; button.className='available-time'; button.textContent=label; button.dataset.value=value;
        button.addEventListener('click', () => {
          timesHost.querySelectorAll('.available-time').forEach(item=>item.classList.remove('selected'));
          button.classList.add('selected'); bookingState.time=value; bookingState.timeLabel=label;
        });
        timesHost.append(button);
      });
      if (!timesHost.children.length) throw new Error('availability_unavailable');
    } catch {
      if (requestNumber !== availabilityRequest) return;
      timesHost.innerHTML = '<p class="booking-api-note">سامانه‌ی نوبت‌های آزاد هنوز به سایت وصل نشده است؛ بنابراین هیچ ساعتی به‌عنوان آزاد نمایش داده نمی‌شود.</p>';
    }
  }

  function goToStep(step) {
    bookingState.step=step;
    panels.forEach(panel => { const active=Number(panel.dataset.step)===step; panel.hidden=!active; panel.classList.toggle('active',active); });
    indicators.forEach(item => { const number=Number(item.dataset.stepIndicator); item.classList.toggle('active',number===step); item.classList.toggle('done',number<step); });
    if (step===3 && bookingState.service && bookingState.date && !timesHost.querySelector('.available-time')) loadAvailableTimes();
    if (step===5 && summary) summary.textContent = `خدمت: ${bookingState.serviceName}
تاریخ: ${bookingState.date ? prettyJalali(new Date(`${bookingState.date}T12:00:00`)) : '—'}
ساعت: ${bookingState.timeLabel || '—'}
مدت: ۶۰ دقیقه`;
  }

  serviceButtons.forEach(button => button.addEventListener('click', () => {
    serviceButtons.forEach(item=>item.classList.remove('selected'));
    button.classList.add('selected');
    bookingState.service=button.dataset.service;
    bookingState.serviceName=button.dataset.serviceName;
  }));
  const requestedService = new URLSearchParams(window.location.search).get('service');
  const matchingService = serviceButtons.find(button=>button.dataset.service===requestedService);
  matchingService?.click();
  document.querySelector('[data-calendar-prev]')?.addEventListener('click',()=>{ monthAnchor=dateAt(monthStart(monthAnchor),-15); renderCalendar(); });
  document.querySelector('[data-calendar-next]')?.addEventListener('click',()=>{ monthAnchor=dateAt(monthStart(monthAnchor),45); renderCalendar(); });
  document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>{
    const step=bookingState.step;
    if(step===1 && !bookingState.service){ alert('لطفاً ابتدا خدمت موردنظرت را انتخاب کن.'); return; }
    if(step===2 && !bookingState.date){ alert('لطفاً تاریخ را از تقویم انتخاب کن.'); return; }
    if(step===3 && !bookingState.time){ alert('برای ادامه باید یک ساعت آزاد از سامانه انتخاب شود.'); return; }
    if(step===4){ const fields=bookingWizard.querySelectorAll('[data-step="4"] input'); for(const field of fields){if(!field.reportValidity()) return;} }
    goToStep(Math.min(5,step+1));
  }));
  document.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>goToStep(Math.max(1,bookingState.step-1))));
  bookingWizard.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!bookingState.service||!bookingState.date||!bookingState.time){ if(status) status.textContent='اطلاعات رزرو کامل نیست؛ نوبتی ثبت نشد.'; return; }
    const formData=new FormData(bookingWizard);
    if(status) status.textContent='در حال اتصال امن به درگاه پرداخت…';
    try{
      const response=await fetch('/api/booking/start-payment',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({service:bookingState.service,date:bookingState.date,time:bookingState.time,name:formData.get('name'),phone:formData.get('phone'),depositToman:200000,durationMinutes:60})});
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data.paymentUrl) throw new Error('payment_not_configured');
      window.location.assign(data.paymentUrl);
    }catch{
      if(status) status.textContent='درگاه پرداخت و سامانه‌ی ثبت نوبت هنوز متصل نیستند؛ هیچ پرداخت یا رزروی انجام نشد. برای هماهنگی با امیلی در اینستاگرام پیام بده.';
    }
  });
  renderCalendar();
  goToStep(1);
}
