// Garante que o DOM já carregou
window.addEventListener('DOMContentLoaded', () => {

    // ===== PEGAR DADOS DO LOCALSTORAGE =====
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    // Contadores
    let publico = 0;
    let particular = 0;

    alunos.forEach(aluno => {
        if (aluno.escola === "Pública") publico++;
        else if (aluno.escola === "Particular") particular++;
    });

    // ===== Gráfico de Pizza =====
    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
    const graficoPizza = new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: ['Pública', 'Particular'],
            datasets: [{
                data: [publico, particular],
                backgroundColor: [
                    'rgba(122, 250, 175, 0.7)',
                    'rgba(20, 128, 38, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });


    // ===== Gráfico de Barras =====
    // ===== Gráfico de Barras: Distribuição de Idades =====

    // Vamos pegar apenas as datas de nascimento e transformá-las em idades
    let idades = alunos
        .map(aluno => calcularIdade(aluno.nascimento)) // sua função já existente
        .filter(idade => idade >= 5 && idade <= 16); // só idades válidas

    // Criar contador de idades (5 a 16)
    let contagemIdades = {};
    for (let i = 5; i <= 16; i++) contagemIdades[i] = 0;

    // Contar quantos alunos têm cada idade
    idades.forEach(idade => {
        contagemIdades[idade]++;
    });

    // Transformar em arrays para o gráfico
    let labelsIdades = Object.keys(contagemIdades);      // ['5','6','7', ... '16']
    let valoresIdades = Object.values(contagemIdades);   // [3, 5, 2, 0, ...]

    // Criar gráfico
    const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
    const graficoBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: labelsIdades,
            datasets: [{
                label: 'Quantidade de Alunos por Idade',
                data: valoresIdades,
                backgroundColor: '#54eb5ccc',
                borderColor: 'rgba(7, 7, 7, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 } // sobe de 1 em 1 (melhor para contar alunos)
                }
            }
        }
    });


    // ===== Gráfico de Linha (ex: evolução mensal) =====
    const ctxLinha = document.getElementById('graficoLinha')?.getContext('2d'); 

    if(ctxLinha) {
        const graficoLinha = new Chart(ctxLinha, {
            type: 'line',
            data: {
                labels: ['6 meses atrás', '5 meses atrás', '4 meses atrás', '3 meses atrás', '2 meses atrás', 'Último mês'],
                datasets: [{
                    label: 'Alunos Ativos',
                    data: [0, 0, 0, 0, 0, alunos.length], // último mês = total atual
                    fill: true,
                    backgroundColor: 'rgba(58, 231, 73, 0.2)',
                    borderColor: 'rgba(4, 110, 27, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: { 
                    legend: { position: 'bottom' } 
                },
                scales: { y: { beginAtZero: true } }
            }
        });
    }


});
