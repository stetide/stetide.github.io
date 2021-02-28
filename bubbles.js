const bubbleAmount = 100;
const timeout = 12000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

for (let i = 0; i < bubbleAmount; i++) {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    $(bubble).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);
    document.body.appendChild(bubble);
}

let bubbles = document.getElementsByClassName("bubble");
for (let i = 0; i < bubbles.length; i++) {
    let size = Math.floor(Math.random() * 30) + 30;
    $(bubbles[i]).css({
        "width": `${size}px`,
        "height": `${size}px`,
        "opacity": Math.random() * 0.2 + 0.5,
        "transform": `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`,
    });
}

async function animateBubbles() {
    let bubbles = document.getElementsByClassName("bubble");
    console.log(bubbles.length);
    for (let i = 0; true; i++) {
        if (i == bubbles.length) { i = -1; continue; }

        $(bubbles[i]).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);
        await sleep(timeout / bubbles.length); //- 50 * Math.random());
    }
}

animateBubbles();
setTimeout(function() {$(".bubble").css("transition", `transform ${timeout}ms linear`); }, 8000);
