const cols = 9, rows = 9;
const root = document.documentElement;
const board = document.getElementById('board');
const viewport = document.getElementById('viewport');

// Würfel generieren
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const t = document.createElement('button');
    t.className = 'tile';
    t.innerHTML = `
      <div class="face front"></div>
      <div class="face back"></div>
      <div class="face left"></div>
      <div class="face right"></div>
      <div class="face top"></div>
      <div class="face bottom"></div>
    `;
    t.addEventListener('click', () => t.classList.toggle('stretched'));
    board.appendChild(t);
  }
}

// Responsive Board
function fitBoard() {
  const vw = viewport.clientWidth - 24;
  const vh = viewport.clientHeight - 24;
  const gap = parseInt(getComputedStyle(root).getPropertyValue('--gap')) || 6;
  const maxW = (vw - (cols - 1) * gap) / cols;
  const maxH = (vh - (rows - 1) * gap) / rows;
  const tile = Math.min(maxW, maxH);
  root.style.setProperty('--tile-size', tile + 'px');
  board.style.width = `calc(var(--tile-size) * ${cols} + ${gap}px * (${cols}-1))`;
  board.style.height = `calc(var(--tile-size) * ${rows} + ${gap}px * (${rows}-1))`;
}
window.addEventListener('resize', fitBoard);
fitBoard();

// Kippsteuerung (X-Achse)
let dragging = false, lastY = 0;
viewport.addEventListener('pointerdown', e => {
  dragging = true;
  lastY = e.clientY;
  viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener('pointermove', e => {
  if (!dragging) return;
  const dy = e.clientY - lastY;
  lastY = e.clientY;
  const cur = parseFloat(getComputedStyle(root).getPropertyValue('--rotateX')) || 0;
  let next = cur - dy * 0.2;
  const max = parseFloat(getComputedStyle(root).getPropertyValue('--max-tilt')) || 60;
  const min = parseFloat(getComputedStyle(root).getPropertyValue('--min-tilt')) || 0;
  next = Math.max(min, Math.min(max, next));
  root.style.setProperty('--rotateX', next + 'deg');
  board.style.transform = `rotateX(${next}deg)`;
});
viewport.addEventListener('pointerup', e => { dragging = false; try { viewport.releasePointerCapture(e.pointerId); } catch (_) {} });
viewport.addEventListener('pointercancel', () => { dragging = false; });

// Doppeltipp Reset
let lastTap = 0;
viewport.addEventListener('pointerup', e => {
  const now = Date.now();
  if (now - lastTap < 300) {
    root.style.setProperty('--rotateX', '0deg');
    board.style.transform = 'rotateX(0deg)';
  }
  lastTap = now;
});
