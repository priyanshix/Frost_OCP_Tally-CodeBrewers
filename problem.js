document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const problemIndex = urlParams.get('index');

    // Fetch problems from storage
    const problems = JSON.parse(localStorage.getItem("problems")) || [];
    const problem = problems[problemIndex];

    if (problem) {
        document.getElementById("problemTitle").innerText = problem.title;
        document.getElementById("problemDescription").innerText = problem.description;
        document.getElementById("problemConstraints").innerText = problem.constraints;
    }

    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        mode: 'text/x-c++src',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true
    });

    document.getElementById("run").addEventListener("click", function() {
        const code = editor.getValue();
        const testCases = problem.testCases;

        // Send code and test cases to the server for execution
        fetch("http://localhost:8000/compile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, input: testCases.input, lang: "C++" })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("output").value = data.output;
        })
        .catch(err => console.error(err));
    });
});
