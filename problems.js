document.addEventListener("DOMContentLoaded", function() {
    const problemTableBody = document.getElementById("problemTableBody");

    // Fetch problems (replace this with a real server fetch in production)
    const problems = JSON.parse(localStorage.getItem("problems")) || [];

    problems.forEach((problem, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="problem.html?index=${index}">${problem.title}</a></td>
            <td>${problem.description}</td>
            <td>${problem.difficulty}</td>
        `;
        problemTableBody.appendChild(row);
    });
});
