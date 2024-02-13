var socket = io();

function loadPage(page) {
    const content = {
        home: 'Tervetuloa Walden Hevoset sivustolle!',
        about: '<h2>Meistä</h2><p>Yrityksemme tarjoaa kaiken mahdollisen hevosia varten. </p><p>Myynnissä myös hevosia! </p>',
        contact: '<h2>Yhteystiedot</h2><p>Ota yhteyttä Walden päämajaan 555-HEVONEN</p>',
        staff: '<h2>Meidän huippu henkilökunta</h2><div id="staff_list">Ladataan...</div>'
    };

    document.getElementById('main_content').innerHTML = content[page] || 'Sivua ei löydy';

    if (page === 'staff') {
        fetchStaffData();
    }
}


function fetchStaffData() {
    fetch('/api/staff')
    .then(response => response.json())
    .then(data => {
        const staffList = data.map(person =>
            `<p>${person.name}, ${person.title}, ${person.email}, ${person.phone}</p>`
        ).join('');
        document.getElementById('staff_list').innerHTML = `<ul>${staffList}</ul>`;
    });
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.className = 'dark';
    } else {
        document.body.className = 'white';
    }
}

// Chat functionality
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

// Load default page content
loadPage('home');
