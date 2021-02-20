/*var bubbles = document.getElementsByClassName("bubble");
for (bubble in bubbles) {
    var size = Math.floor(Math.random() * 10) + 20;
    bubble.setAttribute("style", "width:")
}
for (var i = 0; i < bubbles.length; i++) {
    var size = Math.floor(Math.random() * 30) + 30;
    $(bubbles[i]).css({
        "width": `${size}px`,
        "height": `${size}px`,
        "opacity": Math.random() * 0.6 + 0.2,
        "transform": `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`,
    });
}*/

function animateBubbles() {
    for (var i = 0; i < bubbles.length; i++) {
        $(bubbles[i]).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);
    }
}

var bubbles = document.getElementsByClassName("bubble");
for (var i = 0; i < bubbles.length; i++) {
    var size = Math.floor(Math.random() * 30) + 30;
    $(bubbles[i]).css({
        "width": `${size}px`,
        "height": `${size}px`,
        "opacity": Math.random() * 0.6 + 0.2,
        "transform": `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`,
    });
}
animateBubbles();
setTimeout(function(){ for (var i = 0; i < bubbles.length; i++) { $(bubbles[i]).css("transition", `transform linear ${Math.random() * 7 + 8}s`); } animateBubbles(); }, 1);
setInterval(animateBubbles, 5000);
