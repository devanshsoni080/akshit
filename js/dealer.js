const dealerSearch = document.getElementById("dealerSearch");
const dealerList = document.getElementById("dealerList");
const noResults = document.getElementById("noResults");
const moreDealers = document.getElementById("moreDealers");
const toast = document.getElementById("dealerToast");

dealerSearch.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    const items = document.querySelectorAll(".dealer-item");
    let visible = 0;

    items.forEach(function (item) {
        const name = item.dataset.name || "";
        const location = item.dataset.location || "";

        if (!query || name.includes(query) || location.includes(query)) {
            item.classList.remove("d-none");
            visible++;
        } else {
            item.classList.add("d-none");
        }
    });

    if (visible === 0) {
        noResults.classList.remove("d-none");
        noResults.style.display = "flex";
    } else {
        noResults.classList.add("d-none");
        noResults.style.display = "";
    }

    if (query) {
        moreDealers.classList.add("d-none");
    } else {
        moreDealers.classList.remove("d-none");
    }
});

moreDealers.addEventListener("click", function () {
    document.querySelectorAll(".extra-dealer").forEach(function (item) {
        item.classList.remove("d-none");
    });

    moreDealers.classList.toggle("open");

    if (moreDealers.classList.contains("open")) {
        moreDealers.innerHTML = 'Show Less Dealers <i class="bi bi-chevron-up"></i>';
    } else {
        document.querySelectorAll(".extra-dealer").forEach(function (item) {
            item.classList.add("d-none");
        });
        moreDealers.innerHTML = 'View More Dealers <i class="bi bi-chevron-down"></i>';
    }
});

document.addEventListener("click", function (event) {
    const button = event.target.closest(".select-btn");

    if (!button) return;

    const dealerName = button.dataset.dealer;

    document.querySelectorAll(".select-btn").forEach(function (btn) {
        btn.classList.remove("selected");
        btn.innerText = "Select";
    });

    button.classList.add("selected");
    button.innerText = "Selected";

    toast.querySelector("span").innerText =
        dealerName + " selected successfully.";

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
});
