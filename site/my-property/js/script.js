document.addEventListener("DOMContentLoaded",()=>{
const tabs=document.querySelectorAll(".tab"), cards=[...document.querySelectorAll(".property-card")], search=document.getElementById("search"), type=document.getElementById("typeFilter"), empty=document.getElementById("emptyState");
let status="all";
function filter(){
 const q=search.value.toLowerCase().trim(), t=type.value;
 let n=0;
 cards.forEach(c=>{
   const ok=(status==="all"||c.dataset.status===status)&&(!t||c.dataset.type===t)&&(!q||c.dataset.name.toLowerCase().includes(q));
   c.classList.toggle("d-none",!ok); if(ok)n++;
 });
 empty.classList.toggle("d-none",n!==0);
}
tabs.forEach(x=>x.onclick=()=>{tabs.forEach(t=>t.classList.remove("active"));x.classList.add("active");status=x.dataset.status;filter()});
search.oninput=filter;type.onchange=filter;
document.querySelectorAll(".favorite").forEach(b=>b.onclick=()=>{const i=b.querySelector("i");i.classList.toggle("bi-heart");i.classList.toggle("bi-heart-fill")});
});