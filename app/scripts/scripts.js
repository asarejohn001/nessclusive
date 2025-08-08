// scripts.js
// Wait for DOM ready (works even if you use defer)
document.addEventListener('DOMContentLoaded', function () {

  // ========== Carousel controls ==========
  (function(){
    const inner = document.querySelector('#carousel');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    function scrollByCard(dir=1){
      if(!inner) return;
      const card = inner.querySelector('.product');
      if(!card) return;
      // Read gap safely (might return empty in some browsers)
      const style = window.getComputedStyle(inner);
      const gap = parseInt(style.gap || style.getPropertyValue('gap')) || 16;
      const scrollAmount = card.offsetWidth + gap;
      inner.scrollBy({left: scrollAmount * dir, behavior:'smooth'});
    }

    if(prev) prev.addEventListener('click', ()=> scrollByCard(-1));
    if(next) next.addEventListener('click', ()=> scrollByCard(1));
  })();


  // ========== Newsletter form (demo) ==========
  (function(){
    const form = document.getElementById('newsletter');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const email = (this.email && this.email.value || '').trim();
      if(!email || email.indexOf('@') === -1){
        alert('Please enter a valid email.');
        return;
      }
      // Demo: show a thanks message
      const btn = this.querySelector('button');
      if(btn) btn.textContent = 'Subscribed ✓';
      setTimeout(()=> this.reset(), 1600);
    });
  })();


  // ========== Image-strip drag-to-scroll enhancement ==========
  (function(){
    const strip = document.querySelector('.image-strip');
    if(!strip) return;
    let down=false, startX=0, scrollLeft=0;
    strip.addEventListener('mousedown', (e)=>{
      down=true; strip.classList.add('dragging');
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      // prevent image drag
      e.preventDefault();
    });
    window.addEventListener('mouseup', ()=>{down=false; strip.classList.remove('dragging')});
    strip.addEventListener('mousemove', (e)=>{
      if(!down) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      const walk = (x - startX);
      strip.scrollLeft = scrollLeft - walk;
    });

    // touch support (natural on mobile but add just in case)
    let startTouchX = 0, startTouchScroll = 0;
    strip.addEventListener('touchstart', (e)=>{
      startTouchX = e.touches[0].pageX;
      startTouchScroll = strip.scrollLeft;
    }, {passive:true});
    strip.addEventListener('touchmove', (e)=>{
      const dx = e.touches[0].pageX - startTouchX;
      strip.scrollLeft = startTouchScroll - dx;
    }, {passive:true});
  })();

});
