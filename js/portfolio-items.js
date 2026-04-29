const images=[]; // populated as cards are built
const grid=document.getElementById('gallery-grid');
slots.forEach((lbl,i)=>{
  const card=document.createElement('div');
  card.className='g-card';
  card.innerHTML=`
    <div class="g-placeholder">
    
      <div class="lbl"><img src="${lbl.image}" alt="${lbl.title}"></div>
    </div>
    <div class="g-overlay">
      <div class="overlay-btn">View Image</div>
    </div>
`;
  card.addEventListener('click',()=>openLightbox(i));
  images.push({src:lbl.image,caption:lbl.title});
  grid.appendChild(card);
});


let current=0;

function openLightbox(i){
  current=i;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow='hidden';
}

function closeLightbox(){
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow='';
  resetZoom();
}

function shiftLightbox(dir){
  current=(current+dir+images.length)%images.length;
  updateLightbox();
  resetZoom();
}

function updateLightbox(){
  const img=document.getElementById('lb-img');
  const cap=document.getElementById('lb-caption');
  const d=images[current];
  img.src=d.src||'';
  img.style.display=d.src?'block':'none';
  cap.textContent=`${String(current+1).padStart(2,'0')} / ${String(images.length).padStart(2,'0')} — ${d.caption}`;
}

function toggleZoom(){
  const wrap=document.getElementById('lb-wrap');
  const img=document.getElementById('lb-img');
  const hint=document.getElementById('lb-hint');
  const zoomed=img.classList.toggle('zoomed');
  wrap.classList.toggle('zoomed',zoomed);
  hint.textContent=zoomed?'Click image to zoom out':'Click image to zoom in';
}

function resetZoom(){
  const img=document.getElementById('lb-img');
  const wrap=document.getElementById('lb-wrap');
  img.classList.remove('zoomed');
  wrap.classList.remove('zoomed');
  document.getElementById('lb-hint').textContent='Click image to zoom in';
}

// Close on backdrop click
document.getElementById('lightbox').addEventListener('click',function(e){
  if(e.target===this) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown',function(e){
  if(!document.getElementById('lightbox').classList.contains('active')) return;
  if(e.key==='ArrowRight') shiftLightbox(1);
  if(e.key==='ArrowLeft') shiftLightbox(-1);
  if(e.key==='Escape') closeLightbox();
});