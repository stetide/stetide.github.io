function saveJSON() {
    let json = {
        'application-letter': saveApplicationLetter(),
        'cv': saveCV(),
        'cv-signature.citydate': document.querySelector('.cv:last-of-type .cv-signature-citydate').value,
        'cv-profile-picture': document.querySelector('.cv-profile-picture-img').src,
        'cv-signature-img': document.querySelector('.cv-signature-img').src,
        'theme': document.querySelector('#theme').href
    }

    const date = Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date());

    let a = document.createElement('a');
    let blob = new Blob([JSON.stringify(json)], {type: 'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = `Bewerbung ${date}.json`;
    a.click();
}

function saveApplicationLetter() {
    let json = {};
    const al = document.querySelector('.application-letter');
    
    for (const addr of ['al-address-to', 'al-address-from']) {
        json[addr] = [...al.querySelectorAll(`#${addr} .cv-input`)].map((line) => line.value).join(';');
    }

    json['al-date'] = al.querySelector('.al-date .cv-input').value;

    json['al-heading'] = al.querySelector('.al-heading .cv-input').value;

    json['al-motivation'] = al.querySelector('.al-motivation .content').innerText;

    json['al-salutation'] = al.querySelector('.al-salutation .cv-input').value;

    json['al-signature.name'] = al.querySelector('.cv-signature-citydate').value;

    return json;
}

function saveCV() {
    const cv = document.querySelectorAll('.cv');

    const l = [];
    
    for (const page of cv) {
        let json = {};
        json['cv-title.h1'] = [...page.querySelectorAll('.cv-title-h1')].map((line) => line.value).join(';');
        json['cv-title.h2'] = [...page.querySelectorAll('.cv-title-h2')].map((line) => line.value).join(';');

        for (const area of ['cv-sidebar', 'cv-main']) {
            json[area] = [...page.querySelectorAll(`.${area} .cv-category`)].map((category) => {
                return {
                    'heading': category.querySelector('.cv-category-heading').value,
                    'iconsrc': category.querySelector('img').src,
                    'list': category.hasAttribute('list') ? category.getAttribute('list') == "" || category.getAttribute('list') == 'true' : false,
                    'content': [...category.querySelectorAll('.cv-category-content .cv-item')].map((item) => {
                        return {
                            'heading': [...item.querySelectorAll('.cv-item-header .cv-input')].map((line) => line.value).join(';'),
                            'content': [...item.querySelectorAll('.cv-item-content .cv-input')].map((line) => line.value).join(';')
                        };
                    }),
                };
            });
        }

        l.push(json);
    }

    return l;
}
