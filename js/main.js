/*
  JavaScript for Book Detail SPA
  - Tabs
  - Rating (UC09)
  - Comments (UC10)
  - Feedback form in footer (UC11)
  All data is in-memory and non-persistent (no backend).
*/

// Sample in-memory data
const sampleRatings = [5,5,5,4,5];
const sampleComments = [
  {name:'Nguyễn Văn A', text:'Sách rất hay.'},
  {name:'Trần Thị B', text:'Nhân vật có chiều sâu, mình thích.'}
];

// Utility helpers
const el = q => document.querySelector(q);
const els = q => Array.from(document.querySelectorAll(q));
function calcAverage(arr){
  if(!arr.length) return 0;
  const s = arr.reduce((a,b)=>a+b,0);
  return Math.round((s/arr.length)*10)/10;
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}

// Render functions
function renderComments(){
  const list = el('#commentList');
  list.innerHTML = '';
  sampleComments.forEach(c=>{
    const node = document.createElement('div');
    node.className = 'comment';
    node.innerHTML = `<div class="who">${escapeHtml(c.name || 'Khách')}</div><div class="text">${escapeHtml(c.text)}</div>`;
    list.appendChild(node);
  });
  // update comment count in tab
  const commentTab = els('.tab').find(b => b.getAttribute('data-target') === 'tab-comments');
  if(commentTab){
    const countEl = commentTab.querySelector('.tab-count');
    if(countEl) countEl.innerText = `(${sampleComments.length})`;
  }
}
function renderRatingSummary(){
  const avg = calcAverage(sampleRatings);
  el('#avgScore').innerText = avg.toFixed(1);
  el('#avgText').innerText = avg.toFixed(1);
  el('#numRatings').innerText = sampleRatings.length;
}

// Render review histogram card (counts for each star)
function renderReviewCard(){
  const total = sampleRatings.length || 0;
  // counts for 5..1
  const counts = [5,4,3,2,1].map(st=> sampleRatings.filter(r=> r===st).length);
  // update big score and total count
  const avg = calcAverage(sampleRatings);
  if(el('#bigScore')) el('#bigScore').innerText = avg.toFixed(1);
  if(el('#totalCount')) el('#totalCount').innerHTML = `${total}<br><span style="font-size:12px;color:var(--muted)">đánh giá</span>`;

  const hist = el('#histogram');
  if(!hist) return;
  hist.innerHTML = '';
  [5,4,3,2,1].forEach((star, idx)=>{
    const count = counts[idx];
    const pct = total ? Math.round((count/total)*100) : 0;
    const row = document.createElement('div');
    row.className = 'hist-row';
    row.innerHTML = `
      <div class="hist-stars">${'★'.repeat(star)}</div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      <div class="bar-percent">${pct}%</div>
    `;
    hist.appendChild(row);
  });
    // update reviews count in tab
    const reviewsTab = els('.tab').find(b => b.getAttribute('data-target') === 'tab-reviews');
    if(reviewsTab){
      const c = reviewsTab.querySelector('#reviewsCount') || reviewsTab.querySelector('.tab-count');
      if(c) c.innerText = `(${total})`;
    }
}

// Tab activation helper
function activateTabButton(btn){
  if(!btn) return;
  const target = btn.getAttribute('data-target');
  // deactivate all
  els('.tab').forEach(t=>{t.classList.remove('active'); t.setAttribute('aria-selected','false')});
  els('.tab-content').forEach(tc=>{tc.classList.remove('active'); tc.setAttribute('aria-hidden','true')});
  // activate requested
  btn.classList.add('active');
  btn.setAttribute('aria-selected','true');
  const panel = el('#'+target);
  if(panel){ panel.classList.add('active'); panel.setAttribute('aria-hidden','false') }
}

// Wire tab buttons
els('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=> activateTabButton(btn));
});

// Rating (UC09)
let currentRating = 0;
const starEls = els('.star');
starEls.forEach((s, idx)=>{
  s.addEventListener('click', ()=>{
    currentRating = Number(s.dataset.value);
    starEls.forEach((st,i)=>{st.classList.toggle('selected', i < currentRating);st.setAttribute('aria-checked', i < currentRating ? 'true' : 'false')});
    el('#ratingValue').innerText = currentRating;
  });
  s.addEventListener('keydown', (ev)=>{if(ev.key==='Enter' || ev.key===' '){ev.preventDefault();s.click();}});
});

el('#sendRating').addEventListener('click', ()=>{
  if(currentRating < 1){alert('Vui lòng chọn từ 1 đến 5 sao trước khi gửi.');return}
  sampleRatings.push(currentRating);
  renderRatingSummary();
  renderReviewCard(); // keep histogram and counts in sync
  alert('Cảm ơn! Đánh giá của bạn đã được ghi nhận (mô phỏng).');
  currentRating = 0; el('#ratingValue').innerText = 0; starEls.forEach(st=>{st.classList.remove('selected');st.setAttribute('aria-checked','false')});
});

// Comments (UC10)
el('#postComment').addEventListener('click', ()=>{
  const text = el('#commentText').value.trim();
  const name = el('#commentName').value.trim() || 'Khách';
  if(!text){alert('Vui lòng nhập bình luận trước khi đăng.');return}
  sampleComments.unshift({name, text});
  renderComments();
  el('#commentText').value = '';
  el('#commentName').value = '';
  el('#commentText').focus();
});

// Feedback (UC11)
el('#sendFeedback').addEventListener('click', ()=>{
  const name = el('#fbName').value.trim();
  const email = el('#fbEmail').value.trim();
  const content = el('#fbContent').value.trim();
  if(!name || !email || !content){el('#fbMessage').innerText = 'Vui lòng điền đầy đủ các trường.';el('#fbMessage').style.color = '#ffbb99';return}
  el('#fbMessage').innerText = 'Đã gửi — cảm ơn phản hồi của bạn!';el('#fbMessage').style.color = 'var(--accent)';
  setTimeout(()=>{el('#fbName').value='';el('#fbEmail').value='';el('#fbContent').value='';}, 600);
});

// Initialize on load
document.addEventListener('DOMContentLoaded', ()=>{
  renderComments();
  renderRatingSummary();
  renderReviewCard();
  // ensure aria-selected matches active tab in DOM
  const activeBtn = els('.tab').find(b => b.classList.contains('active')) || els('.tab')[0];
  if(activeBtn) activateTabButton(activeBtn);
  // wire write-review button to activate reviews tab and focus stars
  const wr = el('#writeReviewBtn');
  if(wr){
    wr.addEventListener('click', ()=>{
      const reviewsTabBtn = els('.tab').find(b=>b.getAttribute('data-target')==='tab-reviews');
      if(reviewsTabBtn) activateTabButton(reviewsTabBtn);
      const starsEl = el('#stars');
      if(starsEl){ starsEl.scrollIntoView({behavior:'smooth',block:'center'}); const firstStar = starsEl.querySelector('.star'); if(firstStar) firstStar.focus(); }
    });
  }
});
