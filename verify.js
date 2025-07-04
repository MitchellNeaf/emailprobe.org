async function checkEmail() {
    const email = document.getElementById("email").value.trim();
    const resultDiv = document.getElementById("result");

    // Show spinner immediately
    resultDiv.innerHTML = `<span class="spinner"></span> Checking...`;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("api_key", "3b4d2d09-7484-46c7-8153-8e13279c06eb");

    const minDelay = ms => new Promise(res => setTimeout(res, ms));
    const startTime = Date.now();

    try {
        const [res] = await Promise.all([
            fetch("https://fastemailcheck.com/api/verify_single", {
                method: "POST",
                body: formData
            }),
            minDelay(1500) // 🕒 Force wait at least 1.5 seconds
        ]);

        const data = await res.json();

        if (res.ok) {
            resultDiv.innerHTML = `
                ✅ <strong>Status:</strong> ${data.status}<br>
                🔢 <strong>Confidence Score:</strong> ${data.confidence_score}<br>
                💬 <strong>Reason:</strong> ${data.reason}
            `;
        } else {
            resultDiv.textContent = `❌ Error: ${data.detail || "Unknown error"}`;
        }
    } catch (err) {
        resultDiv.textContent = "❌ Network error. Please try again.";
    }
}
