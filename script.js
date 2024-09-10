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
