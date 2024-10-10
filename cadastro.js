'use strict';
 
// Validação de Email
const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

// Validação de CPF
const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
};

// Mensagem de Erro
const mostrarErro = (campo, mensagem) => {
    alert(mensagem);
    campo.focus();
};

// Validação do Formulário de Dados Pessoais
const validarDadosPessoais = () => {
    const email = document.getElementById('inputEmail4').value;
    const cpf = document.getElementById('CPF').value;
    if (!validarEmail(email)) {
        mostrarErro(document.getElementById('inputEmail4'), 'Por favor, informe o E-mail!');
        return false;
    }
    if (!validarCPF(cpf)) {
        mostrarErro(document.getElementById('CPF'), 'CPF inválido!');
        return false;
    }
    return true;
};