(()=>{
 const c=window.WEDDING_CONFIG; if(!c){return;}
 const $=(id)=>document.getElementById(id);
 const set=(id,value)=>{const el=$(id);if(el)el.textContent=value;};
 const setLink=(id,url)=>{const el=$(id);if(el)el.href=url;};
 set('topDate',c.wedding.dateDisplay);set('firstName',c.couple.bride.split(' ')[0]);set('secondName',c.couple.groom.split(' ')[0]);
 set('heroDate',c.wedding.dateDisplay.toUpperCase());set('ceremonyName',c.wedding.ceremony);
 set('ceremonyDate',`${c.wedding.dateDisplay} · ${c.wedding.time}`);set('ceremonyNote',c.wedding.ceremonyNote);
 set('receptionName',c.wedding.reception);set('receptionLocation',c.wedding.location);
 set('mapPlace',c.wedding.reception);set('mapAddress',c.wedding.location);
 setLink('ceremonyMap',c.wedding.ceremonyMapsUrl);setLink('receptionMap',c.wedding.googleMapsUrl);setLink('mainMap',c.wedding.googleMapsUrl);
 set('attireTitle',c.attire.title);set('attireMessage',c.attire.message);
 set('deadline',`REPLY BY: ${c.rsvp.deadline.toUpperCase()}`);
 set('giftNote',c.notes.gifts);set('unpluggedNote',c.notes.unplugged);
 set('footerCouple',`${c.couple.bride.toUpperCase()} & ${c.couple.groom.toUpperCase()}`);
 set('footerNote',c.notes.advisory);
 $('timeline').replaceChildren(...c.eventTimeline.map(item=>{const div=document.createElement('div');div.className='timeline-item';const time=document.createElement('div');time.className='timeline-time';time.textContent=item.time;const event=document.createElement('div');event.className='timeline-event';event.textContent=item.title;div.append(time,event);return div;}));
 $('palette').replaceChildren(...c.attire.palette.map(p=>{const root=document.createElement('div');root.className='swatch';const dot=document.createElement('span');dot.className='swatch-dot';dot.style.backgroundColor=p.color;const label=document.createElement('span');label.className='swatch-name';label.textContent=p.name;root.append(dot,label);return root;}));
 const form=$('rsvpForm'), status=$('rsvpStatus'), submit=$('submitButton');
 const endpoint=(c.rsvp.appsScriptUrl||'').trim();
 if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(endpoint)){
   submit.disabled=true;status.textContent='The online RSVP form is not connected yet. The site owner needs to add their Google Apps Script URL in config.js before guests can submit responses.';
 }else{
   form.action=endpoint;
   form.addEventListener('submit',(ev)=>{
     if(!form.checkValidity()){return;}
     status.textContent='A new tab will open with the submission receipt. Your RSVP is confirmed only if that page says it was saved successfully.';
   });
 }
 const guestSelect=$('guests');
 [...guestSelect.options].forEach(o=>{if(Number(o.value)>1+Number(c.rsvp.maxCompanions||0))o.remove();});
 const decline=form.querySelector('input[value="Regretfully declines"]');
 const accept=form.querySelector('input[value="Joyfully accepts"]');
 decline.addEventListener('change',()=>{if(decline.checked)guestSelect.value='1';guestSelect.disabled=decline.checked;});
 accept.addEventListener('change',()=>{guestSelect.disabled=false;});
 form.addEventListener('submit',()=>{guestSelect.disabled=false;});
})();
