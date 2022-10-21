// tracker settings
// Add the url copied from step 2 here
SHEETS_TRACKING.sheetsURL = "https://script.google.com/macros/s/AKfycbw8SYgVqixbgepog7bR29LX-5ZzEmpN9C23lGVeih2-Avz5iwSs4Qh1Yjd3A2dihW09/exec"

// Add the name of your spreadsheet here
SHEETS_TRACKING.sheetName = "Tracking"
SHEETS_TRACKING.start()

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
