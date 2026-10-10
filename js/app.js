const services=[
 {name:'Family Medicine',desc:'Everyday healthcare, preventive consultations and long-term health management.',image:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=86'},
 {name:"Women's Health",desc:'Thoughtful care across reproductive, hormonal and preventive health needs.',image:'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=86'},
 {name:'Child & Adolescent Care',desc:'Support for children and teenagers through every stage of development.',image:'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=86'},
 {name:'Dermatology',desc:'Evidence-based care for skin, hair and common dermatological conditions.',image:'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=86'},
 {name:'Diagnostics',desc:'Convenient health screening and diagnostic services.',image:'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=86'},
 {name:'Preventive Health',desc:'Personalised health assessments designed to identify risks early.',image:'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=86'},
 {name:'Physiotherapy',desc:'Movement, rehabilitation and recovery programmes tailored to individual needs.',image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=86'},
 {name:'Mental Wellness',desc:'Confidential consultations supporting emotional and psychological wellbeing.',image:'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1400&q=86'}
];
const doctors=[
 {name:'Dr. Ananya Mehra',cred:'MBBS, MD — Internal Medicine',exp:'12 years experience',spec:'Preventive & Family Medicine',image:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=86'},
 {name:'Dr. Rohan Kapoor',cred:'MBBS, DNB — Dermatology',exp:'10 years experience',spec:'Dermatology & Aesthetic Medicine',image:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=86'},
 {name:'Dr. Kavya Sharma',cred:'MBBS, MS — Obstetrics & Gynaecology',exp:'14 years experience',spec:"Women's Health",image:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1000&q=86'},
 {name:'Dr. Arjun Malhotra',cred:'MBBS, MD — Paediatrics',exp:'11 years experience',spec:'Child & Adolescent Care',image:'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=1000&q=86'},
 {name:'Dr. Neha Bansal',cred:'MPT — Physiotherapy',exp:'9 years experience',spec:'Sports & Orthopaedic Rehabilitation',image:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=86'}
];
const departments=services.map(s=>s.name);
const serviceList=document.querySelector('#serviceList');
function renderServices(){if(!serviceList)return;serviceList.innerHTML=services.map((s,i)=>`<button class="service-item ${i===0?'active':''}" data-service="${i}"><span class="num">0${i+1}</span><h3>${s.name}</h3><span class="arrow">↗</span></button>`).join(''); serviceList.querySelectorAll('.service-item').forEach(el=>el.addEventListener('click',()=>selectService(+el.dataset.service)));selectService(0)}
function selectService(i){const s=services[i];serviceList.querySelectorAll('.service-item').forEach((el,n)=>el.classList.toggle('active',n===i));document.querySelector('#serviceImage').src=s.image;document.querySelector('#serviceImage').alt=s.name;document.querySelector('#serviceNumber').textContent=`0${i+1}`;document.querySelector('#serviceLabel').textContent='Selected care';document.querySelector('#serviceTitle').textContent=s.name;document.querySelector('#serviceDescription').textContent=s.desc}
function renderDoctors(){const grid=document.querySelector('#doctorGrid');if(!grid)return;grid.innerHTML=doctors.map((d,i)=>`<article class="doctor-card reveal"><div class="doctor-photo"><img src="${d.image}" alt="Portrait of ${d.name}"></div><h3>${d.name}</h3><p>${d.cred}</p><p>${d.exp}</p><p class="speciality">${d.spec}</p></article>`).join('')}
renderServices();renderDoctors();
const header=document.querySelector('#siteHeader');
if(header){const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>40);window.addEventListener('scroll',onScroll,{passive:true});onScroll();}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menu=document.querySelector('.menu-toggle'), mobile=document.querySelector('#mobileNav');
if(menu&&mobile){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));mobile.hidden=open;});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false')}));}
const backdrop=document.querySelector('#bookingBackdrop'),drawer=document.querySelector('#bookingDrawer');
function openBooking(){backdrop.hidden=false;drawer.setAttribute('aria-hidden','false');document.body.classList.add('locked');requestAnimationFrame(()=>{backdrop.classList.add('open');drawer.classList.add('open')});document.querySelector('#bookingDrawer .close-btn')?.focus()}
function closeBooking(){drawer.classList.remove('open');backdrop.classList.remove('open');document.body.classList.remove('locked');setTimeout(()=>backdrop.hidden=true,350)}
if(backdrop&&drawer){document.querySelectorAll('[data-open-booking]').forEach(b=>b.addEventListener('click',openBooking));document.querySelectorAll('[data-close-booking]').forEach(b=>b.addEventListener('click',closeBooking));backdrop.addEventListener('click',closeBooking);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))closeBooking()});}

/* Site-wide DPDP consent wall — shown once per browser (via localStorage) on
   first visit, before anything else is reachable. Deliberately has no close
   button, no backdrop-click-to-dismiss and no Escape handler: the only way
   past it is to tick the box and press Agree & Continue. Returning visitors
   who already agreed on this device/browser aren't shown it again — this is
   a per-browser record, not a verifiable, centrally-logged consent. */
const consentWall=document.querySelector('#consentWall');
if(consentWall){
  const CONSENT_KEY='aurelia-dpdp-consent-v1';
  let alreadyAgreed=false;
  try{alreadyAgreed=localStorage.getItem(CONSENT_KEY)==='1';}catch(err){/* private browsing or blocked storage — fall back to asking every visit */}
  if(alreadyAgreed){
    consentWall.remove();
  }else{
    document.body.classList.add('locked');
    const check=document.querySelector('#consentWallCheck'),accept=document.querySelector('#consentWallAccept');
    check.addEventListener('change',()=>{accept.disabled=!check.checked});
    accept.addEventListener('click',()=>{
      if(!check.checked)return;
      try{localStorage.setItem(CONSENT_KEY,'1')}catch(err){/* can't persist — visitor will see the wall again next visit, which is the safe default */}
      consentWall.classList.add('dismissed');
      document.body.classList.remove('locked');
      document.removeEventListener('keydown',trapTab);
      setTimeout(()=>consentWall.remove(),450);
    });

    /* keep keyboard focus inside the card too — a Tab/Shift+Tab that would
       leave the card wraps back around to its own focusable elements, so
       the rest of the page isn't reachable while the wall is up */
    const focusables=Array.from(consentWall.querySelectorAll('a, input, button'));
    function trapTab(e){
      if(e.key!=='Tab'||focusables.length===0)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
    document.addEventListener('keydown',trapTab);
    check.focus();
  }
}

const quotePrevBtn=document.querySelector('#quotePrev'),quoteNextBtn=document.querySelector('#quoteNext');
if(quotePrevBtn&&quoteNextBtn){const quotes=[['“From booking to consultation, everything felt incredibly organised and personal. It didn\'t feel like visiting a typical clinic.”','— Rhea S., Gurugram'],['“I appreciated how clearly the doctor explained everything. The entire experience felt calm and professional.”','— Arjun M., Gurugram'],['“The clinic itself is beautiful, but more importantly, the care was excellent.”','— Mehak T., Gurugram']];let qi=0;function setQuote(i){qi=(i+quotes.length)%quotes.length;document.querySelector('#quoteText').textContent=quotes[qi][0];document.querySelector('#quoteAuthor').textContent=quotes[qi][1];document.querySelector('#quoteCount').textContent=`0${qi+1} / 03`}quotePrevBtn.onclick=()=>setQuote(qi-1);quoteNextBtn.onclick=()=>setQuote(qi+1);}


/* Custom appointment form -> Google Apps Script -> Google Sheets.
   Replace the placeholder with the deployed Apps Script Web App URL ending in /exec. */
const APPOINTMENT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxs43T8OwwxCDs0DyRNsMLfjjUJgut5OLW1NIeltygNvnreCCBBiWSyK5GkcOMEcQ8eHA/exec';
const bookingForm = document.querySelector('#bookingForm');
if (bookingForm) {
  const departmentSelect = bookingForm.querySelector('#departmentSelect');
  const doctorSelect = bookingForm.querySelector('#doctorSelect');
  const dateInput = bookingForm.querySelector('#preferredDate');
  const statusEl = bookingForm.querySelector('#bookingStatus');
  const submitBtn = bookingForm.querySelector('#bookingSubmit');
  const bookingWrap = document.querySelector('#bookingFormWrap');
  const successPanel = document.querySelector('#bookingSuccess');

  // Prevent selecting a date in the past, using the visitor's local date.
  if (dateInput) {
    const now = new Date();
    dateInput.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  }

  if (departmentSelect) {
    services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.name;
      option.textContent = service.name;
      departmentSelect.appendChild(option);
    });
  }

  const doctorByDepartment = {
    'Family Medicine': ['Dr. Ananya Mehra'],
    'Preventive Health': ['Dr. Ananya Mehra'],
    "Women's Health": ['Dr. Kavya Sharma'],
    'Child & Adolescent Care': ['Dr. Arjun Malhotra'],
    'Dermatology': ['Dr. Rohan Kapoor'],
    'Physiotherapy': ['Dr. Neha Bansal']
  };
  function updateDoctors() {
    if (!doctorSelect) return;
    const selected = departmentSelect?.value || '';
    const names = doctorByDepartment[selected] || doctors.map(d => d.name);
    doctorSelect.replaceChildren();
    const any = document.createElement('option');
    any.value = 'Any available doctor';
    any.textContent = 'Any available doctor';
    doctorSelect.appendChild(any);
    names.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      doctorSelect.appendChild(option);
    });
  }
  departmentSelect?.addEventListener('change', updateDoctors);
  updateDoctors();

  bookingForm.addEventListener('submit', async event => {
    event.preventDefault();
    statusEl.hidden = true;
    statusEl.classList.remove('error');

    if (APPOINTMENT_ENDPOINT.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT')) {
      statusEl.textContent = 'The form design is restored, but the Google Sheets connection is not configured yet. Follow SETUP-GOOGLE-SHEETS.txt and add your deployed Apps Script URL in js/app.js.';
      statusEl.classList.add('error');
      statusEl.hidden = false;
      return;
    }

    const formData = new FormData(bookingForm);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      department: String(formData.get('department') || ''),
      doctor: String(formData.get('doctor') || ''),
      date: String(formData.get('date') || ''),
      time: String(formData.get('time') || ''),
      message: String(formData.get('message') || '').trim(),
      consent: formData.get('consent') === 'on',
      page: window.location.href
    };
    if (!payload.consent) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending request…';
    try {
      // Apps Script is cross-origin; no-cors sends the request but intentionally
      // does not expose the response body. Verify the first test in the Sheet.
      await fetch(APPOINTMENT_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify(payload)
      });
      bookingForm.reset();
      updateDoctors();
      if (bookingWrap) bookingWrap.hidden = true;
      if (successPanel) successPanel.hidden = false;
    } catch (error) {
      statusEl.textContent = 'We could not send your request. Please check your internet connection and try again, or contact the clinic directly.';
      statusEl.classList.add('error');
      statusEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Request Appointment <span>↗</span>';
    }
  });
}
