console.log('lista.js carregada')
const formAddAluno = document.querySelector('.formAddAluno')

const campoData = document.querySelector('#NascimentoAluno')

// FORMARTANDO O FORMATO DATA PARA O BRASIL
campoData.addEventListener('input', () => {
    let v = campoData.value.replace(/\D/g, ""); // só números

    if (v.length >= 3 && v.length <= 4) {
        v = v.replace(/(\d{2})(\d+)/, "$1/$2");
    }
    else if (v.length > 4) {
        v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    }

    campoData.value = v.substring(0, 10); // limita a dd/mm/aaaa
});

// RECEBENDO OS DADOS DO FORM
if(formAddAluno && !formAddAluno.dataset.listernerAdded){

    formAddAluno.dataset.listernerAdded = "true"

    formAddAluno.addEventListener('submit', function(e) {
        e.preventDefault()

        const dados = {
            id: Date.now(),
            nome: document.querySelector('#nomeAluno').value,
            nascimento: converterParaISO(document.querySelector('#NascimentoAluno').value),
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

        telaModal.style.display = 'none'
        modalAdicionarAluno.style.display = 'none'
        formAddAluno.reset() 
        
        console.log("Lista completa de alunos agora: ", alunos)
    })
}

// CONVERTENDO O NASCIMENTO
function converterParaISO(dataBr){
    let [dia, mes, ano] = dataBr.split('/')
    return `${ano}-${mes}-${dia}`
}

// MOSTRANDO LISTA NA TELA
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.listaAlunos');
    if (!container) return; // <-- impede erro no home.html

    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    alunos.forEach(aluno => {
        const bloco = criarAlunoHTML(aluno);
        container.appendChild(bloco);
    });
    // FILTRO PELO PRIMEIRO NOME
    const inputPesquisa = document.querySelector('#pesquisa');
    if(inputPesquisa) {
        inputPesquisa.addEventListener('input', () => {
            const termo = inputPesquisa.value.trim().toLowerCase();
            const alunosDivs = document.querySelectorAll('.alunoLista');
            alunosDivs.forEach(alunoDiv => {
                const nomeCompleto = alunoDiv.querySelector('i').textContent;
                const primeiroNome = nomeCompleto.split(' ')[0].toLowerCase();
                alunoDiv.style.display = primeiroNome.includes(termo) ? '' : 'none';
            });
        });
    }

    // FILTRO DE IDADE
    let ordenarCrescente = true; // alterna entre crescente e decrescente

    const spanIdade = document.querySelector('.filtroIdade');
    spanIdade.style.cursor = 'pointer';

    spanIdade.addEventListener('click', () => {

        const cima = document.querySelector('#cima')
        const baixo = document.querySelector('#baixo')

        if(ordenarCrescente){
            cima.style.display = 'none'
            baixo.style.display = 'inline-block'
        }else{
            baixo.style.display = 'none'
            cima.style.display = 'inline-block'
        }

        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

        alunos.sort((a, b) => {
            const idadeA = calcularIdade(a.nascimento);
            const idadeB = calcularIdade(b.nascimento);

            return ordenarCrescente ? idadeA - idadeB : idadeB - idadeA;
        });

        ordenarCrescente = !ordenarCrescente;

        const container = document.querySelector('.listaAlunos');

        // remove alunos atuais
        document.querySelectorAll('.alunoLista').forEach(div => div.remove());

        // recria com a ordem nova
        alunos.forEach(a => container.appendChild(criarAlunoHTML(a)));
    });
});

// CRIANDO CADA DIV DE ALUNO PARA FAZER A LISTA
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
    // BOTÃO VER
    div.querySelector('.ver').addEventListener('click', function() {
    abrirModalVerAluno(aluno)
    })
    // BOTÃO EXCLUIR
    div.querySelector('.excluir').addEventListener('click', function(){
        const res = window.confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)
        if (res) excluirAlunoLista(aluno.id, div)
    })

    return div
}

// FUNÇÃO DE EXCLUIR ALUNO
function excluirAlunoLista(id, elementoHTML){
    let alunos = JSON.parse(localStorage.getItem('alunos')) || []

    alunos = alunos.filter(a => a.id !== id)

    localStorage.setItem('alunos', JSON.stringify(alunos))

    elementoHTML.remove()
}

// CALCULAR IDADE
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

// ADICIONAR EM MASSA
const btnAdicionarMassa = document.querySelector('#btnAdicionarMassa');
const textareaMassa = document.querySelector('#textoArea');

if (btnAdicionarMassa && textareaMassa) {

    btnAdicionarMassa.addEventListener('click', function () {

        const texto = textareaMassa.value.trim();

        if (!texto) {
            alert("Cole pelo menos uma linha de dados.");
            return;
        }

        // Pega alunos já existentes
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

        // Cada linha vira um aluno
        const linhas = texto.split('\n');

        const novosAlunos = [];

        linhas.forEach(linha => {

            // separa por ; , ou tab
            const partes = linha.split(/[,;|\t]/).map(p => p.trim());

            // aqui você diz qual ordem está usando
            const dados = {
                id: Date.now() + Math.random(),
                nome: partes[0] || "",
                nascimento: partes[1] ? converterParaISO(partes[1]) : "",
                cpf: partes[2] || "",
                rg: partes[3] || "",
                endereco: partes[4] || "",
                numero: partes[5] || "",
                bairro: partes[6] || "",
                municipio: partes[7] || "",
                escola: partes[8] || "",
                serie: partes[9] || "",
                turno: partes[10] || "",
                contato1: partes[11] || "",
                contato2: partes[12] || "",
                responsavel: partes[13] || "",
                anaminese: false
            };

            novosAlunos.push(dados);
        });

        // salva no localStorage
        alunos.push(...novosAlunos);
        localStorage.setItem('alunos', JSON.stringify(alunos));

        // limpa e fecha modal
        textareaMassa.value = "";
        telaModal.style.display = "none";
        modalAdicionarEmMassa.style.display = "none";

        alert("Alunos adicionados com sucesso!");
    });
}

// MODAL DO BOTÃO VER DO ALUNO
const modalVerAluno = document.querySelector('.modalVerAluno');

function abrirModalVerAluno(aluno) {

    telaModal.style.display = 'block';
    modalVerAluno.style.display = 'block';

    document.querySelector('#ver_nome').textContent = aluno.nome;
    document.querySelector('#ver_nascimento').textContent = aluno.nascimento.split('-').reverse().join('/');
    document.querySelector('#ver_idade').textContent = calcularIdade(aluno.nascimento);
    document.querySelector('#ver_cpf').textContent = aluno.cpf;
    document.querySelector('#ver_rg').textContent = aluno.rg;
    document.querySelector('#ver_endereco').textContent = aluno.endereco + ", " + aluno.numero;
    document.querySelector('#ver_bairro').textContent = aluno.bairro;
    document.querySelector('#ver_municipio').textContent = aluno.municipio;
    document.querySelector('#ver_escola').textContent = aluno.escola;
    document.querySelector('#ver_serie').textContent = aluno.serie;
    document.querySelector('#ver_turno').textContent = aluno.turno;
    document.querySelector('#ver_contato1').textContent = aluno.contato1;
    document.querySelector('#ver_contato2').textContent = aluno.contato2;
    document.querySelector('#ver_responsavel').textContent = aluno.responsavel;
    document.querySelector('#ver_anamnese').textContent = aluno.anaminese ? "Sim" : "Não";
}

// BOTÃO PARA FECHAR O MODAL
const btnFecharVer = document.querySelector('#btnFecharVer');
if (btnFecharVer) {
    btnFecharVer.addEventListener('click', () => {
        modalVerAluno.style.display = 'none';
        telaModal.style.display = 'none';
    });
}

