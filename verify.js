async function checkEmail() {
    const email = document.getElementById("email").value;
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Checking...";

    try {
        const res = await fetch("https://fastemailcheck.com/api/verify_single", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-API-Key": "YOUR_PUBLIC_API_KEY"
            },
            body: `email=${encodeURIComponent(email)}`
        });

        const data = await res.json();
        resultDiv.innerHTML = `
            <strong>Status:</strong> ${data.status}<br>
            <strong>Confidence Score:</strong> ${data.confidence_score}<br>
            <strong>Reason:</strong> ${data.reason}
        `;
    } catch (err) {
        resultDiv.textContent = "Error verifying email. Please try again.";
    }
}
