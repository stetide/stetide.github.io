const input = document.getElementById("txtInpt");
const send = document.getElementById("sendBtn");
const display = document.getElementById("display");
const cheatBtnO = document.getElementById("cheatBtnOpen");
const cheatBtnC = document.getElementById("cheatBtnClose");
const cheatSheet = document.getElementById("cheatsheet");

cheatBtnO.onclick = function() {
    cheatBtnO.classList.add("open");
    cheatSheet.classList.remove("closed");
}

cheatBtnC.onclick = function() {
    cheatBtnO.classList.remove("open");
    cheatSheet.classList.add("closed");
}

input.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
});

function clear() {
    let pars = document.getElementsByTagName("p");
    for (let i = pars.length -1; i >= 0; i--) {
        pars[i].parentNode.removeChild(pars[i]);
    }
}

function openNewTab(url) {
    let link = document.createElement("a");
    link.href = url;
    link.setAttribute('target', '_blank');
    link.click();
}

function onSend() {
    let cmdSpan = document.createElement("span");
    let cmdSpanNode = document.createTextNode("$");
    let cmdNode = document.createTextNode(input.value);
    cmdSpan.appendChild(cmdSpanNode);
    let cmdBr = document.createElement("br");

    // tmp
    if (input.value == "") {
        let par = document.createElement("p");
        par.appendChild(cmdSpan)
        display.prepend(par);
        return;
    }
    let res = run(input.value);
    input.value = "";
    console.log(res);

    switch (res) {
        case "undefined":
            location.reload();
            break;
        case "exit":
            // location.reload();
            // window.location.href = "//stetide.github.io";
            location.replace("//stetide.github.io");
            break;
        case "clear":
            input.value = "";
            clear();
            return;
        case "help":
            // location.replace("/vector/help/");
            // let win = window.open("/vector/help/", "_blank");
            // win.focus();
            openNewTab("/vector/help/");
            res += " (Erlaube Pop-up-Fenster, wenn sich keine neue Seite öffnet.)"
            break;
        //tmp
        default:
            console.log(res);
            break;
    }
    
    let par = document.createElement("p");
    let parNode = document.createTextNode(res);
    
    let resSpan = document.createElement("span");
    let resNode = document.createTextNode(">>");
    resSpan.appendChild(resNode);
    
    par.appendChild(cmdSpan);
    par.appendChild(cmdNode);
    par.appendChild(cmdBr);
    if (res != "") {
        par.appendChild(resSpan);
        par.appendChild(parNode);
    }

    display.prepend(par);
    display.scrollTop = display.scrollHeight;
}
send.addEventListener("click", onSend);
