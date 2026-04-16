const classesData = {
    6: ['6B1', '6B2', '6B3', '6B4', '6B5', '6B6', '6B7', '6B8', '6B9'],
    7: ['7B1', '7B2', '7B3', '7B4', '7B5', '7B6', '7B7', '7B8'],
    8: ['8B1', '8B2', '8B3', '8B4', '8B5', '8B6'],
    9: ['9B1', '9B2', '9B3', '9B4', '9B5', '9B6', '9B7']
};

let winners = [];

function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function showGrades(eventName) {
    showSection('grade-selection');
    document.getElementById('current-event-title').innerText = eventName + " - Select Grade";
    const btnContainer = document.getElementById('grade-buttons');
    btnContainer.innerHTML = '';

    [6, 7, 8, 9].forEach(grade => {
        let btn = document.createElement('button');
        btn.innerText = 'Grade ' + grade;
        btn.onclick = () => displayClasses(grade);
        btnContainer.appendChild(btn);
    });
}

function displayClasses(grade) {
    const list = document.getElementById('class-list');
    list.innerHTML = '';
    classesData[grade].forEach(cls => {
        let li = document.createElement('li');
        li.className = 'class-item';
        li.innerHTML = `
            <input type="checkbox" onchange="toggleWinner('${cls}', this)">
            <span>${cls}</span>
        `;
        list.appendChild(li);
    });
}

function toggleWinner(className, checkbox) {
    if (checkbox.checked) {
        winners.push(className);
        checkbox.parentElement.classList.add('winner-highlight');
    } else {
        winners = winners.filter(item => item !== className);
        checkbox.parentElement.classList.remove('winner-highlight');
    }
}

function goToWinners() {
    showSection('winners-page');
    const display = document.getElementById('winners-display');
    display.innerHTML = winners.length > 0 ? 
        winners.map(w => `<div class="card"><h3>${w}</h3></div>`).join('') :
        "<p>No winners selected yet.</p>";
}
