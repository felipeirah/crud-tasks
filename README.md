# Taskflow — CRUD de tarefas

Versão simplificada do CRUD de usuários de referência, agora voltada para tarefas.

## Incluído

- criar, listar, editar e excluir tarefas;
- marcar uma tarefa como concluída diretamente na lista;
- busca por título/descrição e filtro por status;
- prioridade, descrição e data de entrega.

## Banco de dados

Execute o conteúdo de `backend/database.sql` no PostgreSQL/Supabase e crie `backend/.env` com:

```env
DATABASE_URL=sua_url_de_conexao_postgresql
```

## Executar

Em dois terminais:

```bash
cd backend
npm run dev
```

```bash
cd frontend
npm start
```

Abra `http://localhost:4200`.
