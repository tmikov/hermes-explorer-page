function onLoad() {
    var inputArea = document.getElementById("inputArea");
    var outputArea = document.getElementById("outputArea");
    var commandLine = document.getElementById("commandLine");
    var runHermes = document.getElementById("runHermes");

    runHermes.onclick = onRunHermes;

    function onRunHermes() {
        // Delete all child nodes.
        outputArea.innerHTML = "";
        var output = "";

        function handleStdout(txt) {
            output += txt;
            output += "\n";
            // outputArea.appendChild(document.createTextNode(txt));
            // outputArea.appendChild(document.createElement("br"));
        }

        var app = createApp({
            print: handleStdout, printErr: handleStdout, onRuntimeInitialized: function () {

                var args = commandLine.value.split(/\s+/);
                if (args.length === 0) {
                    args.push("--help");
                } else {
                    var fileName = "/tmp/hermes-input.js";
                    app.FS.writeFile(fileName, inputArea.value);
                    args.push("--pretty-json");
                    args.push(fileName);
                }

                app.callMain(args);

                var pre = document.createElement("pre");
                pre.innerText = output;
                outputArea.appendChild(pre);
            }
        });
    }
}
