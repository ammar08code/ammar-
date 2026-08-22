/* =========================
SCROLL ANIMATION
========================= */

const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
(entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

},
{
    threshold: 0.15
}

);

sections.forEach((section) => {
observer.observe(section);
});

/* =========================
NAVBAR SCROLL EFFECT
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

if (window.scrollY > 50) {

    navbar.classList.add("scrolled");

} else {

    navbar.classList.remove("scrolled");

}

});

/* =========================
MOBILE MENU
========================= */

function toggleMenu() {

const menu = document.getElementById("nav-menu");

menu.classList.toggle("active");

}
