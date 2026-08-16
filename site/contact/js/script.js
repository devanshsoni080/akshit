document.addEventListener("DOMContentLoaded",()=>{
const form=document.getElementById("contactForm"),success=document.getElementById("success");
form.addEventListener("submit",e=>{
e.preventDefault();
let valid=true;
const fields=[
[document.getElementById("name"),v=>v.length>2,"Please enter your name."],
[document.getElementById("mobile"),v=>/^[6-9]\d{9}$/.test(v),"Enter a valid 10-digit mobile number."],
[document.getElementById("email"),v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),"Enter a valid email address."],
[document.getElementById("subject"),v=>!!v,"Please select a subject."],
[document.getElementById("message"),v=>v.length>8,"Please enter your message."]
];
fields.forEach(([el,check,msg])=>{
const err=el.closest(".col-md-6,.col-12").querySelector(".error");
if(!check(el.value.trim())){err.textContent=msg;el.classList.add("invalid");valid=false}else{err.textContent="";el.classList.remove("invalid")}
});
if(!document.getElementById("agree").checked){valid=false;alert("Please accept the contact permission.");}
if(valid){success.classList.remove("d-none");form.reset();setTimeout(()=>success.classList.add("d-none"),6000)}
});
document.getElementById("mobile").addEventListener("input",e=>e.target.value=e.target.value.replace(/\D/g,""));
});