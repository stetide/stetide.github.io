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

// set dark theme at the beginning if the user prefferes
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setColorScheme('dark');
}

// watch for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    setColorScheme(newColorScheme);
});

// card switch
document.querySelectorAll('.card').forEach(element => element.addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(e => () => {e.style.zIndex = '2';});
    element.style.zIndex = '1';
    console.log(element.style.zIndex);
}));
