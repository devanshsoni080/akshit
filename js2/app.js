const form = document.getElementById("propertyForm");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const toast = document.getElementById("toastBox");

function showToast(message){
  toast.querySelector("span").textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2400);
}

function updateProgress(){
  const required = [...document.querySelectorAll(".required-field")];
  const filled = required.filter(el => {
    if(el.type === "radio") return false;
    return el.value.trim() !== "";
  }).length;

  const radioGroups = [...new Set([...document.querySelectorAll('input[required][type="radio"]')].map(r=>r.name))];
  const radioFilled = radioGroups.filter(name => document.querySelector(`input[name="${name}"]:checked`)).length;

  const total = required.length + radioGroups.length;
  const done = filled + radioFilled;
  const percent = total ? Math.round((done / total) * 100) : 0;

  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";
}

document.addEventListener("input", updateProgress);
document.addEventListener("change", updateProgress);
updateProgress();

document.querySelectorAll("[data-target]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const input = document.getElementById(btn.dataset.target);
    if(input) input.click();
  });
});

const photos = document.getElementById("photos");
const photoPreview = document.getElementById("photoPreview");

photos.addEventListener("change",()=>{
  photoPreview.innerHTML = "";
  [...photos.files].slice(0,12).forEach(file=>{
    if(!file.type.startsWith("image/")) return;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    photoPreview.appendChild(img);
  });
  updateProgress();
});

document.querySelectorAll('input[type="file"]:not(#photos)').forEach(input=>{
  input.addEventListener("change",()=>{
    const card = input.closest(".mini-upload,.doc-upload");
    if(card && input.files[0]){
      const btn = card.querySelector("button");
      if(btn) btn.textContent = "Selected";
      card.style.borderColor = "#2947e8";
    }
  });
});

document.querySelectorAll('input[name="listing_for"]').forEach(radio=>{
  radio.addEventListener("change",()=>{
    const label = document.getElementById("priceLabel");
    label.innerHTML = radio.value === "Sale"
      ? 'Sale Price / Monthly Rent <span>*</span>'
      : radio.value === "Rent"
      ? 'Monthly Rent <span>*</span>'
      : 'Lease Amount <span>*</span>';
    updateProgress();
  });
});

document.getElementById("mapBtn").addEventListener("click",()=>{
  const link = document.getElementById("mapLink").value.trim();
  if(!link){ showToast("Pehle Google Maps link paste karein."); return; }
  window.open(link,"_blank","noopener");
});

document.getElementById("draftBtn").addEventListener("click",()=>{
  const data = {};
  new FormData(form).forEach((value,key)=>{
    if(value instanceof File) return;
    data[key] = value;
  });
  localStorage.setItem("apkaApnaGharPropertyDraft", JSON.stringify(data));
  showToast("Property draft browser me save ho gaya.");
});

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const required = [...document.querySelectorAll(".required-field")];
  let valid = true;

  required.forEach(el=>{
    el.classList.remove("is-invalid");
    if(!el.value.trim()){
      el.classList.add("is-invalid");
      valid = false;
    }
  });

  const listing = document.querySelector('input[name="listing_for"]:checked');
  if(!listing){
    valid = false;
    showToast("Listing For me Sale, Rent ya Lease select karein.");
  }

  if(!photos.files.length){
    valid = false;
    document.getElementById("photoDrop").style.borderColor = "#e24a4a";
    showToast("Kam se kam 1 property photo upload karein.");
  }else{
    document.getElementById("photoDrop").style.borderColor = "#9da9c2";
  }

  if(!valid){
    const first = document.querySelector(".is-invalid");
    if(first) first.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }

  showToast("Property submitted successfully — prototype mode.");
  localStorage.removeItem("apkaApnaGharPropertyDraft");
});

const saved = localStorage.getItem("apkaApnaGharPropertyDraft");
if(saved){
  try{
    const data = JSON.parse(saved);
    Object.entries(data).forEach(([key,value])=>{
      const el = form.elements[key];
      if(!el) return;
      if(el instanceof RadioNodeList){
        const radio = [...el].find(r=>r.value===value);
        if(radio) radio.checked = true;
      }else{
        el.value = value;
      }
    });
    updateProgress();
  }catch(e){}
}
