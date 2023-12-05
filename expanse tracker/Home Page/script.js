const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");
let transactions = [];

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("light");
    updateModeText();
});

function getTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(deskripsi, jumlah, tanggal, type) {
    const newTransaction = {
        id: transactions.length + 1,
        deskripsi,
        jumlah,
        tanggal,
        type
    };

    transactions.push(newTransaction);

    saveTransactions();

    renderList();
}

function renderList() {
    transactions = getTransactions();

    // homepage
    if (body.classList.contains("home-page")) {
        const list = document.getElementById("listtransaksi");
        const status = document.getElementById("status");

        list.innerHTML = '';

        if (transactions.length === 0) {
            status.textContent = "Tidak ada transaksi.";
            return;
        }

        //3 transaksi
        const recentTransactions = transactions.slice(-3);
        recentTransactions.forEach(({ deskripsi, tanggal, jumlah }) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="deskripsi">
                    <h4>${deskripsi}</h4>
                    <p>${new Date(tanggal).toLocaleDateString()}</p>
                </div>   
                <div class="jumlah">
                    <span>${jumlah}</span>
                </div>
            `;
            list.appendChild(li);
        });

        status.textContent = '';
    }

    // Di History Page
    else if (body.classList.contains("history-page")) {
        const list = document.getElementById("listtransaksi");
        const status = document.getElementById("status");

        list.innerHTML = '';

        if (transactions.length === 0) {
            status.textContent = "Tidak ada transaksi.";
            return;
        }

        // Menampilkan semua transaksi di history page
        transactions.forEach(({ deskripsi, tanggal, jumlah }) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="deskripsi">
                    <h4>${deskripsi}</h4>
                    <p>${new Date(tanggal).toLocaleDateString()}</p>
                </div>   
                <div class="jumlah">
                    <span>${jumlah}</span>
                </div>
            `;
            list.appendChild(li);
        });

        status.textContent = '';
    }
}

function updateModeText() {
    modeText.innerText = body.classList.contains("light") ? "Dark Mode" : "Light Mode";
}

document.addEventListener("DOMContentLoaded", function() {
    transactions = getTransactions();
    renderList();
});

document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const deskripsi = document.getElementsByName("deskripsi")[0].value;
    const jumlah = parseFloat(document.getElementsByName("jumlah")[0].value);
    const tanggal = document.getElementsByName("tanggal")[0].value;

    addTransaction(deskripsi, jumlah, tanggal, "expense");

    this.reset();
});
