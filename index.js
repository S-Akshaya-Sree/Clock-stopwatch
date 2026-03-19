function switchTab(tab, btn) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + tab).classList.add('active');
    btn.classList.add('active');
  }

  const timeSlots = [
    { range:[5,7],   cls:'dawn',      greeting:'Good dawn! 🌅' },
    { range:[7,12],  cls:'morning',   greeting:'Good morning! ☀️' },
    { range:[12,15], cls:'noon',      greeting:'Good afternoon! 🌤️' },
    { range:[15,18], cls:'afternoon', greeting:'Good afternoon! 🌇' },
    { range:[18,21], cls:'evening',   greeting:'Good evening! 🌆' },
    { range:[21,24], cls:'night',     greeting:'Good night! 🌙' },
    { range:[0,5],   cls:'night',     greeting:'Good night! 🌙' },
  ];

  let currentCls = '';
  function applyTimeOfDay(h) {
    const slot = timeSlots.find(s => h >= s.range[0] && h < s.range[1]);
    if (!slot || slot.cls === currentCls) return;
    currentCls = slot.cls;
    document.body.className = slot.cls;
    document.getElementById('greeting').textContent = slot.greeting;
  }

  function drawStars() {
    const canvas = document.getElementById('stars');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 130; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.75;
      const r = Math.random() * 1.5 + 0.3;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.6 + 0.4).toFixed(2)})`;
      ctx.fill();
    }
  }
  drawStars();
  window.addEventListener('resize', drawStars);

  const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function updateClock() {
    const now = new Date();
    const h24 = now.getHours();
    let h = h24 % 12 || 12;
    const meridiem = h24 >= 12 ? 'PM' : 'AM';
    const hh = String(h).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock-display').textContent = `${hh}:${mm}:${ss}`;
    document.getElementById('clock-meridiem').textContent = meridiem;
    document.getElementById('clock-date').textContent =
      `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    applyTimeOfDay(h24);
  }
  updateClock();
  setInterval(updateClock, 1000);

  let swTimer = null, swStart_ = 0, swElapsed = 0, swRunning = false;
  const swDisplay = document.getElementById('sw-display');

  function swStart() {
    if (!swRunning) {
      swStart_ = Date.now() - swElapsed;
      swTimer = setInterval(swUpdate, 10);
      swRunning = true;
    }
  }
  function swStop() {
    if (swRunning) {
      clearInterval(swTimer);
      swElapsed = Date.now() - swStart_;
      swRunning = false;
    }
  }
  function swReset() {
    clearInterval(swTimer);
    swTimer = null; swStart_ = 0; swElapsed = 0; swRunning = false;
    swDisplay.textContent = '00:00:00:00';
  }
  function swUpdate() {
    swElapsed = Date.now() - swStart_;
    const hrs = Math.floor(swElapsed / 3600000).toString().padStart(2,'0');
    const min = Math.floor(swElapsed / 60000 % 60).toString().padStart(2,'0');
    const sec = Math.floor(swElapsed / 1000 % 60).toString().padStart(2,'0');
    const ms  = Math.floor(swElapsed % 1000 / 10).toString().padStart(2,'0');
    swDisplay.textContent = `${hrs}:${min}:${sec}:${ms}`;
  }