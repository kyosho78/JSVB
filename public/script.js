var socket = io();

function loadPage(page) {
    const content = {
        home: 'Tervetuloa Walden Chat sivustolle!',
        about: '<h2>Meistä</h2><p>Sivumme tarjoaa helpon ja hauskan tavan pitää yhteyttä!</p><p>Pidetään hauskaa!</p>',
        contact: '<h2>Yhteystiedot</h2><p>Ota yhteyttä Walden chattiin: 555-chat-fun</p>',
        staff: '<h2>Meidän huippu hyvät moderaattorit</h2><div id="staff_list">Ladataan...</div>',
        chat: '', //  empty to manage visibility separately
        weather: '' //  empty to manage visibility separately
    };

    // Default behavior for content update
    document.getElementById('main_content').innerHTML = content[page] || '';

    // Chat app visibility
    if (page === 'chat') {
        document.getElementById('chat').style.display = 'block'; // Show chat app
    } else {
        document.getElementById('chat').style.display = 'none'; // Hide chat app if not the chat page
    }

    // Weather app visibility
    if (page === 'weather') {
        document.querySelector('.card').style.display = 'block'; // Show weather app
    } else {
        document.querySelector('.card').style.display = 'none'; // Hide weather app if not the weather page
    }

    // Fetch staff data if the staff page is selected
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


// sets theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.className = 'dark';
    } else {
        document.body.className = 'white';
    }
}




// Chat app
var form = document.getElementById('form');
var input = document.getElementById('input');
var nameInput = document.getElementById('name');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value && nameInput.value) { // checks if the input is not empty
        var message = nameInput.value + ': ' + input.value; // puts the name in front of the message
        socket.emit('chat message', message);
        input.value = ''; // empty the input field
    } else if (!nameInput.value) {
        alert("Please enter your name.");
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    item.classList.add('blink'); // new message blinks
    document.getElementById('messages').prepend(item);
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(() => {
        item.classList.remove('blink');
    }, 5000);
    
});

// loads the page
loadPage('home');
