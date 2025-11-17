const addAluno = document.querySelector('.addAluno')
const adicionarEmMassa = document.querySelector('.adicionarEmMassa')
const modalAdicionarAluno = document.querySelector('.modalAdicionarAluno')
const modalAdicionarEmMassa = document.querySelector('.modalAdicionarEmMassa')
const telaModal = document.querySelector('.telaModal')
const btnCancelarAluno = document.querySelector('#btnCancelarAluno')
const btnCancelarMassa = document.querySelector('#btnCancelarMassa')

// ABRINDO E FECHANDO O MODAL DE ADICIONAR E ADICIONAR EM MASSA
addAluno.addEventListener('click', function(){
    telaModal.style.display = 'flex'
    modalAdicionarAluno.style.display = 'block'
})
btnCancelarAluno.addEventListener('click', function(){
    telaModal.style.display = 'none'
    modalAdicionarAluno.style.display = 'none'
})
adicionarEmMassa.addEventListener('click', function(){
    telaModal.style.display = 'flex'
    modalAdicionarEmMassa.style.display = 'block'
})
btnCancelarMassa.addEventListener('click', function(){
    telaModal.style.display = 'none'
    modalAdicionarEmMassa.style.display = 'none'
})

// FUNÇÃO PARA ATUALIZAR OS NÚMEROS NA TELA, DE MATRICULADOS...
function atualizarNumeros() {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    const publicos = alunos.filter(a => a.escola === "Pública").length;
    const particulares = alunos.filter(a => a.escola === "Particular").length;

    if(!document.querySelector('#totalMatriculados')) return

    // Total de alunos
    document.querySelector("#totalMatriculados").textContent = alunos.length;

    // Aqui você escolhe outra métrica interessante
    document.querySelector("#totalParticulares").textContent = particulares; // Exemplo temporário
    document.querySelector("#totalPublicas").textContent = publicos; // Exemplo temporário
}

atualizarNumeros()