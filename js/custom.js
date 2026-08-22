(function () {
    "use strict";

    var header = document.getElementById("site-header");
    var nav = document.getElementById("site-nav");
    var toggle = document.querySelector(".nav-toggle");
    var backTop = document.getElementById("back-top");
    var filterBtns = document.querySelectorAll(".filter-btn");
    var workItems = document.querySelectorAll(".work-item");
    var navLinks = document.querySelectorAll(".site-nav a");

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;

        if (header) {
            header.classList.toggle("is-scrolled", y > 40);
        }

        if (backTop) {
            backTop.classList.toggle("is-visible", y > 400);
        }
    }

    function closeNav() {
        if (!nav || !toggle) return;
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
    }

    function openNav() {
        if (!nav || !toggle) return;
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        document.body.style.overflow = "hidden";
    }

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            if (nav.classList.contains("is-open")) {
                closeNav();
            } else {
                openNav();
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeNav);
    });

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var filter = btn.getAttribute("data-filter");

            filterBtns.forEach(function (b) {
                b.classList.remove("is-active");
            });
            btn.classList.add("is-active");

            workItems.forEach(function (item) {
                var cats = (item.getAttribute("data-category") || "").split(/\s+/);
                var show = filter === "*" || cats.indexOf(filter) !== -1;
                item.classList.toggle("is-hidden", !show);
            });
        });
    });

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-inview");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );

        document.querySelectorAll(".reveal").forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("is-inview");
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();
