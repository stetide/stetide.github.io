var input = document.getElementById("txtInpt");
var send = document.getElementById("sendBtn");
var display = document.getElementById("display");

input.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
});

function clear() {
    var pars = document.getElementsByTagName("p");
    for (var i = pars.length -1; i >= 0; i--) {
        pars[i].parentNode.removeChild(pars[i]);
    }
}

function onSend() {
    var cmdSpan = document.createElement("span");
    var cmdSpanNode = document.createTextNode("$");
    var cmdNode = document.createTextNode(input.value);
    cmdSpan.appendChild(cmdSpanNode);
    var cmdBr = document.createElement("br");

    // tmp
    if (input.value == "") {
        var par = document.createElement("p");
        par.appendChild(cmdSpan)
        display.prepend(par);
        return;
    }
    var res = run(input.value);
    input.value = "";
    console.log(res);

    switch (res) {
        case "undefined":
            location.reload();
        case "exit":
            // location.reload();
            // window.location.href = "stetide.github.io";
            location.replace("stetide.github.io");
            break;
        case "clear":
            input.value = "";
            clear();
            return;
    }
    
    var par = document.createElement("p");
    var parNode = document.createTextNode(res);
    
    var resSpan = document.createElement("span");
    var resNode = document.createTextNode(">>");
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
