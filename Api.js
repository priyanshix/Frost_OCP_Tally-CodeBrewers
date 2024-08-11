const express = require('express');
const app = express();
const bodyP = require('body-parser');
const compiler = require('compilex');
const { performance } = require('perf_hooks'); // Import performance for timing
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use("/codemirror-5.65.17", express.static("C:/Users/Prayani/Desktop/folders/Projects/OCP/codemirror-5.65.17"));

app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted");
    });
    res.sendFile("C:/Users/Prayani/Desktop/folders/Projects/OCP/index.html");
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    try {
        if (lang === "C++") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };

            // Measure time only for the actual code execution
            const onComplete = (data) => {
                var executionTime;
                var memoryUsage;

                if (data.output) {
                    executionTime = data.executionTime ? `${data.executionTime} ms` : "N/A";
                    memoryUsage = (process.memoryUsage().heapUsed / 1024).toFixed(2) + " KB"; // Memory usage in KB
                    res.send({
                        output: data.output,
                        error: null,
                        executionTime: executionTime,
                        memoryUsage: memoryUsage
                    });
                } else if (data.error) {
                    res.send({
                        output: null,
                        error: `Error: ${data.error}`,
                        executionTime: "N/A",
                        memoryUsage: "N/A"
                    });
                } else {
                    res.send({
                        output: "Unknown error occurred",
                        error: null,
                        executionTime: "N/A",
                        memoryUsage: "N/A"
                    });
                }
            };

            if (!input) {
                var startTime = performance.now();
                compiler.compileCPP(envData, code, (data) => {
                    var endTime = performance.now();
                    data.executionTime = (endTime - startTime).toFixed(2); // Execution time in milliseconds
                    onComplete(data);
                });
            } else {
                var startTime = performance.now();
                compiler.compileCPPWithInput(envData, code, input, (data) => {
                    var endTime = performance.now();
                    data.executionTime = (endTime - startTime).toFixed(2); // Execution time in milliseconds
                    onComplete(data);
                });
            }
        }
    } catch (err) {
        console.log("error", err);
        res.send({ output: null, error: "Server error: " + err.message });
    }
});

app.listen(8000, function () {
    console.log("Server running on port 8000");
});
