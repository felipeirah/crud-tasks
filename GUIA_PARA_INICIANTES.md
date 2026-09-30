# Guia completo para executar o Taskflow

Este guia explica, do zero, como colocar o projeto de tarefas para funcionar no seu computador. Você não precisa entender programação para seguir os passos: copie os comandos exatamente como estão.

## O que este projeto faz

O **Taskflow** é um sistema simples para organizar tarefas. Nele você consegue:

- criar uma tarefa;
- editar uma tarefa criada;
- definir prioridade e data de entrega;
- marcar como concluída;
- pesquisar, filtrar e excluir tarefas.

Ele tem duas partes:

- **frontend**: a página que aparece no navegador;
- **backend**: o servidor que conversa com o banco de dados.

## Antes de começar

Você precisará instalar estas duas ferramentas:

1. **Node.js** (versão LTS): [nodejs.org](https://nodejs.org/). Durante a instalação, mantenha as opções padrão.
2. **Visual Studio Code** (opcional, mas recomendado): [code.visualstudio.com](https://code.visualstudio.com/).

Depois de instalar o Node.js, abra o PowerShell e confirme a instalação:

```powershell
node -v
npm -v
```

Se os dois comandos mostrarem números de versão, está tudo certo. Se aparecer uma mensagem dizendo que o comando não existe, feche e abra o PowerShell novamente. Caso continue, reinstale o Node.js.

## 1. Baixar o projeto do GitHub

Abra o PowerShell em uma pasta onde você deseja guardar o projeto, por exemplo `Documentos`, e rode:

```powershell
git clone https://github.com/felipeirah/crud-tasks.git
cd crud-tasks
```

Se você já tem esta pasta aberta no VS Code, pode pular esta etapa. Para abrir a pasta no VS Code pelo PowerShell, use:

```powershell
code .
```

> Se o comando `git` não existir, instale o Git em [git-scm.com](https://git-scm.com/downloads) usando as opções padrão.

## 2. Criar o banco de dados gratuito no Supabase

O Supabase é onde as tarefas ficarão armazenadas.

1. Acesse [supabase.com](https://supabase.com/) e crie uma conta.
2. Clique em **New project**.
3. Escolha um nome, por exemplo `taskflow`.
4. Crie e guarde uma senha forte para o banco.
5. Espere o projeto terminar de ser criado.
6. No menu lateral, clique em **SQL Editor** e depois em **New query**.
7. No seu projeto, abra o arquivo `backend/database.sql`.
8. Copie todo o conteúdo desse arquivo, cole no editor SQL do Supabase e clique em **Run**.

Isso cria a tabela `tasks`, onde as tarefas serão salvas.

## 3. Copiar a conexão do banco

Ainda no Supabase:

1. Clique no ícone de engrenagem (**Project Settings**).
2. Clique em **Database**.
3. Procure a seção **Connection string**.
4. Escolha o formato **URI** e copie a URL.
5. Troque `[YOUR-PASSWORD]` pela senha que você criou para o banco.

Essa URL é privada. Não envie para outras pessoas e não publique no GitHub.

## 4. Criar o arquivo de configuração

Na pasta do projeto, entre em `backend` e crie um arquivo chamado exatamente `.env`.

No Windows, a forma mais simples é abrir o PowerShell dentro da pasta principal do projeto e executar:

```powershell
notepad backend\.env
```

No Bloco de Notas que abrir, cole a sua URL desta forma:

```env
DATABASE_URL=cole_aqui_a_url_copiada_do_supabase
```

Salve o arquivo e feche o Bloco de Notas. Não coloque aspas e não deixe espaços antes ou depois do `=`.

## 5. Instalar as dependências

Ainda na pasta principal do projeto, execute estes comandos. Eles baixam os arquivos que o projeto precisa para rodar.

```powershell
cd backend
npm install
cd ..\frontend
npm install
cd ..
```

Esse processo pode levar alguns minutos na primeira vez.

## 6. Iniciar o projeto

Você precisará de **dois terminais PowerShell abertos** ao mesmo tempo.

### Terminal 1: backend

Na pasta principal do projeto:

```powershell
cd backend
npm run dev
```

Deixe essa janela aberta. Quando estiver funcionando, ela mostrará algo parecido com `Servidor rodando na porta 3000`.

### Terminal 2: frontend

Abra outro PowerShell na pasta principal do projeto e execute:

```powershell
cd frontend
npm start
```

Espere a compilação terminar. Depois abra este endereço no navegador:

```text
http://localhost:4200
```

## 7. Como usar a página

1. Clique em **+ Nova tarefa**.
2. Escreva um título. Este é o único campo obrigatório.
3. Opcionalmente, escreva uma descrição, escolha a data e a prioridade.
4. Clique em **Salvar tarefa**.
5. Para concluir uma tarefa, clique no círculo à esquerda dela.
6. Para alterar uma tarefa, clique em **Editar**.
7. Para apagar, clique em **Excluir** e confirme.
8. Use a busca e o seletor de status para encontrar tarefas rapidamente.

## Problemas comuns

### A página abre, mas não salva tarefas

Normalmente isso significa que o backend não está aberto ou que a URL do banco está errada.

1. Confirme que o primeiro terminal ainda está aberto com `npm run dev`.
2. Confira o arquivo `backend/.env`.
3. Verifique se você executou o SQL do arquivo `backend/database.sql` no Supabase.

### Mensagem “npm não é reconhecido”

O Node.js não está instalado corretamente. Instale a versão LTS do site oficial, feche o terminal, abra novamente e repita os comandos.

### A porta já está em uso

Feche outras janelas de terminal que estejam rodando o mesmo projeto. Se necessário, reinicie o computador e inicie apenas um backend e um frontend.

### Quero parar o projeto

Em cada terminal onde o projeto estiver rodando, aperte:

```text
Ctrl + C
```

## Checklist final

- [ ] Node.js instalado.
- [ ] Projeto baixado ou aberto no computador.
- [ ] Projeto criado no Supabase.
- [ ] SQL de `backend/database.sql` executado.
- [ ] Arquivo `backend/.env` criado com a URL do banco.
- [ ] `npm install` executado em `backend` e em `frontend`.
- [ ] Backend iniciado com `npm run dev`.
- [ ] Frontend iniciado com `npm start`.
- [ ] Página aberta em `http://localhost:4200`.
