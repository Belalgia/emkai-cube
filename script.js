    const cols = 9, rows = 9;
    const board = document.getElementById('board');

    // generate tiles
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const idx = r*cols + c + 1;
        const t = document.createElement('button');
        t.className = 'tile';
        t.setAttribute('data-row', r);
        t.setAttribute('data-col', c);
        t.setAttribute('aria-label', `Feld ${r+1}-${c+1}`);
        t.innerHTML = `<span class="top">${idx}</span><span class="side-right"></span><span class="side-left"></span>`;
        t.addEventListener('pointerdown', e=>{ t.classList.add('pressed'); });
        t.addEventListener('pointerup', e=>{ t.classList.remove('pressed'); });
        t.addEventListener('pointercancel', e=>{ t.classList.remove('pressed'); });
        board.appendChild(t);
      }
    }

    // Pointer drag to rotate board (works with mouse & touch)
    const viewport = document.getElementById('viewport');
    let dragging=false, lastX=0, lastY=0;
    const root = document.documentElement;

    viewport.addEventListener('pointerdown', (e)=>{
      dragging = true;
      lastX = e.clientX; lastY = e.clientY;
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e)=>{
      if(!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;

      // adjust rotation variables smoothly
      const curX = parseFloat(getComputedStyle(root).getPropertyValue('--rotateX')) || 55;
      const curY = parseFloat(getComputedStyle(root).getPropertyValue('--rotateY')) || -15;
      // invert dy to make drag feel natural
      const nextX = Math.min(85, Math.max(15, curX - dy*0.15));
      const nextY = Math.min(60, Math.max(-60, curY + dx*0.18));
      root.style.setProperty('--rotateX', nextX + 'deg');
      root.style.setProperty('--rotateY', nextY + 'deg');
    });

    viewport.addEventListener('pointerup', (e)=>{ dragging=false; try{ viewport.releasePointerCapture(e.pointerId);}catch(e){} });
    viewport.addEventListener('pointercancel', ()=>{ dragging=false; });

    // double tap to reset
    let lastTap = 0;
    viewport.addEventListener('pointerup', function(e){
      const now = Date.now();
      if(now - lastTap < 300){
        // reset
        root.style.setProperty('--rotateX', '55deg');
        root.style.setProperty('--rotateY', '-15deg');
      }
      lastTap = now;
    });

    // make grid responsive: adjust tile-size base on viewport width with JS fallback
    function recalc(){
      const vw = Math.min(window.innerWidth, 960);
      const base = Math.min(520, (vw - 40) );
      document.documentElement.style.setProperty('--base-tilesize', base + 'px');
    }
    window.addEventListener('resize', recalc);
    recalc();