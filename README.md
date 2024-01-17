# KanbanApp

## Funcionalidades

- Listar tarefas por status ("Para Fazer", "Em Progresso" e "Concluída")
- Adicionar tarefa, com título e descrição
- Trocar ordem das tarefas
- Editar tarefa
  - Mudar status
  - Favoritar tarefa (e, assim, aparecer nas primeiras posições)
- Ver gráficos estatísticos
  - Distribuição de tarefas por status _(gráfico de pizza)_
  - Quantidade de tarefas concluídas por data _(gráfico de linha)_

## Vídeo de demonstração
https://github.com/ricardobizerra/kanban-tarefas-mobile/assets/88413847/0dcfaab1-4ee9-4ab4-a787-518184be8244

## Como rodar

- Na pasta `/server`:
  1. Rode `npm install` para instalar as dependências
  2. Crie um arquivo `.env` e adicione a seguinte variável de ambiente:
  ```bash
  DATABASE_URL="file:./dev.db"
  ```
  3. Opcionalmente, rode `npm run seed` para inserir alguns dados de exemplo no banco de dados
  4. Para rodar o back-end, rode `npm run dev`
- Em outro terminal, na pasta `/mobile`:
  1. Rode `npm install` para instalar as dependências
  2. Duplique o arquivo `.env.example` e nomeie como `.env`
  3. Veja qual o IP da sua rede e adicione-o como valor da variável `EXPO_PUBLIC_IP_ADDRESS`. No Linux, o comando é:
  ```bash
  sudo ifconfig
  ```
  4. Rode `npm run start` para iniciar o app
