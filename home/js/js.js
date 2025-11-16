const addAluno = document.querySelector('.addAluno')
const excluirAluno = document.querySelector('.excluirAluno')
const adicionarEmMassa = document.querySelector('.adicionarEmMassa')
const modalAdicionarAluno = document.querySelector('.modalAdicionarAluno')
const modalAdicionarEmMassa = document.querySelector('.modalAdicionarEmMassa')
const modalExcluirAluno = document.querySelector('.modalExcluirAluno')
const telaModal = document.querySelector('.telaModal')
const btnCancelarAluno = document.querySelector('#btnCancelarAluno')
const btnCancelarMassa = document.querySelector('#btnCancelarMassa')
const btnCancelarExcuir = document.querySelector('#btnCancelarExcluir')

addAluno.addEventListener('click', function(){
    telaModal.style.display = 'flex'
    modalAdicionarAluno.style.display = 'block'
})
btnCancelarAluno.addEventListener('click', function(){
    telaModal.style.display = 'none'
    modalAdicionarAluno.style.display = 'none'
})
excluirAluno.addEventListener('click', function(){
    telaModal.style.display = 'flex'
    modalExcluirAluno.style.display = 'block'
})
btnCancelarExcuir.addEventListener('click', function(){
    telaModal.style.display = 'none'
    modalExcluirAluno.style.display = 'none'
})
adicionarEmMassa.addEventListener('click', function(){
    telaModal.style.display = 'flex'
    modalAdicionarEmMassa.style.display = 'block'
})
btnCancelarMassa.addEventListener('click', function(){
    telaModal.style.display = 'none'
    modalAdicionarEmMassa.style.display = 'none'
})


const formAddAluno = document.querySelector('.formAddAluno')

formAddAluno.addEventListener('submit', function(e) {
    e.preventDefault()

    const dados = {
        id: Date.now(),
        nome: document.querySelector('#nomeAluno').value,
        nascimento: document.querySelector('#NascimentoAluno').value,
        rg: document.querySelector('#RG').value,
        cpf: document.querySelector('#cpfAluno').value,
        endereco: document.querySelector('#enderecoAluno').value,
        numero: document.querySelector('#numeroEndereco').value,
        bairro: document.querySelector('#bairroAluno').value,
        municipio: document.querySelector('#municipio').value,
        escola: document.querySelector('#escolaAluno').value,
        serie: document.querySelector('#serieAluno').value,
        turno: document.querySelector('#turnoAluno').value,
        contato1: document.querySelector('#contato1').value,
        contato2: document.querySelector('#contato2').value,
        responsavel: document.querySelector('#responsavelAluno').value,
        anaminese: document.querySelector('#anaminese').checked
    };

    console.log("Aluno adicionado: ", dados)

    let alunos = JSON.parse(localStorage.getItem('alunos')) || []

    alunos.push(dados)

    localStorage.setItem('alunos', JSON.stringify(alunos))
    
    console.log("Lista completa de alunos agora: ", alunos)
})
