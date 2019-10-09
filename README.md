# Hermes Explorer

The Hermes Explorer is similar in spirit to the [Godbolt Compiler Explorer](https://godbolt.org/), but for the 
[Hermes JavaScript engine](https://hermesengine.dev/). It allows people to run the Hermes Compiler and Hermes JavaScript 
engine in their browser window, and observe and study the compiler output.

You can try it [here](https://tmikov.github.io/hermes-explorer-page/).

It runs an (almost) unmodified Hermes executable compiled to *asm.js* in the browser and supports exactly the same options.
Some interesting options to try:

- `-O -dump-bytecode` : dump bytecode with optimizations
- `-O -dump-ir`: dump the SSA internal representation with optimizations
- `-dump-ast`: dump the parse tree
- `-O`: compile the code with optimizations and run it.

Please feel free to enter `--help` and explore all other command line options.

## Q/A
Q: Is it safe to run arbitrary JavaScript in the Hermes Explorer?

A: Yes. Since Hermes itself is compiled to asm.js, it is technically running in a sandbox.

Q: But why would I want to do this? Isn't v8 enough?

A: While Hermes is not meant to run in a browser window, having a JavaScript sandbox presents some interesting possibilities.
More importantly, this is meant to demonstrate that Hermes is lightweight and embeddable.
