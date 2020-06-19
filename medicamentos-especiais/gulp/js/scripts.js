//
var getIdentificacao = document.getElementById('identificacao');
var inputPaciente = document.querySelector('.form-paciente');

//
getIdentificacao.addEventListener('change', function (e) {
    if(getIdentificacao.value != 'Paciente'){
        inputPaciente.classList.add('form-paciente-show');
    } else {
        inputPaciente.classList.remove('form-paciente-show');
    }
})