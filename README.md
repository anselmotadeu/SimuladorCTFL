# Simulador CTFL

O **Simulador CTFL** é uma aplicação web desenvolvida para ajudar candidatos a se prepararem para o exame oficial de certificação CTFL (Certified Tester Foundation Level). Ele permite que os usuários pratiquem respondendo perguntas de múltipla escolha, simulando o ambiente do exame com um temporizador, barra de progresso e feedback imediato sobre as respostas. O projeto foi construído com **HTML**, **CSS** (usando Tailwind CSS) e **JavaScript**, garantindo uma interface moderna, responsiva e acessível.

---

## ✨ Funcionalidades

- **Seleção de Exames:** Escolha entre três exames (A, B ou C) para praticar.
- **Temporizador:** Simula o tempo real do exame (60 minutos) com contagem regressiva visível.
- **Barra de Progresso:** Acompanhe o progresso com uma barra visual e contador de questões respondidas.
- **Feedback Imediato:** Receba feedback sobre cada resposta (correta ou incorreta) com a opção correta destacada.
- **Indicadores de Desempenho:** Veja o número de respostas corretas e incorretas em tempo real.
- **Modal de Resultados:** Ao final, visualize um resumo detalhado com percentual de acerto, aprovação/reprovação e revisão de todas as respostas.
- **Acessibilidade:** Suporte a navegação por teclado (Enter para verificar resposta, Esc para fechar modal) e ARIA labels.
- **Design Responsivo:** Interface ajustável para diferentes tamanhos de tela.

---

## 📋 Pré-requisitos

Para executar o Simulador CTFL localmente, você precisará de:

- Um navegador moderno (Chrome, Firefox, Edge, etc.).
- Um servidor local para carregar os arquivos JSON, como:
  - Extensão **Live Server** no VSCode.
  - Ou um servidor HTTP simples (ex.: `python -m http.server` no Python 3).
- Os arquivos JSON (`exam1.json`, `exam2.json`, `exam3.json`) devem estar no mesmo diretório que os arquivos HTML e JS.

---

## 📑 Estrutura dos Arquivos JSON

Os arquivos JSON contêm as perguntas e respostas no seguinte formato:

```json
[
    {
    "question": "1. Qual das seguintes respostas descreve uma condição de teste?",
    "options": [
    "A) Uma característica distinta de um componente ou sistema",
    "B) Um aspecto testável de um componente ou sistema identificado como base para os testes",
    "C) O grau em que um produto de software fornece funções que atendem às necessidades",
    "D) Casos de teste projetados para executar combinações de condições e ações"
    ],
    "answer": 1
    }
]
```

- `question`: Texto da pergunta.
- `options`: Array com as opções de resposta.
- `answer`: Índice da opção correta (0 a 3).

---

## 🚀 Como Usar

1. **Clone ou baixe o repositório:**

```bash
git clone <https://github.com/anselmotadeu/SimuladorCTFL.git>
```

Ou baixe os arquivos diretamente.

2. **Certifique-se de que os arquivos JSON estão no diretório:**
- Coloque `exam1.json`, `exam2.json` e `exam3.json` no mesmo diretório que `index.html`.

3. **Inicie um servidor local:**
- No VSCode, use a extensão **Live Server**:
  - Clique com o botão direito em `index.html` e selecione "Open with Live Server".
- Ou use Python:
  ```
  python -m http.server 8000
  ```
- Acesse [http://localhost:8000](http://localhost:8000) no navegador.

4. **Interaja com o Simulador:**
- Abra `index.html` no navegador.
- Selecione um exame (A, B ou C).
- O temporizador começará automaticamente (60 minutos).
- Responda às perguntas e clique em "Verificar Resposta".
- Acompanhe seu progresso e desempenho em tempo real.
- Ao final, veja o resultado no modal com percentual de acerto e revisão das respostas.

---

## 📂 Estrutura do Projeto

```plain
simulador-ctfl/
│
├── index.html        # Página principal com a interface do simulador
├── script.js         # Lógica JavaScript para o funcionamento do simulador
├── exam1.json        # Perguntas do Exame A
├── exam2.json        # Perguntas do Exame B
├── exam3.json        # Perguntas do Exame C
└── README.md         # Documentação do projeto
```

### Detalhes dos Arquivos

- **index.html:**
  - Estrutura HTML da aplicação.
  - Usa Tailwind CSS via CDN para estilização.
  - Inclui seções para seleção de exame, temporizador, perguntas, opções, feedback e modal de resultados.

- **script.js:**
  - Gerencia o carregamento de perguntas via fetch.
  - Controla o temporizador, verificação de respostas e exibição de resultados.
  - Inclui lógica para barra de progresso e feedback visual.

- **exam1.json, exam2.json, exam3.json:**
  - Contêm as perguntas, opções e respostas corretas de cada exame.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura da página.
- **CSS (Tailwind CSS):** Estilização moderna e responsiva.
- **JavaScript:** Lógica interativa e dinâmica.
- **JSON:** Armazenamento das perguntas e respostas.

---

## ⚙️ Configurações Adicionais

### Personalizar o Temporizador

O temporizador está configurado para 60 minutos. Para alterar, modifique a variável `duration` na função `loadQuestions` em `script.js`:

```javascript
const duration = 60 * 60; // 60 minutos
```

### Adicionar Novos Exames

1. Crie um novo arquivo JSON (ex.: `exam4.json`) com a estrutura mencionada.
2. Adicione uma nova opção no `index.html`:

```html
<label class="flex items-center gap-2"> <input type="checkbox" name="exam" value="exam4" class="h-4 w-4 text-blue-600"> <span>Exame D</span> </label>
```
---

## 📊 Critérios de Aprovação
- A pontuação é calculada com base no número de respostas corretas.

- Percentual de acerto: (respostas corretas / total de perguntas) * 100.

- Aprovação: Percentual ≥ 60%.

- O modal de resultados exibe uma mensagem de "Aprovado" (verde) ou "Reprovado" (vermelho) com animação.

---

## 🐛 Resolução de Problemas

**Erro ao carregar perguntas:**
"Erro ao carregar as perguntas. Certifique-se de que os arquivos JSON estão no mesmo diretório..."

- Verifique se os arquivos JSON estão no mesmo diretório que index.html.

- Certifique-se de estar executando a aplicação via um servidor local (não diretamente abrindo o arquivo HTML no navegador).

**Temporizador não funciona:**

- Confirme que o JavaScript está habilitado no navegador.

- Verifique se há erros no console do navegador (F12 > Console).

**Interface não renderiza corretamente:**

- Certifique-se de que o Tailwind CSS está carregando corretamente (necessita de conexão com a internet para o CDN).

- Teste em um navegador moderno e atualizado.

---

## 🤝 Contribuições
Contribuições são bem-vindas! Para contribuir:

**1. Faça um fork do repositório.**

**2. Crie uma branch para sua feature:**

```bash
git checkout -b feature/nova-funcionalidade
```

**3. Faça suas alterações e commit:**

```bash
git commit -m "✨ Adiciona nova funcionalidade"
```

**4. Envie para o repositório remoto:** 

```bash
git push origin feature/nova-funcionalidade
```

**5. Abra um Pull Request descrevendo suas mudanças.**

---

## 📜 Histórico de Alterações
**Versão 1.0** (20/05/2023):

- Lançamento inicial com interface básica e lógica de perguntas.

**Versão 1.1** (14/05/2025):

- Adicionado Tailwind CSS para design moderno.

- Incluída barra de progresso e indicadores de respostas.

- Corrigido carregamento de JSON e numeração duplicada de perguntas.

- Melhorias de acessibilidade e responsividade.

---

## 📧 Contato
Para dúvidas ou sugestões, entre em contato via anselmotadeu@outlook.com ou abra uma issue no repositório.

Desenvolvido com 💻 por [Anselmo Santos]
Licença: MIT