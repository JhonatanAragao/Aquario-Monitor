document.addEventListener('DOMContentLoaded', function() {
    function mostrarpopup(mensagem) {
        var popup = document.getElementById('poppup-notificacao');
        var mensagem_texto = document.getElementById('mensagem-notificacao');

        mensagem_texto.textContent = mensagem;
        popup.style.display = 'block';


        //ocultar pop-up
        setTimeout(function(){
            popup.style.display = 'none';
        }, 5000);
    }


    //exemplo
    mostrarpopup('Alerta: pH fora do Intervalo')
})