const classesData = {
    6: ['6B1', '6B2', '6B3', '6B4', '6B5', '6B6', '6B7', '6B8', '6B9'],
    7: ['7B1', '7B2', '7B3', '7B4', '7B5', '7B6', '7B7', '7B8'],
    8: ['8B1', '8B2', '8B3', '8B4', '8B5', '8B6'],
    9: ['9B1', '9B2', '9B3', '9B4', '9B5', '9B6', '9B7']
};

let winners = [];

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    
    // Reset Nav Highlights
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active-nav'));

    // Show selected section
    if(sectionId === 'welcome') {
        document.getElementById('welcome').classList.remove('hidden');
    } else {
        document.getElementById('event-display').classList.remove('hidden');
        // Highlight the Nav Item
        const navItem = document.getElementById('nav-' + sectionId);
        if(navItem) navItem.classList.add('active-nav');
        
        setupSubCategories(sectionId);
    }
}

function setupSubCategories(type) {
    const container = document.getElementById('sub-categories');
    container.innerHTML = '';
    
    let options = [];
    if(type === 'maths') options = ['Sudoku Challenge', 'Quiz Team'];
    if(type === 'sciences') options = ['Quiz Bowl', 'SciTalk', 'Minute2WinIt'];
    if(type === 'esl') options = ['Extemporaneous', 'Impromptu', 'Debate', 'Spelling Bee'];

    options.forEach(opt => {
        let div = document.createElement('div');
        div.className = 'category-card';
        div.innerHTML = `<h3>${opt}</h3>`;
        div.onclick = () => showGrades(opt);
        container.appendChild(div);
    });
}

function showGrades(eventName) {
    document.getElementById('event-display').classList.add('hidden');
    document.getElementById('grade-selection').classList.remove('hidden');
    document.getElementById('current-event-title').innerText = eventName;

    const btnContainer = document.getElementById('grade-buttons');
    btnContainer.innerHTML = '';
    [6, 7, 8, 9].forEach(g => {
        let b = document.createElement('button');
        b.innerText = "Grade " + g;
        b.onclick = () => renderClassCards(g);
        btnContainer.appendChild(b);
    });
}

function renderClassCards(grade) {
    const container = document.getElementById('class-grid');
    container.innerHTML = '';
    classesData[grade].forEach(cls => {
        let card = document.createElement('div');
        card.className = 'class-card';
        if(winners.includes(cls)) card.classList.add('selected');
        card.innerHTML = `<strong>${cls}</strong>`;
        card.onclick = () => {
            card.classList.toggle('selected');
            if(card.classList.contains('selected')) {
                winners.push(cls);
            } else {
                winners = winners.filter(w => w !== cls);
            }
        };
        container.appendChild(card);
    });
}

function goToWinners() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('winners-page').classList.remove('hidden');
    const display = document.getElementById('winners-display');
    display.innerHTML = '';
    winners.forEach(w => {
        let card = document.createElement('div');
        card.className = 'class-card selected';
        card.innerHTML = `<strong>🏆 ${w}</strong>`;
        display.appendChild(card);
    });
}
