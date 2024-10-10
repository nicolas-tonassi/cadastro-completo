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

// Funções para o Consumo da API ViaCEP
const limparFormularioEndereco = () => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
};
 
const preencherFormularioEndereco = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
};
 
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);
 
const pesquisarCep = async () => {
    const cep = document.getElementById('CEP').value.replace(/\D/g, '');
    limparFormularioEndereco();
    if (cepValido(cep)) {
const url = `https://viacep.com.br/ws/${cep}/json/`;
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.erro) {
            alert('CEP não encontrado!');
        } else {
            preencherFormularioEndereco(endereco);
        }
    } else {
        alert('CEP inválido!');
    }
};

// Evento para buscar o CEP automaticamente ao perder o foco do campo
document.getElementById('CEP').addEventListener('focusout', pesquisarCep);