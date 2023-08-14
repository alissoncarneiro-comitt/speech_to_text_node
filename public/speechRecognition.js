function SpeechRecognition(){
    const recognition = new webkitSpeechRecognition() || SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.onresult = async  event => {
        const spokenText =  event.results[0][0].transcript;
        searchInput.value = spokenText;
        let data = {name:spokenText};
        postRecording(data);
    };
    recognition.start();
}

document.addEventListener('DOMContentLoaded',  function(event) {
    const searchInput = document.getElementById('searchInput');
    const microphoneBtn = document.getElementById('microphoneBtn');

    microphoneBtn.addEventListener('click',  function () {
        recordingPopup.style.display = 'block';
        SpeechRecognition();

    });
});

document.addEventListener("DOMContentLoaded", function(event) {
    let days = 30;
    const recordingPopup = document.getElementById('recordingPopup');

    getTransactions(days);
});

function buildResult(resultTransactions){
    recordingPopup.style.display = 'none';

    const transactionTableBody = document.querySelector('#transcriptionTable tbody');
    transactionTableBody.innerHTML = '';
    resultTransactions.forEach(entry => {
        const row = document.createElement('tr');
        const dateIcon = document.createElement('td');
        const dateCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const valueCell = document.createElement('td');
        dateIcon.innerHTML = entry.icon;
        dateCell.textContent = entry.data;
        descriptionCell.textContent = entry.descricao;
        valueCell.textContent = entry.valor.toFixed(2);

        row.appendChild(dateIcon);
        row.appendChild(dateCell);
        row.appendChild(descriptionCell);
        row.appendChild(valueCell);
        transactionTableBody.appendChild(row);
    });
}

async function getTransactions(term){
        const response = await fetch("/transactions?" + new URLSearchParams({
            term: term
        }), {
            method: "GET"
        })
        const resultTransactions = await response.json();
        buildResult(resultTransactions.transactions)
}

async function postRecording(data) {
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    try {
        const response = await fetch("/recording", config)
        const resultTransactions = await response.json();
        buildResult(resultTransactions.transactions)
    } catch (error) {
        console.error("Error:", error);
    }
}