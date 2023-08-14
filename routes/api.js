const express = require("express");
const router = express.Router();
let defaultDate = makeDateByNumber(15);


function findDateToSpeech(data) {
    const commandPattern = /(um|dois|três|quatro|cinco|seis|sete|oito|nove|dez|onze|doze|treze|catorze|quinze|dezesseis|dezessete|dezoito|dezenove|vinte|vinte e um|vinte e dois|vinte e três|vinte e quatro|vinte e cinco|vinte e seis|vinte e sete|vinte e oito|vinte e nove|trinta|trinta e um|\d+)\s*(dia|dias)/;
    const match = data.match(commandPattern);
    if (match) {
        const quantityText = match[1];
        const number = describerTextToNumber(quantityText);
        const days = match[2] === 'dia' ? number : number * 2; // Assuming "dias" is plural
        return makeDateByNumber(days)
    }else{
        return defaultDate
    }
}
function makeDateByNumber(number){
    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    return targetDate.setDate(currentDate.getDate() - number);
}
function describerTextToNumber(textToNumber){
    const numbers = {
        um: 1, dois: 2, três: 3, quatro: 4, cinco: 5, seis: 6, sete: 7,
        oito: 8, nove: 9, dez: 10, onze: 11, doze: 12, treze: 13, catorze: 14,
        quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18, dezenove: 19,
        vinte: 20, 'vinte e um': 21, 'vinte e dois': 22, 'vinte e três': 23,
        'vinte e quatro': 24, 'vinte e cinco': 25, 'vinte e seis': 26,
        'vinte e sete': 27, 'vinte e oito': 28, 'vinte e nove': 29,
        trinta: 30, 'trinta e um': 31
    };
    return numbers[textToNumber.toLowerCase()] || parseInt(textToNumber);
}
function parseDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    console.log("day", day)

    return `${year}-${month}-${day}`;
}
function convertRecord(data) {
    const findNumber = findDateToSpeech(data);

    if(findNumber){
        return findNumber
    }
    return defaultDate
}

function transactionFind(findText) {
    const pattern = /^[0-9]$/;
    let termFindOut = '';
    if(!pattern.test(findText)){
        termFindOut = makeDateByNumber(findText)
    }else{
        termFindOut = findText
    }

   /* console.log("transactionFind", termFindOut)*/

    const transaction = [
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-12",
            "descricao": "PIX Enviado para Neto",
            "valor": 50.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-11",
            "descricao": "PIX Recebido de Serra",
            "valor": 950.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-11",
            "descricao": "PIX Recebido de Hugão",
            "valor": 8000.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-10",
            "descricao": "Compra em Moto",
            "valor": -8000.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-09",
            "descricao": "Compra em Carro",
            "valor": -18000.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-08",
            "descricao": "Compra em Televisao",
            "valor": -1800.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-08",
            "descricao": "Compra em supermercado",
            "valor": -120.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-07",
            "descricao": "Depósito de salário",
            "valor": 2500.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-07",
            "descricao": "Pagamento de conta de luz",
            "valor": -80.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-bill-transfer\"></i>",
            "data": "2023-08-06",
            "descricao": "Transferência para amigo",
            "valor": -50.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-05",
            "descricao": "Recebimento de pagamento de serviço",
            "valor": 150.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-check-dollar\"></i>",
            "data": "2023-08-05",
            "descricao": "Compra online",
            "valor": -200.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-04",
            "descricao": "PIX Recebido de Neto",
            "valor": 150.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-03",
            "descricao": "PIX Recebido de Hugão",
            "valor": 1500.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-bill-transfer\"></i>",
            "data": "2023-08-03",
            "descricao": "TED Recebido Salário do Itáu",
            "valor": 10000.0
        },
        {
            "icon": "<i class=\"fa-solid fa-money-bill-transfer\"></i>",
            "data": "2023-08-02",
            "descricao": "TED Recebido Bonus Itáu",
            "valor": 200000.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-02",
            "descricao": "PIX Enviado para Diego",
            "valor": 20.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-01",
            "descricao": "PIX Enviado para Hugo",
            "valor": 10.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-08-01",
            "descricao": "PIX Enviado para Ana Palante",
            "valor": 15.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-07-31",
            "descricao": "PIX Enviado para Ana Palante",
            "valor": 11.0
        },
        {
            "icon": "<i class=\"fa-brands fa-pix\"></i>",
            "data": "2023-07-30",
            "descricao": "PIX Recebido de Ana Palante",
            "valor": 10.0
        },
        {
            "icon": "<i class=\"fa-brands fa-cc-visa\"></i>",
            "data": "2023-07-29",
            "descricao": "Visa Compra Realizada Padaria",
            "valor": -10.0
        },
        {
            "icon": "<i class=\"fa-brands fa-cc-visa\"></i>",
            "data": "2023-07-28",
            "descricao": "Visa Compra Realizada LATAM",
            "valor": -1000.0
        }
    ];
    let resultTransaction = [];
    transaction.forEach(entry =>{
        let tempResultTransaction = {};

        const entryDate = new Date(entry.data);
        const findDate  = new Date(termFindOut);
        /*console.log("entryDate ", entryDate)
        console.log("findDate ", findDate)*/

        if (entryDate >=  findDate) {
            /*console.log("dentro da condição")*/
            tempResultTransaction.icon      = entry.icon;
            tempResultTransaction.data      = entry.data;
            tempResultTransaction.descricao = entry.descricao;
            tempResultTransaction.valor     = entry.valor
            resultTransaction.push(tempResultTransaction);
        }
    });

    return resultTransaction;
}



router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.post("/recording",  (req, res) => {
    const textSpeech = req.body.name;
    const response = convertRecord(textSpeech)
    res.send({ term: response })
});

router.get("/transactions", (req, res) => {
    const termSpeech = req.query.term;
    const response = transactionFind(termSpeech)
    res.send({ transactions: response })
});



module.exports = router;
