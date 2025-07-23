// Theme & Modal Constants
const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';
const isVisible = 'is-visible';

const root = document.documentElement;
const defaultAnimation = "slideInOutTop";

// Portfolio Grid
const grid = document.getElementById("portfolioGrid");

// Portfolio Card Data
const portfolioCardData = [
    { category: "web", image: "./assets/images/portfolio-1.jpg", title: "Food Website", type: "Web Development", open: "web-1" },
    { category: "web", image: "./assets/images/portfolio-2.jpg", title: "Skate Website", type: "Web Development", open: "web-2" },
    { category: "web", image: "./assets/images/portfolio-3.jpg", title: "Eating Website", type: "Web Development", open: "web-3" },
    { category: "ui", image: "./assets/images/portfolio-4.jpg", title: "Cool Design", type: "UI Design", open: "ui-1" },
    { category: "app", image: "./assets/images/portfolio-5.jpg", title: "Game App", type: "App Development", open: "app-1" },
    { category: "app", image: "./assets/images/portfolio-6.jpg", title: "Gambling App", type: "App Development", open: "app-2" },
    { category: "app", image: "./assets/images/portfolio-7.jpg", title: "Money Website", type: "App Development", open: "app-3" },
    { category: "ui", image: "./assets/images/portfolio-8.jpg", title: "Fantastic Design", type: "UI Design", open: "ui-2" }
];

portfolioCardData.forEach(item => {
    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.setAttribute("data-item", item.category);
    card.setAttribute("data-open", item.open);
    card.innerHTML = `
    <div class="card-body">
      <img src="${item.image}" alt="portfolio icon">
      <div class="card-popup-box">
        <div>${item.type}</div>
        <h3>${item.title}</h3>
      </div>
    </div>
  `;
    grid.appendChild(card);
});

// Modal Data
const modalData = portfolioCardData.map(item => ({
    id: item.open,
    title: item.title,
    image: item.image,
    description: [
        `${item.title}`,
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "There are many variations of passages of Lorem Ipsum available."
    ]
}));

function createModal({ id, title, image, description }) {
    const modal = document.createElement("div");
    modal.id = id;
    modal.className = "modal";
    modal.setAttribute("data-animation", defaultAnimation);

    modal.innerHTML = `
    <div class="modal-dialog">
      <header class="modal-header">
        <h3>${title}</h3>
        <i class="fas fa-times" data-close></i>
      </header>
      <div class="modal-body">
        <div class="image-wrapper">
          <img src="${image}" alt="portfolio image"/>
        </div>
        <div class="text-wrapper">
          <p><strong>${title}</strong></p>
          ${description.map(text => `<p>${text}</p>`).join("")}
        </div>
      </div>
    </div>
  `;
    return modal;
}

modalData.forEach(modal => {
    document.body.appendChild(createModal(modal));
});

function bindModalEvents() {
    const openModal = document.querySelectorAll('[data-open]');
    const closeModal = document.querySelectorAll('[data-close]');

    openModal.forEach(element => {
        element.addEventListener('click', function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId)?.classList.add(isVisible);
        });
    });

    closeModal.forEach(element => {
        element.addEventListener('click', function () {
            this.closest('.modal')?.classList.remove(isVisible);
            this.closest('.full-site-modal')?.classList.remove(isVisible);
        });
    });
}

bindModalEvents();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') && e.target.classList.contains(isVisible)) {
        e.target.classList.remove(isVisible);
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.is-visible, .full-site-modal.is-visible').forEach(modal => modal.classList.remove(isVisible));
    }
});

// Theme Switcher
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    root.setAttribute(dataTheme, currentTheme);
    switcher.forEach(btn => btn.classList.remove(active));
    switcher[1].classList.add(active);
} else {
    root.setAttribute(dataTheme, light);
    switcher[0].classList.add(active);
}

toggleTheme.addEventListener('click', function () {
    const tab = this.closest('.theme-panel');
    tab.classList.toggle(open);
});

switcher.forEach(button => {
    button.addEventListener('click', function () {
        const selected = this.dataset.toggle;
        switcher.forEach(btn => btn.classList.remove(active));
        this.classList.add(active);
        root.setAttribute(dataTheme, selected);
        localStorage.setItem(theme, selected);
    });
});

// Search and Filter
const filterLinks = document.querySelectorAll('[data-filter]');
const searchBox = document.querySelector("#search");

searchBox.addEventListener('keyup', e => {
    const value = e.target.value.toLowerCase().trim();
    document.querySelectorAll('[data-item]').forEach(card => {
        card.style.display = card.dataset.item.includes(value) ? 'block' : 'none';
    });
});

filterLinks.forEach(link => {
    link.addEventListener('click', function () {
        document.querySelector('.filter-link.active')?.classList.remove(active);
        this.classList.add(active);
        const filter = this.dataset.filter;
        document.querySelectorAll('[data-item]').forEach(card => {
            card.style.display = filter === 'all' || card.dataset.item === filter ? 'block' : 'none';
        });
    });
});

// get number of elements displayed
// nodelist length

const elementsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elements-displayed');
const marqueeContent = document.querySelector('ul.marquee-content');

root.style.setProperty('--marquee-elements', marqueeContent.children.length);

for( let i = 0; i < elementsDisplayed; i++ ) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
