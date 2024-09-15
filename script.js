function atualizarHora() {
    const agora = new Date();
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const horaFormatada = agora.toLocaleString('pt-BR', opcoes);

    document.getElementById('data-hora').textContent = horaFormatada;
}

setInterval(atualizarHora, 1000);  // Atualiza a cada segundo
atualizarHora();  // Chama ao carregar a página



//aqui está o código do sensor de temperatura
async function obterTemperatura() {
    try {
        const response = await fetch('http://192.168.18.164/temperatura');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.temperatura;
    } catch (error) {
        console.error('Erro ao obter a temperatura do sensor: ', error);
        return 'Erro';
    }
}

function atualizaTemp() {
    obterTemperatura().then(temperatura => {
        document.getElementById("temperatura-atual").innerText = `${temperatura} °C`;
    });
}

//atualiza a temperatura a cada 2 segundos
setInterval(atualizaTemp, 2000);

//atualiza a temperatura pela primeira vez
atualizaTemp();


// let temp_min, temp_max;

// temp_min = document.getElementById("temperatura-min");
// temp_max = document.getElementById("temperatura-max");

// if (valor da temperatura atual < temp_min) {
//     temp_min = temperatura atual
// } else if (valor da temperatura atual > temp_max) {
//     temp_max = temperatura atual
// }


async function salvarTemperatura(tempMin, tempMax) {
    try {
        const response = await fetch('salvar_temperatura.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'temp_min': tempMin,
                'temp_max': tempMax,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.text();
        console.log('Temperatura salva:', result);
    } catch (error) {
        console.error('Erro ao salvar a temperatura: ', error);
    }
}