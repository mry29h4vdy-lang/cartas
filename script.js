/* ======================================================
   CONTRASEÑA
   Cámbiala aquí si algún día quieren usar otra.
   ====================================================== */
  const SITE_PASSWORD = "20052007";

/* ======================================================
   CARTAS
   Cada carta es un sitio web que ya hiciste. Para agregar
   una carta nueva, copia un bloque { ... } y pégalo dentro
   del arreglo. No necesitas tocar nada más del código.

   date  -> como quieras que se vea la fecha (texto libre)
   title -> el título de la carta
   url   -> el link del sitio web de esa carta
   ====================================================== */
  const letters = [
    {
      date: "15 de diciembre",
      title: "Aniversario de 9 meses",
      url: "https://mry29h4vdy-lang.github.io/aniversario-leida-junior/"
    },
    {
      date: "Carta de amor",
      title: "Una carta de amor",
      url: "https://mry29h4vdy-lang.github.io/carta-de-amor/"
    },
    {
      date: "Te amo",
      title: "I love you",
      url: "https://mry29h4vdy-lang.github.io/i-love-you/"
    }
  ];

/* ====================== LÓGICA DEL CANDADO ====================== */
  const gate = document.getElementById('gate');
  const gateCard = document.getElementById('gate-card');
  const site = document.getElementById('site');
  const input = document.getElementById('password-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const gateError = document.getElementById('gate-error');

  function tryUnlock(){
    if(input.value === SITE_PASSWORD){
      gate.style.display = 'none';
      site.style.display = 'block';
      renderLetters();
    } else {
      gateError.textContent = 'Esa no es, mi amor. Intenta otra vez.';
      gateCard.classList.remove('gate-shake');
      void gateCard.offsetWidth;
      gateCard.classList.add('gate-shake');
      input.value = '';
    }
  }

  unlockBtn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', (e) => { if(e.key === 'Enter') tryUnlock(); });

/* ====================== RENDER DE CARTAS ====================== */
  const grid = document.getElementById('letters-grid');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('close-letter');

  function renderLetters(){
    grid.innerHTML = '';
    document.getElementById('letter-count').textContent =
      letters.length === 1 ? '1 carta guardada' : letters.length + ' cartas guardadas';

    letters.forEach((letter, i) => {
      const card = document.createElement('div');
      card.className = 'envelope';
      card.innerHTML = `
        <div class="envelope-seal">L&amp;J</div>
        <div class="envelope-label">${letter.date}</div>
        <h3>${letter.title}</h3>
        <div class="envelope-hint">toca para abrir</div>
      `;
      card.addEventListener('click', () => openLetter(i));
      grid.appendChild(card);
    });
  }

  function openLetter(i){
    const letter = letters[i];
    document.getElementById('modal-date').textContent = letter.date;
    document.getElementById('modal-title').textContent = letter.title;
    document.getElementById('letter-frame').src = letter.url;
    document.getElementById('modal-open-tab').href = letter.url;
    overlay.style.display = 'flex';
  }

  function closeLetter(){
    overlay.style.display = 'none';
    document.getElementById('letter-frame').src = '';
  }

  closeBtn.addEventListener('click', closeLetter);
  overlay.addEventListener('click', (e) => { if(e.target === overlay) closeLetter(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLetter(); });