function getContext(event) {
    let context = {};

    // category & item
    if(event.target.classList.contains('cv-category')) {
        context.targetCategory = event.target;
        // context.targetItem = context.targetCategory.querySelector('.cv-category-content').lastElementChild;
    } else if (event.target.classList.contains('cv-item')) {
        context.targetItem = event.target;
    }
    // title
    else if (event.target.classList.contains('cv-title')) {
        context.title = event.target;
    } else if (event.target.classList.contains('cv-title-h1') || event.target.classList.contains('cv-title-h2')) {
        context.title = event.target.parentElement;
    }

    // for (let i = event.target.children.length-1; i >= 0 && context.targetCategory == null;  i--) {
    //     if (event.target.children[i].classList.contains('cv-category')) {
    //         context.targetCategory = event.target.children[i];
    //     }
    // }
    for (let parent = event.target.parentElement; parent != null && context.targetCategory == null; parent = parent.parentElement) {
        if (parent.classList.contains('cv-category')) {
            context.targetCategory = parent;
            // context.targetItem = context.targetCategory.querySelector('.cv-category-content').lastElementChild;
        }
    }

    for (let i = event.target.children.length-1; i >= 0 && context.targetItem == null;  i--) {
        if (event.target.children[i].classList.contains('cv-item')) {
            context.targetItem = event.target.children[i];
        }
    }
    for (let parent = event.target.parentElement; parent != null && context.targetItem == null; parent = parent.parentElement) {
        if (parent.classList.contains('cv-item')) {
            context.targetItem = parent;
        }
    }

    // page
    for (let parent = event.target; parent != null && context.page == null; parent = parent.parentElement) {
        if (parent.classList.contains('page')) {
            context.page = parent;
        }
    }

    return context;
}

function showContextMenu(e) {
    if (e.target.closest('.page') === null) {
        return
    }

    e.preventDefault();
    
    document.addEventListener('click', hideContextMenu);
    
    if (document.querySelector('#'+contextmenuid) != null) {
        document.querySelector('#'+contextmenuid).remove();
    }

    const menu = document.createElement('div');
    menu.setAttribute('id', contextmenuid);

    let context = getContext(e);

    // helper
    const menuBtn = (name, callback) => {
        const btn = document.createElement('input');
        menu.appendChild(btn);
        btn.addEventListener('click', callback);
        btn.type = 'button';
        btn.value = name;
    }



    if (e.target.classList.contains('cv-main') || e.target.classList.contains('cv-sidebar')) {
        menuBtn('Neue Katergorie', (_) => {
            const cat = document.createElement('cv-category');

            let t = e.target.querySelector('.cv-category:last-of-type');
            if (t !== null) {
                t.after(cat);
            } else {
                e.target.lastElementChild.before(cat);
            }

            const item = document.createElement('cv-item');
            cat.querySelector('.cv-category-content').appendChild(item);
        });
    } else if (context.targetCategory != null) {
        menuBtn('Neue Kategorie', (_) => {
            const cat = document.createElement('cv-category');
            context.targetCategory.after(cat);

            const item = document.createElement('cv-item');
            cat.querySelector('.cv-category-content').appendChild(item);
        });

        menuBtn('Neuer Eintrag', (_) => {
            const item = document.createElement('cv-item');
            if (context.targetItem != null) {
                context.targetItem.after(item);
            }
            context.targetCategory.appendChild(item);
        });

        if (context.targetItem != null) {
            menuBtn('Eintrag Löschen', (_) => {
                context.targetItem.remove();
            });
        }

        menuBtn('Kategorie Löschen', (_) => {
            context.targetCategory.remove();
        });
    }

    if (context.title != null) {
        textField = () => {
            const txtField = document.createElement('input');
            txtField.type = 'text';
            txtField.placeholder = '';
            txtField.autocomplete = 'off';
            txtField.classList.add('cv-input');
            txtField.addEventListener('keydown', cvInputOnKeyDown);

            return txtField;
        }
        
        menuBtn('Neuer Titel', (_) => {
            const h1 = textField();
            h1.classList.add('cv-title-h1');
            context.title.prepend(h1);
        });

        menuBtn('Neuer Untertitel', (_) => {
            const h2 = textField();
            h2.classList.add('cv-title-h2');
            context.title.lastElementChild.after(h2);
        });
    }

    menuBtn('Neue Seite', (_) => {
        let refpage = context.page;
        if (!refpage.classList.contains('cv')) {
            refpage = document.querySelector('cv-page');
        }

        const page = document.createElement('cv-page');
        page.setAttribute('title_h1', refpage.querySelector('.cv-title-h1').value);
        page.setAttribute('title_h2', refpage.querySelector('.cv-title-h2').value);
        page.setAttribute('signature_txt', refpage.querySelector('.cv-signature-citydate').value);
        page.setAttribute('signature_img', refpage.querySelector('.cv-signature-img').src) ;
        page.setAttribute('profile_picture_img', refpage.querySelector('.cv-profile-picture-img').src);
        
        context.page.after(page);
        
        page.querySelector('.cv-signature-citydate').value = refpage.querySelector('.cv-signature-citydate').value;
        page.scrollIntoView({ behavior: "smooth" });
    });

    if (context.page != null && context.page.classList.contains('cv') && document.querySelectorAll('.cv').length > 1) {
        menuBtn('Seite Löschen', (_) => {
            let page = context.page.previousSibling;
            if (page.classList.contains('cv')) {
                page.querySelector('.cv-signature-citydate').value = context.page.querySelector('.cv-signature-citydate').value;
                page.querySelector('.cv-profile-picture-img').src = context.page.querySelector('.cv-profile-picture-img').src;
                page.querySelector('.cv-signature-img').src = context.page.querySelector('.cv-signature-img').src;
            }

            page.scrollIntoView({ behavior: "smooth" });
            scrollendcallback = () => {
                context.page.remove();
                document.removeEventListener('scrollend', scrollendcallback);
            }
            addEventListener('scrollend', scrollendcallback);
        });
    }

    const divider = document.createElement('div');
    divider.setAttribute('class', 'divider')
    menu.appendChild(divider);


    menuBtn('Als PDF Exportieren', (_) => {
        window.print();
    });
    
    menuBtn('Speichern', (_) => { saveJSON(); });

    document.querySelector('#wrapper').appendChild(menu);
    
    // set position
    if (window.innerWidth - e.clientX > menu.offsetWidth) {
        menu.style.left = e.clientX + 'px';
    } else {
        menu.style.right = window.innerWidth - e.clientX + 'px';
    }

    if (window.innerHeight - e.clientY > menu.offsetHeight) {
        menu.style.top = e.clientY + 'px';
    } else {
        menu.style.bottom = window.innerHeight - e.clientY + 'px';
    }
}

function hideContextMenu() {
    const menu = document.querySelector('#'+contextmenuid);
    if (menu != null) {
        menu.remove();
        document.removeEventListener('click', hideContextMenu);
    }
}

document.addEventListener('contextmenu', showContextMenu);
