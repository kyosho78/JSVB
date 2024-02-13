var socket = io();

function loadPage(page) {
    const content = {
        home: 'Tervetuloa Walden Chat sivustolle!',
        about: '<h2>Meistä</h2><p>Sivumme tarjoaa helpon ja hauskan tavan pitää yhteyttä!</p><p>Pidetään hauskaa!</p>',
        contact: '<h2>Yhteystiedot</h2><p>Ota yhteyttä Walden chattiin: 555-chat-fun</p>',
        staff: '<h2>Meidän huippu hyvät moderaattorit</h2><div id="staff_list">Ladataan...</div>'
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
var nameInput = document.getElementById('name');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value && nameInput.value) { // Check if both name and message are provided
        var message = nameInput.value + ': ' + input.value; // Concatenate name and message
        socket.emit('chat message', message);
        input.value = ''; // Clear message input after sending
    } else if (!nameInput.value) {
        alert("Please enter your name.");
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    item.classList.add('blink'); // Add the blink class to make the message blink
    document.getElementById('messages').prepend(item);
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(() => {
        item.classList.remove('blink');
    }, 5000);
    
});

// Load default page content
loadPage('home');
