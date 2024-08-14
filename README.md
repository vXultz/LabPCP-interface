# LabPCP

Neste projeto de front-end você encontrará uma solução para sistema escolar. Neste sistema há 3 tipos de usuários, **Admin, Docente e Aluno**, cada um podendo acessar e interagir com diferentes páginas.

As páginas com formulários contam com diversar verificações para que todos campos sejam preenchidos corretamente. Neste sistema todas informações são salvar no localStorage.

Neste projeto, foram utilizadas as seguintes tecnologias:

- Angular 18
- Angular Material
- TypeScript
- Consumo API ViaCep

## Funcionalidades dos tipos de Usuário

- **Admin**: acessa todas páginas com excessão de Notas-aluno, pode editar e deletar dados.
- **Docente**: acessa apenas as páginas home, registro-turma e registro-avaliacao, pode editar e deletar turmas ou avaliações apenas.
- **Aluno**: acessa apenas as páginas home e notas-aluno.


## Execução

Para poder executar o projeto, faça um clone do repositório usando:

```
  git clone git@github.com:vXultz/LabPCP-interface.git
```
Após clonar, execute o comando:

```
  npm install
```

Após isso execute este comando para rodar o projeto:

```
  ng serve
```

## Fluxo de cadastro e Logins

Assim que você rodar o projeto, não terá nenhuma informação salva e alguns elementos não irão aparecer por conta disso.

No primeiro momento faça login como Admin e faça pelo menos 1 cadastro para cada item nesta ordem:

    1- Docente
    2- Turma
    3- Aluno
    4- Avaliação

Fazendo isso você poderá ver todos elementos das páginas.

Os logins e senhas para entrar no sistema são:

    1- email: 'admin@example.com', senha: 'admin123', role: 'Admin'
    2- email: 'docente@example.com', senha: 'docente123', role: 'Docente'
    3- email: 'aluno@example.com', senha: 'aluno123', role: 'Aluno'
