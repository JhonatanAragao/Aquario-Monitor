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
        atualizarTemperaturaMinMax(temperatura);
    });
}

let temp_min = null;
let temp_max = null;

temp_min = document.getElementById("temperatura-min");
temp_max = document.getElementById("temperatura-max");

async function salvarTemperatura(tempMin, tempMax) {
    console.log(`Enviando: temp_min=${temp_min}, temp_max=${temp_max}`);

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
            throw new Error('A rede não tá boa');
        }

        const result = await response.text();
        console.log('Temperatura salva:', result);

    } catch (error) {
        console.error('Erro ao salvar a temperatura: ', error);
    }
}

// Função para recuperar os dados de temperatura
async function recuperarTemperatura() {
    try {
        const response = await fetch('recuperar_temperatura.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById("temperatura-min").innerText = `Mínima: ${data.temp_min} °C`;
        document.getElementById("temperatura-max").innerText = `Máxima: ${data.temp_max} °C`;
    } catch (error) {
        console.error('Erro ao recuperar a temperatura:', error);
    }
}



//atualiza a temperatura a cada 2 segundos
setInterval(atualizaTemp, 2000);

//atualiza a temperatura pela primeira vez
atualizaTemp();
