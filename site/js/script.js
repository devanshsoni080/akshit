document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#mainNav .nav-link");
    const nav = document.getElementById("mainNav");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });
            this.classList.add("active");

            if (window.innerWidth < 992) {
                const collapse = bootstrap.Collapse.getInstance(nav);
                if (collapse) collapse.hide();
            }
        });
    });
});
