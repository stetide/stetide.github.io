function loadJSON(file) {
    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
        createApplicationFromJSON(JSON.parse(reader.result));
    });
    reader.readAsText(file);
}

function createApplicationFromJSON(json) {
    createApplicationLetterFromJSON(json);
    createCVFromJSON(json);
    loadTheme(json['theme']);
}

function createApplicationLetterFromJSON(json) {
    const wrapper = document.querySelector('#wrapper');
    const alJson = json['application-letter'];
    
    const al = document.createElement('al-page');
    al.setAttribute('address_to', alJson['al-address-to']);
    al.setAttribute('address_from', alJson['al-address-from']);
    al.setAttribute('date', alJson['al-date']);
    al.setAttribute('heading', alJson['al-heading']);
    al.setAttribute('motivation', alJson['al-motivation']);
    al.setAttribute('salutation', alJson['al-salutation']);
    al.setAttribute('name', alJson['al-signature.name']);
    al.setAttribute('signature_img', json['cv-signature-img']);
    wrapper.appendChild(al);
}

function createCVFromJSON(json) {
    const wrapper = document.querySelector('#wrapper');
    
    for (const cvJson of json['cv']) {
        const cv = document.createElement('cv-page');
        cv.setAttribute('title_h1', cvJson['cv-title.h1']);
        cv.setAttribute('title_h2', cvJson['cv-title.h2']);
        cv.setAttribute('profile_picture', json['cv-profile-picture']);
        wrapper.appendChild(cv);

        for (const areaName of ['cv-sidebar', 'cv-main']) {
            const area = cv.querySelector('.'+ areaName);
            
            // clear all children from area
            while(area.firstChild) {
                area.removeChild(area.lastChild);
            }

            for (const catJson of cvJson[areaName]) {
                const cat = document.createElement('cv-category');
                cat.setAttribute('heading', catJson['heading']);
                cat.setAttribute('iconsrc', catJson['iconsrc']);
                area.appendChild(cat);

                for (itemJson of catJson['content']) {
                    const item = document.createElement('cv-item');
                    item.setAttribute('heading', itemJson['heading']);
                    item.setAttribute('content', itemJson['content']);
                    cat.appendChild(item);
                }
            }
        }
    }

    const cv = wrapper.querySelector('.cv:last-of-type');
    const signature = document.createElement('cv-signature');
    signature.setAttribute('citydate', json['cv-signature.citydate']);
    signature.setAttribute('signature_img', json['cv-signature-img']);
    cv.querySelector('.cv-main').appendChild(signature);
}
