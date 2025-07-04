async function checkEmail() {
    const email = document.getElementById("email").value.trim();
    const resultDiv = document.getElementById("result");

    // Show spinner
    resultDiv.innerHTML = `<span class="spinner"></span> Checking...`;

    // Prepare form data (no longer includes api_key here)
    const formData = new FormData();
    formData.append("email", email);

    const minDelay = ms => new Promise(res => setTimeout(res, ms));

    try {
        const [res] = await Promise.all([
            fetch("https://fastemailcheck.com/api/verify_single", {
                method: "POST",
                body: formData,
                headers: {
                    "X-API-Key": "3b4d2d09-7484-46c7-8153-8e13279c06eb"
                }
            }),
            minDelay(1500)
        ]);

        const data = await res.json();

        if (res.ok) {
            resultDiv.innerHTML = `
                ✅ <strong>Status:</strong> ${data.status}<br>
                🔢 <strong>Confidence Score:</strong> ${data.confidence_score}<br>
                💬 <strong>Reason:</strong> ${data.reason}
            `;
        } else {
            resultDiv.innerHTML = `❌ Error: ${data.detail || "Something went wrong."}`;
        }
    } catch (err) {
        resultDiv.innerHTML = "❌ Network error. Please try again.";
    }
}
