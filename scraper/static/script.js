function fetchBankStatus() {
    let bank = document.getElementById("bankDropdown").value;

    if (!bank) return;

    fetch(`/get-bank-status?bank=${encodeURIComponent(bank)}`)
        .then(res => res.json())
        .then(data => {

            let card = document.getElementById("statusCard");
            let bankName = document.getElementById("bankName");
            let statusText = document.getElementById("upiStatus");
            let timestamp = document.getElementById("timestamp");
            let staleWarning = document.getElementById("staleWarning");

            card.style.display = "block";

            if (data.error) {
                statusText.innerHTML = "No Data Found";
                return;
            }

            bankName.innerText = bank + " UPI Server Status";

            let status = data.status;

            if (status === "UP") {
                statusText.innerHTML = "🟢 Online";
                statusText.className = "status up";
            }
            else if (status === "DOWN") {
                statusText.innerHTML = "🔴 Down";
                statusText.className = "status down";
            }
            else {
                statusText.innerHTML = "🟠 Fluctuating";
                statusText.className = "status fluctuating";
            }

            timestamp.innerHTML = "Last updated: " + data.timestamp;

            // Stale warning
            if (data.stale) {
                staleWarning.innerHTML = "⚠️ Data is outdated";
            } else {
                staleWarning.innerHTML = "";
            }

        })
        .catch(err => console.log(err));
}