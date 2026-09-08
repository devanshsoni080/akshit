const balanceKey = "colorGameDemoBalance";

function money(n){
  return "₹" + Number(n).toLocaleString("en-IN", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function renderLanding(){
  const balanceEl = document.getElementById("balance");
  if(balanceEl){
    const balance = Number(localStorage.getItem(balanceKey) || 1250);
    balanceEl.textContent = money(balance);
  }
}

function message(text){
  const toast = document.getElementById("demoToast");
  const toastText = document.getElementById("toastText");
  if(!toast || !toastText){ alert(text); return; }
  toastText.textContent = text;
  bootstrap.Toast.getOrCreateInstance(toast,{delay:2200}).show();
}

const addDemoMoneyBtn = document.getElementById("addDemoMoney");
if(addDemoMoneyBtn){
  addDemoMoneyBtn.addEventListener("click",()=>{
    const balance = Number(localStorage.getItem(balanceKey) || 1250) + 500;
    localStorage.setItem(balanceKey, balance);
    renderLanding();
    message("₹500 virtual balance added.");
  });
}

renderLanding();


// Mobile navigation: close the offcanvas automatically after any menu click.
// This also handles hash links and Login/Create Account links reliably.
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mobileNav");
  if (!nav || typeof bootstrap === "undefined") return;

  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(nav);

  nav.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href") || "";
      event.preventDefault();
      offcanvas.hide();

      // Navigate only after the close animation finishes.
      const go = () => {
        if (href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({behavior:"smooth", block:"start"});
          history.replaceState(null, "", href);
        } else if (href) {
          window.location.href = href;
        }
      };

      nav.addEventListener("hidden.bs.offcanvas", go, {once:true});
    });
  });
});
