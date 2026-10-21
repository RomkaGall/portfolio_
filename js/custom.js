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

    var dialog = document.getElementById("case-dialog");
    var caseKicker = document.getElementById("case-kicker");
    var caseTitle = document.getElementById("case-title");
    var caseMeta = document.getElementById("case-meta");
    var caseMetrics = document.getElementById("case-metrics");
    var casePoints = document.getElementById("case-points");
    var caseLink = document.getElementById("case-link");

    var cases = {
        evamats: {
            kicker: "Custom theme · configurator · search",
            title: "Evamats",
            meta: "Poland · EVA car mats · ongoing",
            points: [
                "The buyer picks car model, mat type, color, and edging, and sees the result before adding to cart.",
                "No app could handle the option logic, so the configurator lives in the theme.",
                "The same configurator runs on Carvion across six EU markets."
            ],
            href: "https://evamats.pl/"
        },
        carvion: {
            kicker: "Custom theme · configurator · search",
            title: "Carvion Auto",
            meta: "EU · EVA car mats · ongoing",
            points: [
                "New theme from a Figma design, with the configurator and search by car model.",
                "One store on Shopify Markets, a domain per country: .de, .cz, .it, .es, .fr, .lv."
            ],
            href: "https://carvionauto.cz/"
        },
        vector: {
            kicker: "From scratch · SEO",
            title: "Vector Ebike",
            meta: "Germany · e-bikes · ongoing",
            metrics: [
                { value: "50 → 1,050", label: "clicks / month" },
                { value: "1,000 → 35,000", label: "impressions / month" }
            ],
            points: [
                "Built the store from scratch and set the structure.",
                "JSON-LD, and a meta title and description on every product.",
                "E-bike articles I drafted. The client checked the facts.",
                "Google Search Console, Nov 2025 → Oct 2026."
            ],
            href: "https://vectorebike.com/"
        },
        udc: {
            kicker: "From scratch · search · page speed",
            title: "UDC Parts",
            meta: "USA · garden and small-engine parts · ongoing",
            metrics: [
                { value: "40 → 75–80", label: "PageSpeed, mobile" }
            ],
            points: [
                "Store from scratch, with search by part brand and model.",
                "SEO tasks from the client's specialist: JSON-LD, redirects, and meta templates.",
                "The font was slowing LCP, so I removed unused Cyrillic: 120 KB → 35 KB. Below-the-fold images are lazy-loaded; the hero loads immediately.",
                "Homepage CSS and JS are one bundle, product CSS and JS another, and a shared file loads on both.",
                "Moved B2B from the BSS app to Shopify B2B."
            ],
            href: "https://udcparts.com/"
        },
        alia: {
            kicker: "Migration · customizer · apps",
            title: "Alia Lingerie",
            meta: "Poland · lingerie · ongoing",
            points: [
                "WooCommerce to Shopify on a free theme. Moved orders, customers, and products.",
                "Product customizer built from scratch.",
                "A small app updates prices in bulk, in one click.",
                "A Telegram bot tracks new orders and callback requests, and changes internal order statuses."
            ],
            href: "https://alialingerie.pl/"
        },
        clixo: {
            kicker: "From scratch · Figma · team",
            title: "Clixo",
            meta: "USA · magnetic play system",
            points: [
                "Store from scratch from a Figma design.",
                "Worked with the project manager, the designer, and a second developer."
            ],
            href: "https://clixo.com/"
        },
        gloves: {
            kicker: "Redesign · Figma · subscriptions",
            title: "Gloves in a Bottle",
            meta: "United States · shielding lotion",
            points: [
                "Redesign of the live store from a Figma design.",
                "Subscriptions through an app."
            ],
            href: "https://www.glovesinabottle.com/"
        },
        lila: {
            kicker: "Free theme · custom design · subscriptions",
            title: "The Lila Code",
            meta: "USA · artist's site · ongoing",
            points: [
                "An artist's site on a free theme.",
                "Design from the client's references, plus subscriptions."
            ],
            href: "https://thelilacode.com/"
        }
    };

    function fillCase(data) {
        caseKicker.textContent = data.kicker;
        caseTitle.textContent = data.title;
        caseMeta.textContent = data.meta;
        caseLink.href = data.href;

        caseMetrics.replaceChildren();
        if (data.metrics && data.metrics.length) {
            data.metrics.forEach(function (metric) {
                var item = document.createElement("p");
                var value = document.createElement("b");
                var label = document.createElement("span");
                value.textContent = metric.value;
                label.textContent = metric.label;
                item.append(value, label);
                caseMetrics.appendChild(item);
            });
            caseMetrics.hidden = false;
        } else {
            caseMetrics.hidden = true;
        }

        casePoints.replaceChildren();
        data.points.forEach(function (point) {
            var item = document.createElement("li");
            item.textContent = point;
            casePoints.appendChild(item);
        });
    }

    function openCase(id) {
        var data = cases[id];
        if (!data || !dialog) return;
        fillCase(data);
        if (!dialog.open) {
            dialog.showModal();
        }
        document.body.classList.add("case-open");
    }

    document.querySelectorAll("[data-case]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            openCase(btn.getAttribute("data-case"));
        });
    });

    if (dialog) {
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        dialog.querySelectorAll("[data-case-close]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                dialog.close();
            });
        });

        dialog.addEventListener("close", function () {
            document.body.classList.remove("case-open");
        });

    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();
