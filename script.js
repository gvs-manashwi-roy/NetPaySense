function fetchStatus() {
    let bank = document.getElementById("bankDropdown").value;

    if (!bank) return;

    fetch(`/get-upi-status?bank=${encodeURIComponent(bank)}`)
        .then(res => res.json())
        .then(data => {

            let card = document.getElementById("statusCard");
            let bankName = document.getElementById("bankName");
            let statusText = document.getElementById("upiStatus");
            let staleWarning = document.getElementById("staleWarning");

            card.style.display = "block";
            staleWarning.innerHTML = "";

            if (data.error) {
                statusText.innerHTML = "No Data Found";
                return;
            }

            bankName.innerText = bank + " - UPI Status";

            if (data.status === "UP") {
                statusText.innerHTML = "✅ UPI is Online";
                statusText.className = "status up";
            } 
            else if (data.status === "DOWN") {
                statusText.innerHTML = "❌ UPI is Down";
                statusText.className = "status down";
            } 
            else {
                statusText.innerHTML = "⚠️ UPI is Fluctuating";
                statusText.className = "status fluctuating";
            }

            if (data.stale) {
                staleWarning.innerHTML = 
                    "⚠️ Data outdated (Last updated: " + data.timestamp + ")";
            }

        })
        .catch(err => console.log(err));
}