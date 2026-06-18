-- Tabela de posts do fórum
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  author_email text not null,
  content text not null,
  created_at timestamptz default now() not null
);

-- Ativa a segurança por linha (obrigatório para acesso seguro pelo navegador)
alter table posts enable row level security;

-- Qualquer usuário LOGADO pode ver os posts
create policy "Usuarios logados podem ver posts"
on posts for select
to authenticated
using (true);

-- Usuário logado só pode criar post em nome dele mesmo
create policy "Usuarios logados podem criar posts"
on posts for insert
to authenticated
with check (auth.uid() = user_id);
