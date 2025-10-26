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
