// script.js - Loads online images into the gallery

const images = [
    {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        caption: 'Mountain Lake View',
        section: 'Nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        caption: 'Desert Dunes',
        section: 'Desert & Beach'
    },
    {
        url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        caption: 'City Skyline at Night',
        section: 'Urban'
    },
    {
        url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
        caption: 'Forest Path',
        section: 'Nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
        caption: 'Snowy Mountains',
        section: 'Nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        caption: 'Golden Sand Beach',
        section: 'Desert & Beach'
    },
    {
        url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
        caption: 'Misty Forest Morning',
        section: 'Nature'
    },
    {
        url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        caption: 'Urban Reflections',
        section: 'Urban'
    }
];

function getSections(images) {
    const sections = {};
    images.forEach(img => {
        if (!sections[img.section]) sections[img.section] = [];
        sections[img.section].push(img);
    });
    return sections;
}

function loadGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    const sections = getSections(images);
    Object.keys(sections).forEach(sectionName => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'gallery-section';
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = sectionName;
        sectionDiv.appendChild(sectionTitle);
        const sectionGrid = document.createElement('div');
        sectionGrid.className = 'section-grid';
        sections[sectionName].forEach((img, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.tabIndex = 0;
            card.setAttribute('data-index', images.indexOf(img));
            card.innerHTML = `
                <img src="${img.url}" alt="${img.caption}">
                <div class="caption">${img.caption}</div>
            `;
            card.addEventListener('click', () => openModal(images.indexOf(img)));
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') openModal(images.indexOf(img));
            });
            sectionGrid.appendChild(card);
        });
        sectionDiv.appendChild(sectionGrid);
        gallery.appendChild(sectionDiv);
    });
}

// Modal logic for selecting/viewing images
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" tabindex="0">&times;</span>
            <img id="modal-img" src="" alt="">
            <div id="modal-caption"></div>
            <div class="modal-controls">
                <button id="prev-btn">&#8592;</button>
                <button id="next-btn">&#8594;</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.close-btn').onclick = closeModal;
    modal.querySelector('.close-btn').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') closeModal(); };
    modal.querySelector('#prev-btn').onclick = () => changeModalImage(-1);
    modal.querySelector('#next-btn').onclick = () => changeModalImage(1);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', modalKeyHandler);
}

let currentModalIdx = 0;

function openModal(idx) {
    currentModalIdx = idx;
    const modal = document.getElementById('modal') || (createModal(), document.getElementById('modal'));
    updateModalImage();
    modal.style.display = 'flex';
    setTimeout(() => modal.querySelector('.close-btn').focus(), 100);
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

function updateModalImage() {
    const img = images[currentModalIdx];
    document.getElementById('modal-img').src = img.url;
    document.getElementById('modal-img').alt = img.caption;
    document.getElementById('modal-caption').textContent = img.caption;
}

function changeModalImage(dir) {
    currentModalIdx = (currentModalIdx + dir + images.length) % images.length;
    updateModalImage();
}

function modalKeyHandler(e) {
    const modal = document.getElementById('modal');
    if (!modal || modal.style.display !== 'flex') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') changeModalImage(-1);
    if (e.key === 'ArrowRight') changeModalImage(1);
}

document.addEventListener('DOMContentLoaded', loadGallery);
