function loadTheme(href) {
    document.querySelector('#theme').href = href;
    
    // let parts = href.split('/');
    // let colorName = parts[parts.length -1].split('.')[0];
    // parts[parts.length -1] = 'theme.json';
    
    // fetch(parts.join('/')).then(resp => {
    //     resp.json().then( json => {
    //         for (const color of json['colors']) {
    //             let button = document.createElement('input');
    //             button.setAttribute('class', 'color-button');
    //             button.setAttribute('type', 'button');
    //             button.setAttribute('name', color['name']);
    //             button.addEventListener('click', _ => {
    //                 loadTheme(color['href']);
    //             });
    //             button.style.backgroundColor = color['color'];
                
    //             colorsDiv.appendChild(button);
    //         }
    //     });
    // });
}