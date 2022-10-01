function setColorScheme(colorScheme) {
    wrapper = document.querySelector('#wrapper');
    wrapper.classList.remove('light', 'dark', 'coffee');
    wrapper.classList.add(colorScheme);
    all = wrapper.getElementsByTagName("*");
    for (let i = 0; i < all.length; i++) {
        all[i].classList.remove('light', 'dark', 'coffee');
        all[i].classList.add(colorScheme);
    }
    console.log(colorScheme);
}

// theme change
document.querySelectorAll('.circlebutton').forEach((element) => element.addEventListener('click', () => setColorScheme(element.id)));

// card switch
document.querySelectorAll('.card').forEach(element => element.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(e => () => {e.style.zIndex = '2';});
    element.style.zIndex = '1';
    console.log(element.style.zIndex);
}));

// snapp pages
let currentPage = 1;
let previousY = 0;

window.addEventListener('scroll', (e) => {
    e.preventDefault();
    console.log(window.scrollY);
    // if (window.scrollY > previousY && currentPage < 3) {
    //     currentPage++;
    // } else if (window.scrollY < previousY && currentPage > 1) {
    //     currentPage--;
    // }
    // previousY = window.scrollY; 
    // console.log(currentPage);
    // document.querySelector('.page'+currentPage.toString()).scrollIntoView();
}, false);
