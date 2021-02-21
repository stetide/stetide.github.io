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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

for (let i = 0; i < 50; i++) {
    let bubble = document.createElement("div")
    bubble.className = "bubble";
    $(bubble).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);
    document.body.appendChild(bubble);
}

let bubbles = document.getElementsByClassName("bubble");
for (let i = 0; i < bubbles.length; i++) {
    console.log(i);
    let size = Math.floor(Math.random() * 30) + 30;
    $(bubbles[i]).css({
        "width": `${size}px`,
        "height": `${size}px`,
        "opacity": Math.random() * 0.6 + 0.2,
        "transform": `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`,
    });
}

async function animateBubbles() {
    let i = 0;
    while (true) {
        $(bubbles[i]).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);

        i++
        if (i == bubbles.length) i = 0;
        await sleep(8000 / bubbles.length - 50 * Math.random());
    }
}

animateBubbles();
$(".bubble").css("transition", "transform 8s linear");
