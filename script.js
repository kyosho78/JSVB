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




// Lisää tämä funktio teeman vaihtamiseksi
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.className = 'dark';
    } else {
        document.body.className = 'white';
    }
}


// Oletuksena ladataan kotisivu
loadPage('home');