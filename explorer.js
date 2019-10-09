function onLoad() {
    var outputArea = document.getElementById("outputArea");
    var commandLine = document.getElementById("commandLine");
    var runHermes = document.getElementById("runHermes");

    var runRequested = false;
    runHermes.onclick = function () {
        if (runRequested)
            return;
        outputArea.innerText = "Running...";
        runRequested = 1;

        var args = commandLine.value.split(/\s+/).filter(x => x);

        worker.postMessage(["run", args, editor.getValue()])
    };

    var worker = new Worker("worker.js");
    worker.onmessage = function (e) {
        switch (e.data[0]) {
            case "runResult":
                runRequested = false;
                outputArea.innerText = e.data[1];
                break;
        }
    };
}
