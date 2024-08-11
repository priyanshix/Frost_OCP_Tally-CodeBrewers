document.getElementById("uploadProblemForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newProblem = {
        title: document.getElementById("problemTitle").value,
        description: document.getElementById("problemDescription").value,
        constraints: document.getElementById("problemConstraints").value,
        testCases: JSON.parse(document.getElementById("testCases").value),
        difficulty: "Easy" // You can add a dropdown for this in the HTML
    };

    const problems = JSON.parse(localStorage.getItem("problems")) || [];
    problems.push(newProblem);
    localStorage.setItem("problems", JSON.stringify(problems));

    // Redirect to the problem list
    window.location.href = "index2.html";
});
