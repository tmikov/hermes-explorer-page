const hello = require("./hermes.js");
var prog = hello({print: myprint, printErr: myprint});

prog.FS.writeFile("/tmp/hermes-input.txt", "This is data in a file");
prog.callMain(["--help"]);

function myprint(str) {
    console.log("MY", str);
}
