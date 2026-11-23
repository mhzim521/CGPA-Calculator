function addSubject() {
    const subjects = document.getElementById("subjects");

    const row = document.createElement("div");

    row.className = "subject-row";

    row.innerHTML = `
        <input
            type="text"
            class="subject"
            placeholder="Subject Name"
        >

        <input
            type="number"
            class="credit"
            placeholder="Credit"
            min="0.5"
            step="0.5"
        >

        <input
            type="number"
            class="gpa"
            placeholder="GPA"
            min="0"
            max="4"
            step="0.01"
        >

        <button
            class="remove-btn"
            onclick="removeSubject(this)"
        >
            ×
        </button>
    `;

    subjects.appendChild(row);
}

function removeSubject(button) {
    const subjects = document.getElementById("subjects");
    const rows = subjects.querySelectorAll(".subject-row");

    if (rows.length <= 1) {
        showMessage(
            "At least one subject is required.",
            "error"
        );
        return;
    }

    button.parentElement.remove();
    clearMessage();
}

function calculateCGPA() {
    const subjectInputs =
        document.querySelectorAll(".subject");

    const creditInputs =
        document.querySelectorAll(".credit");

    const gpaInputs =
        document.querySelectorAll(".gpa");

    let totalCredits = 0;
    let totalPoints = 0;

    clearMessage();

    for (let i = 0; i < subjectInputs.length; i++) {
        const subjectName =
            subjectInputs[i].value.trim();

        const credit =
            parseFloat(creditInputs[i].value);

        const gpa =
            parseFloat(gpaInputs[i].value);

        if (subjectName === "") {
            showMessage(
                `Please enter subject name for Subject ${i + 1}.`,
                "error"
            );

            subjectInputs[i].focus();
            return;
        }

        if (isNaN(credit) || credit <= 0) {
            showMessage(
                `Please enter a valid credit for ${subjectName}.`,
                "error"
            );

            creditInputs[i].focus();
            return;
        }

        if (isNaN(gpa) || gpa < 0 || gpa > 4) {
            showMessage(
                `GPA for ${subjectName} must be between 0.00 and 4.00.`,
                "error"
            );

            gpaInputs[i].focus();
            return;
        }

        totalCredits += credit;
        totalPoints += credit * gpa;
    }

    if (totalCredits === 0) {
        showMessage(
            "Please enter valid subject information.",
            "error"
        );

        return;
    }

    const cgpa = totalPoints / totalCredits;

    document.getElementById("totalCredits").innerText =
        totalCredits.toFixed(2);

    document.getElementById("totalPoints").innerText =
        totalPoints.toFixed(2);

    document.getElementById("cgpaResult").innerText =
        cgpa.toFixed(2);

    showMessage(
        "CGPA calculated successfully!",
        "success"
    );
}

function resetCalculator() {
    const subjects =
        document.getElementById("subjects");

    subjects.innerHTML = `
        <div class="subject-row">

            <input
                type="text"
                class="subject"
                placeholder="Subject Name"
            >

            <input
                type="number"
                class="credit"
                placeholder="Credit"
                min="0.5"
                step="0.5"
            >

            <input
                type="number"
                class="gpa"
                placeholder="GPA"
                min="0"
                max="4"
                step="0.01"
            >

            <button
                class="remove-btn"
                onclick="removeSubject(this)"
            >
                ×
            </button>

        </div>
    `;

    document.getElementById("totalCredits").innerText =
        "0.00";

    document.getElementById("totalPoints").innerText =
        "0.00";

    document.getElementById("cgpaResult").innerText =
        "0.00";

    clearMessage();
}

function showMessage(message, type) {
    const messageElement =
        document.getElementById("message");

    messageElement.innerText = message;

    if (type === "error") {
        messageElement.style.color = "#ef4444";
    } else {
        messageElement.style.color = "#16a34a";
    }
}

function clearMessage() {
    document.getElementById("message").innerText = "";
}