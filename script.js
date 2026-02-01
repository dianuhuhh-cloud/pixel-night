document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PANEL MICRO DRIFT ---------- */
  document.querySelectorAll('.panel').forEach(p => {
    let dx = 0;
    let dy = 0;

    setInterval(() => {
      dx = Math.random() * 2 - 1;
      dy = Math.random() * 2 - 1;
      p.style.transform = `translate(${dx}px, ${dy}px)`;
    }, 400);
  });


  /* ---------- ENERGY BAR ---------- */
  const fill = document.querySelector('.battery-fill');

  if (!fill) {
    console.warn("battery-fill not found");
    return;
  }

  let level = 20;
  let dir = 1;

  setInterval(() => {
    level += dir * 4;

    if (level >= 100) dir = -1;
    if (level <= 12) dir = 1;

    fill.style.width = level + "%";
  }, 250);

});

/* ---------- SYSTEM TEXT ROTATION ---------- */
const messages = [
  "audio cue detected...",
  "power rerouting...",
  "signal unstable...",
  "unknown presence detected",
  "do not look away"
];

const systemText = document.querySelector(".system-text");
if (systemText) {
  setInterval(() => {
    systemText.textContent =
      messages[Math.floor(Math.random() * messages.length)];
  }, 2600);
}

/* ---------- MOUSE GLOW ---------- */
const glow = document.querySelector('.mouse-glow');
document.addEventListener('mousemove', e => {
  if (!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ---------- LOW POWER MODE ---------- */
setInterval(() => {
  const body = document.body;
  const battery = document.querySelector('.battery-fill');
  if (!battery) return;

  const width = parseInt(battery.style.width);
  if (width < 25) body.classList.add('low-power');
  else body.classList.remove('low-power');
}, 500);

/* ---------- RANDOM ALERTS ---------- */
const alerts = [
  '⚠ AUDIO ERROR',
  '⚠ CAMERA LOST',
  '⚠ POWER FLUX',
  '⚠ SIGNAL INTERRUPTED'
];

const popup = document.querySelector('.alert-popup');

setInterval(() => {
  if (!popup || Math.random() > 0.85) return;

  popup.textContent = alerts[Math.floor(Math.random() * alerts.length)];
  popup.style.opacity = 1;

  setTimeout(() => {
    popup.style.opacity = 0;
  }, 800);

}, 5000);

/* ---------- MICRO GLITCHES ---------- */
setInterval(() => {
  if (Math.random() > 0.92) {
    document.body.style.filter = 'brightness(0.7)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 120);
  }
}, 6000);

/* ---------- DOOR / LIGHT CONTROLS ---------- */
const buttons = document.querySelectorAll('.ctrl-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {

    /* DOOR */
    if (btn.textContent.includes('DOOR')) {
      document.body.classList.toggle('door-closed');
      btn.textContent = document.body.classList.contains('door-closed')
        ? 'DOOR [CLOSED]'
        : 'DOOR';
    }

    /* LIGHT */
    if (btn.textContent.includes('LIGHT')) {
      document.body.classList.add('light-flash');
      setTimeout(() => {
        document.body.classList.remove('light-flash');
      }, 400);
    }

  });
});

/* ---------- FAKE CURSOR MODES ---------- */
setInterval(() => {
  const body = document.body;

  // clear states
  body.classList.remove('cursor-hidden', 'cursor-blocky');

  if (Math.random() > 0.7) body.classList.add('cursor-hidden');
  if (Math.random() > 0.7) body.classList.add('cursor-blocky');

  setTimeout(() => {
    body.classList.remove('cursor-hidden', 'cursor-blocky');
  }, 600);

}, 5000);

/* CURSOR TRAIL */
document.addEventListener('mousemove', e => {
  if (Math.random() > 0.92) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    document.body.appendChild(dot);

    setTimeout(() => dot.remove(), 300);
  }
});

/* ---------- "REMEMBERS YOU" ---------- */
const ticker = document.querySelector('.system-text');

if (ticker) {
  if (localStorage.getItem('visited')) {
    ticker.textContent = 'welcome back';
  } else {
    ticker.textContent = 'welcome, new user';
    localStorage.setItem('visited', 'true');
  }
}

/* ---------- SHADOW BON ON LIGHT ---------- */
const shadowBon = document.querySelector('.shadow-bon');

document.querySelectorAll('.ctrl-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    if (btn.textContent.includes('LIGHT') && shadowBon) {

      // 50% chance so it's not predictable
      if (Math.random() > 0.5) {
        shadowBon.style.opacity = 1;

        setTimeout(() => {
          shadowBon.style.opacity = 0;
        }, 180); // blink-and-miss
      }

    }
  });
});

/* ---------- SHADOW BON IN CAM FEED ---------- */
const camBon = document.querySelector('.cam-bon');

document.querySelectorAll('.ctrl-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    if (
      btn.textContent.includes('LIGHT') &&
      camBon &&
      Math.random() > 0.6
    ) {
      camBon.style.opacity = '0.35';

      setTimeout(() => {
        camBon.style.opacity = '0';
      }, 220); // blink-and-you-miss-it
    }

  });


/* ==== FNAF MINIGAME WALK + TELEPORT JUMP ==== */

/* ===== CRYING CHILD – FNAF STYLE ===== */

const child = document.getElementById("crying-child");

/* ALL PANELS INCLUDING STATUS BAR */
const panels = [
  document.getElementById("panel-status"),
  ...document.querySelectorAll(".panel")
].filter(Boolean);

let currentPanel = 0;
let x = 0;
let y = 0;

const WALK_STEP = 4;        // bigger crunchy steps
const WALK_DELAY = 90;     // ms between steps
const FOOT_OFFSET = 12;    // drops him lower to touch panel top

let lastWalkTime = 0;

let jumping = false;

/* place child ON TOP of a panel (DOCUMENT POSITION) */
function placeOnPanel(index) {
  const p = panels[index];
  const r = p.getBoundingClientRect();

  currentPanel = index;

  x = Math.floor(r.left + window.scrollX + r.width / 2 - 48);
  y = Math.floor(r.top + window.scrollY - 96);

  child.style.left = x + "px";
  child.style.top  = y + "px";
}

/* start on STATUS BAR */
placeOnPanel(0);

/* keys */
const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  if (!jumping) {
    const panel = panels[currentPanel];
    const r = panel.getBoundingClientRect();

    const minX = Math.floor(r.left + window.scrollX);
    const maxX = Math.floor(r.right + window.scrollX - 96);

    let moving = false;

    const now = Date.now();

if (now - lastWalkTime > WALK_DELAY) {
  if (keys.ArrowLeft || keys.a) {
    x -= WALK_STEP;
    moving = true;
    lastWalkTime = now;

    // micro glitch snap
    x += Math.random() > 0.6 ? 2 : 0;
  }

  if (keys.ArrowRight || keys.d) {
    x += WALK_STEP;
    moving = true;
    lastWalkTime = now;

    x -= Math.random() > 0.6 ? 2 : 0;
  }
}

    /* HARD STOP at edges */
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;

    y = Math.floor(r.top + window.scrollY - 96 + FOOT_OFFSET);

    child.style.left = x + "px";
    child.style.top  = y + "px";

    child.classList.toggle("walk-glitch", moving);

    /* JUMP = GLITCH TELEPORT */
    if (keys[" "]) {
      jumping = true;
      child.classList.remove("walk-glitch");
      child.classList.add("jump-glitch");

      const next = (currentPanel + 1) % panels.length;

      // phase 1: vanish flicker
      setTimeout(() => {
        child.style.opacity = "0";
      }, 70);

      // phase 2: move
      setTimeout(() => {
        placeOnPanel(next);
      }, 120);

      // phase 3: reappear
      setTimeout(() => {
        child.style.opacity = "1";
        child.classList.remove("jump-glitch");
        jumping = false;
      }, 220);
    }
  }

  requestAnimationFrame(update);
}

update();

});
