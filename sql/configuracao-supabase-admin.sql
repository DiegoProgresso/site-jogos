-- tabela que guarda quem e admin
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table admins enable row level security;

-- cada usuario só consegue ver se ELE MESMO é admin (não a lista toda)
create policy "usuario ve seu proprio status de admin"
on admins for select
to authenticated
using (auth.uid() = user_id);

-- admins podem deletar qualquer post (respostas vão junto, por causa do cascade)
create policy "admins podem deletar posts"
on posts for delete
to authenticated
using (exists (select 1 from admins where admins.user_id = auth.uid()));

-- funcao que checa a senha e promove o usuario logado a admin
-- a senha só existe aqui dentro, nunca aparece no código do site
create or replace function tornar_admin(senha text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if senha = 'di1708' then
    insert into admins (user_id) values (auth.uid())
    on conflict do nothing;
    return true;
  else
    return false;
  end if;
end;
$$;

grant execute on function tornar_admin(text) to authenticated;
