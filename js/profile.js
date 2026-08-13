const tabs = document.querySelectorAll(".profile-tab");
const tabNames = ["overview", "projects", "current", "reviews", "about", "contact"];

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const name = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        tabNames.forEach(n => {
            const el = document.getElementById(n + "Tab");
            if (el) el.style.display = "none";
        });

        const overview = document.getElementById("overviewTab");

        if (name === "overview") {
            overview.style.display = "block";
        } else {
            overview.style.display = "none";
            const selected = document.getElementById(name + "Tab");
            if (selected) selected.style.display = "block";
        }
    });
});

document.querySelectorAll(".heart").forEach(btn => {
    btn.addEventListener("click", () => {
        const icon = btn.querySelector("i");
        icon.classList.toggle("bi-heart");
        icon.classList.toggle("bi-heart-fill");
    });
});

const toast = document.getElementById("profileToast");

function showToast(message) {
    toast.querySelector("span").textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll("[data-contact]").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.dataset.contact;

        if (type === "call") {
            showToast("Call request ready for Sharma Property Hub.");
        } else if (type === "whatsapp") {
            showToast("WhatsApp chat opened in prototype.");
        } else {
            showToast("Enquiry form opened in prototype.");
        }
    });
});

document.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
        showToast(
            btn.dataset.action === "past"
                ? "All past projects opened in prototype."
                : "All current properties opened in prototype."
        );
    });
});
