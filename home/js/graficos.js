// Garante que o DOM já carregou
window.addEventListener('DOMContentLoaded', () => {

    // ===== Gráfico de Pizza =====
    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
    const graficoPizza = new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: ['Matriculados', 'Ativos', 'Frequentes'],
            datasets: [{
                data: [456, 360, 282],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
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
    const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
    const graficoBarras = new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['Matriculados', 'Ativos', 'Frequentes'],
            datasets: [{
                label: 'Alunos',
                data: [456, 360, 282],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // ===== Gráfico de Linha (ex: evolução mensal) =====
    const ctxLinha = document.getElementById('graficoLinha')?.getContext('2d'); 
    // Use ? para evitar erro se não tiver canvas

    if(ctxLinha){
        const graficoLinha = new Chart(ctxLinha, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Alunos Ativos',
                    data: [320, 340, 360, 370, 355, 360],
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

});
