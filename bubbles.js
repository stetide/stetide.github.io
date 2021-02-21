const bubbleAmount = 100;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

for (let i = 0; i < bubbleAmount; i++) {
    let bubble = document.createElement("div")
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
        "opacity": Math.random() * 0.1 + 0.05,
        "transform": `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`,
    });
}

async function animateBubbles() {
    let bubbles = document.getElementsByClassName("bubble");
    for (let i = 0; true; i++) {
        $(bubbles[i]).css("transform", `translate(${65 - Math.random() * 130}vw, ${65 - Math.random() * 130}vh)`);

        if (i == bubbles.length) i = 0;
        await sleep(8000 / bubbles.length); //- 50 * Math.random());
    }
}

animateBubbles();
setTimeout(function() {$(".bubble").css("transition", "transform 10s ease-in-out"); }, 7900);
