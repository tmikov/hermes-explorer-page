function onLoad() {
    var outputArea = document.getElementById("outputArea");
    var commandLine = document.getElementById("commandLine");
    var runHermes = document.getElementById("runHermes");

    var output = "";
    var runtimeInitialized = false;
    var runRequested = 0;
    var runCommandLine = "";
    var app;
    var lastTime;

    runHermes.onclick = onRunHermes;

    startRuntimeInitialization();

    function ellapsed() {
        if (!lastTime) {
            lastTime = new Date();
            return 0 + " ms";
        }
        var newTime = new Date();
        var res = newTime - lastTime;
        lastTime = newTime;
        return res + " ms";
    }

    function startRuntimeInitialization() {
        console.log(ellapsed(), "startRuntimeInit");
        runtimeInitialized = false;
        app = createApp({
            print: handleStdout, printErr: handleStdout, onRuntimeInitialized: onRuntimeInitialized
        });
    }

    function onRuntimeInitialized() {
        console.log(ellapsed(), "runtime ready");
        runtimeInitialized = true;
        if (runRequested)
            setTimeout(executeHermes, 0);
    }

    function onRunHermes() {
        console.log(ellapsed(), "run requested");
        if (runRequested)
            return;
        outputArea.innerText = "Running...";
        runCommandLine = commandLine.value;
        runRequested = 1;

        if (runtimeInitialized)
            setTimeout(executeHermes, 0);
    }

    function executeHermes() {
        console.log(ellapsed(), "executing hermes");
        runRequested = 2;

        var args = commandLine.value.split(/\s+/);

        var fileName = "/tmp/hermes-input.js";
        app.FS.writeFile(fileName, editor.getValue());

        args.push("--pretty-json");
        args.push(fileName);

        app.callMain(args);
        console.log(ellapsed(), "hermes done");

        // Delete all child nodes.
        outputArea.innerText = output;

        output = "";
        runRequested = 0;
        startRuntimeInitialization();
    }

    function handleStdout(txt) {
        output += txt;
        output += "\n";
    }
}
