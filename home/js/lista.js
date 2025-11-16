document.addEventListener('DOMContentLoaded', function(){
    const container = document.querySelector('.listaAlunos')
    let alunos = JSON.parse(localStorage.getItem('alunos')) || []

    alunos.forEach(aluno =>{
        const bloco = criarAlunoHTML(aluno)
        container.appendChild(bloco)
    })
})

function criarAlunoHTML(aluno){
    const div = document.createElement('div')
    div.classList.add('alunoLista')

    div.dataset.id = aluno.id

    const idade = calcularIdade(aluno.nascimento)

    div.innerHTML = `
        <i>${aluno.nome}</i>
        <i>${idade || '-'}</i>
        <i>${aluno.cpf}</i>
        <i>${aluno.contato1}</i>
        <i class="btns">
            <button class="ver">Ver</button>
            <button class="editar">Editar</button>
            <button class="excluir">Excluir</button>
        </i>
    `

    div.querySelector('.excluir').addEventListener('click', function(){
        excluirAlunoLista(aluno.id, div)
    })

    return div
}

function excluirAlunoLista(id, elementoHTML){
    let alunos = JSON.parse(localStorage.getItem('alunos')) || []

    alunos = alunos.filter(a => a.id !== id)

    localStorage.setItem('alunos', JSON.stringify(alunos))

    elementoHTML.remove()
}

function calcularIdade(data){
    if(!data) return null
    const hoje = new Date()
    const nasc = new Date(data)
    let idade = hoje.getFullYear() - nasc.getFullYear()
    const m = hoje.getMonth() - nasc.getMonth()
    if(m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())){
        idade--
    }
    return idade
}
