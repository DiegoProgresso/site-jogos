-- Adiciona a coluna que liga uma resposta ao post original
alter table posts
add column if not exists parent_id uuid references posts(id) on delete cascade;
