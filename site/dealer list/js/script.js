document.addEventListener("DOMContentLoaded", function(){
    const search = document.getElementById("dealerSearch");
    const locationFilter = document.getElementById("locationFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const sortFilter = document.getElementById("sortFilter");
    const grid = document.getElementById("dealerGrid");
    const items = Array.from(document.querySelectorAll(".dealer-item"));
    const count = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");

    function applyFilters(){
        const q = search.value.toLowerCase().trim();
        const loc = locationFilter.value;
        const rating = parseFloat(ratingFilter.value || "0");

        let visible = items.filter(item => {
            const text = (item.dataset.name + " " + item.dataset.location).toLowerCase();
            return (!q || text.includes(q)) &&
                   (!loc || item.dataset.location === loc) &&
                   (!rating || parseFloat(item.dataset.rating) >= rating);
        });

        const sort = sortFilter.value;
        visible.sort((a,b) => {
            if(sort === "rating") return parseFloat(b.dataset.rating)-parseFloat(a.dataset.rating);
            if(sort === "experience") return parseFloat(b.dataset.experience)-parseFloat(a.dataset.experience);
            if(sort === "projects") return parseFloat(b.dataset.projects)-parseFloat(a.dataset.projects);
            return items.indexOf(a)-items.indexOf(b);
        });

        items.forEach(item => item.classList.add("d-none"));
        visible.forEach(item => {
            item.classList.remove("d-none");
            grid.appendChild(item);
        });

        count.textContent = visible.length;
        noResults.classList.toggle("d-none", visible.length !== 0);
    }

    [search, locationFilter, ratingFilter, sortFilter].forEach(el => el.addEventListener("input", applyFilters));
    [locationFilter, ratingFilter, sortFilter].forEach(el => el.addEventListener("change", applyFilters));

    document.querySelectorAll(".heart").forEach(btn => {
        btn.addEventListener("click", function(){
            const icon = this.querySelector("i");
            icon.classList.toggle("bi-heart");
            icon.classList.toggle("bi-heart-fill");
        });
    });

    document.getElementById("applyMobile").addEventListener("click", function(){
        locationFilter.value = document.getElementById("mobileLocation").value;
        ratingFilter.value = document.getElementById("mobileRating").value;
        applyFilters();
    });
});