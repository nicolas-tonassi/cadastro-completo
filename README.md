# Formulário de cadastro completo
 
## Introdução:
 
Este projeto consiste na criação de um sistema de cadastro de usuários, com foco na validação de dados pessoais e de endereço, utilizando HTML, CSS, Bootstrap e JavaScript. O principal objetivo é proporcionar uma interface funcional para que os usuários insiram suas informações corretamente, assegurando a validação de campos como e-mail, CPF e CEP. O sistema também utiliza a API ViaCEP para buscar dados de endereço automaticamente a partir do CEP informado.
 
Este projeto é uma evolução de um trabalho anterior desenvolvido em sala de auzla, como o cadastro de E-commerce realizado no 1º ano do ensino médio (terceiro trimestre), onde foram trabalhados os mesmos dados pessoais e de endereço, porém sem as validações implementadas em JavaScript. [Link do projeto](https://github.com/nicolas-tonassi/form-CadEcommerce)
 
<img src= "cad-completo.png">
 
## Funcionalidades:
 
- Limpar Formulário de Endereço: Limpa os campos de endereço quando um novo CEP é inserido
 
const limparFormularioEndereco = () => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
};
 
Explicação: Esta função limpa os campos de endereço do formulário, garantindo que os campos estejam vazios antes de preencher um novo endereço com base no CEP.
<hr>
 
- Preencher Formulário de Endereço: Preenche automaticamente os campos de endereço com os dados obtidos da API ViaCEP.
 
const preencherFormularioEndereco = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
};
 
Explicação: Esta função preenche os campos de endereço no formulário (logradouro, bairro, cidade, estado) com os dados recebidos da API ViaCEP.
<hr>
 
- Verificar Validade do CEP Verifica se o CEP informado possui 8 dígitos numéricos.
 
const cepValido = (cep) => /^[0-9]{8}$/.test(cep);
 
Explicação: A função verifica se o CEP informado possui exatamente 8 números. Se estiver no formato correto, retorna "true", caso contrário, "false".
<hr>
 
- Pesquisar CEP (API ViaCEP): Faz uma requisição à API ViaCEP para buscar os dados do endereço com base no CEP informado.
 
const pesquisarCep = async () => {
    const cep = document.getElementById('CEP').value.replace(/\D/g, '');
    limparFormularioEndereco();
    if (cepValido(cep)) {
        const url = https://viacep.com.br/ws/${cep}/json/;
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
 
Explicação: Quando o usuário insere um CEP válido, a função faz uma requisição à API ViaCEP. Se o CEP for encontrado, os dados de endereço são automaticamente preenchidos no formulário; caso contrário, uma mensagem de erro é exibida.
<hr>
 
- Eventos de Interação: Adiciona eventos para buscar o CEP automaticamente e validar o formulário no envio.
 
document.getElementById('CEP').addEventListener('focusout', pesquisarCep);
document.getElementById('formCadastro').addEventListener('submit', (event) => {
    if (!validarDadosPessoais()) {
        event.preventDefault();
    }
});
 
Explicação: O primeiro evento faz a pesquisa do CEP automaticamente quando o campo CEP perde o foco. O segundo evento executa a validação completa dos dados pessoais ao submeter o formulário, impedindo o envio caso haja erros.
 
 
## Fontes consultadas:
- [ViaCep](https://viacep.com.br/) e [ViaCep Json](https://viacep.com.br/ws/86031150/json/):
- [BootStrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
 
## Tecnologias utilizadas:
- Visual Studio Code
 - Github
 - Git
 - HTML5
 - CSS3
 - Javascript
 - [BootStrap](https://getbootstrap.com/)
 - [ViaCep](https://viacep.com.br/)
 
 ## Autores:
- [Nicolas Tonassi](https://github.com/nicolas-tonassi)
- [Murilo Tonassi](https://github.com/murilo-tonassi)
- [Pamela Souza](https://github.com/PamelaSouzaSilva)
- [Naillim Novaski](https://github.com/naillimnovaski)