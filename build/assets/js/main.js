const contextmenuid = 'cv-context-menu';
const contextmenuHeight = 100;
const contextmenuWidth = 80;

function cvInputOnKeyDown(event) {
    const elem = event.target;
    switch (event.key) {
        case 'Enter':
            let newLine = document.createElement('input');
            newLine.setAttribute('class', 'cv-input');
            newLine.setAttribute('type', 'text');
            newLine.setAttribute('placeholder', '');
            newLine.setAttribute('autocomplete', 'off');
            newLine.classList.add(...elem.classList);
            newLine.addEventListener('keydown', cvInputOnKeyDown);
            
            // TODO split text
            const text = elem.value;
            elem.value = text.substring(0, elem.selectionEnd);
            newLine.value = text.substring(elem.selectionEnd);
            newLine.selectionStart = 0;
            newLine.selectionEnd = 0;
            
            elem.parentElement.insertBefore(newLine, elem.nextElementSibling);
            newLine.focus();
            break;
        case 'Backspace':
            if (elem.selectionStart == 0 && elem.selectionEnd == 0) {
                if (elem.parentElement.children.length > 1) {
                    event.preventDefault();
                    let newLine;
                    if (elem.previousElementSibling != null) {
                        newLine = elem.previousElementSibling;
                    } else {
                        newLine = elem.nextElementSibling;
                    }


                    newLine.value += elem.value;
                    let pos = newLine.value.length - elem.value.length;
                    newLine.setSelectionRange(pos, pos);
                    newLine.focus();
                    elem.remove();
                }
            }
            break;
        case 'Up':
        case 'ArrowUp':
            if (elem.selectionStart == elem.selectionEnd) {
                event.preventDefault();
                let prev = elem.previousElementSibling;
                if (prev != null && prev.classList.contains('cv-input')) {
                    if (elem.value.length == elem.selectionStart) {
                        prev.setSelectionRange(prev.value.length, prev.value.length);
                    } else {
                        prev.setSelectionRange(elem.selectionStart, elem.selectionEnd);
                    }
                    prev.focus();
                }
            }
            break;
        case 'Down':
        case 'ArrowDown':
            if (elem.selectionStart == elem.selectionEnd) {
                event.preventDefault();
                let next = elem.nextElementSibling;
                if (next != null && next.classList.contains('cv-input')) {
                    if (elem.value.length == elem.selectionStart) {
                        next.setSelectionRange(next.value.length, next.value.length);
                    } else {
                        next.setSelectionRange(elem.selectionStart, elem.selectionEnd);
                    }
                    next.focus();
                }
            }
            break;
        case 'Left':
        case 'ArrowLeft':
            if (elem.selectionStart == 0 && elem.selectionEnd == 0) {
                event.preventDefault();
                let prev = elem.previousElementSibling;
                if (prev != null) {
                    prev.setSelectionRange(prev.value.length, prev.value.length);
                    prev.focus();
                }
            }
            break;
        case 'Right':
        case 'ArrowRight':
            if (elem.selectionStart == elem.value.length && elem.selectionEnd == elem.value.length) {
                event.preventDefault();
                let next = elem.nextElementSibling;
                if (next != null) {
                    next.setSelectionRange(0, 0);
                    next.focus();
                }
            }
            break;
    }
}


window.addEventListener('dragover', (e) => {
    e.preventDefault();
});
window.addEventListener('drop', (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.items) {
        const item = e.dataTransfer.items[0];

        if (item.type.match('^application/json')) {
            const wrapper = document.querySelector('#wrapper');
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.lastChild);
            }

            loadJSON(item.getAsFile());
        }
    }
});
window.addEventListener('load', (_) => {
    fetch('assets/default_cv.json').then((resp) => {
        resp.json().then(json => {
            let date = Intl.DateTimeFormat('de-DE', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date());

            json['application-letter']['al-date'] = date;
            json['cv-signature.citydate'] = `Musterstadt, den  ${date}`;

            const wrapper = document.querySelector('#wrapper');
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.lastChild);
            }

            let blob = new Blob([JSON.stringify(json)], {type: "application/json"});

            loadJSON(new File([blob], 'default cv'));
        });
    });
});
