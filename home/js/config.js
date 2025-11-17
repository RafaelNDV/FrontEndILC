document.querySelector(".exportar").addEventListener("click", () => {
    // Pega todos os dados do localStorage
    const dados = {};
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        dados[chave] = JSON.parse(localStorage.getItem(chave));
    }

    // Transforma em arquivo
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Baixa o arquivo
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup-lucimario.json";
    link.click();

    URL.revokeObjectURL(url);
});

document.querySelector(".importar").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = () => {
        const file = input.files[0];

        // 1. Verificar se é JSON
        if (!file.name.endsWith(".json")) {
            alert("Arquivo inválido! Envie um arquivo .json.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            try {
                // 2. Tentar ler o JSON
                const dadosImportados = JSON.parse(reader.result);

                // 3. Verificar se formato é válido (tem que ser objeto)
                if (typeof dadosImportados !== "object" || Array.isArray(dadosImportados)) {
                    alert("Formato inválido! O JSON precisa ser um objeto.");
                    return;
                }

                // 4. Mesclar os dados (apenas adicionar)
                for (const chave in dadosImportados) {
                    const dadoNovo = dadosImportados[chave];
                    const dadoAntigo = JSON.parse(localStorage.getItem(chave));

                    if (dadoAntigo === null) {
                        // Se não existe, cria direto
                        localStorage.setItem(chave, JSON.stringify(dadoNovo));
                    } else {
                        // Se já existe, mesclar caso sejam arrays
                        if (Array.isArray(dadoAntigo) && Array.isArray(dadoNovo)) {
                            const merged = [...dadoAntigo, ...dadoNovo];
                            localStorage.setItem(chave, JSON.stringify(merged));
                        } else {
                            // Se não é array, substituir ou manter antigo
                            // Aqui você escolhe!
                            localStorage.setItem(chave, JSON.stringify(dadoNovo));
                        }
                    }
                }

                alert("Dados importados com sucesso!");

            } catch (e) {
                alert("Erro ao ler o arquivo! O JSON está mal formatado.");
            }
        };

        reader.readAsText(file);
    };

    input.click();
});
