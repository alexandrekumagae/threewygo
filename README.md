# Threewygo - Projeto de Lista de Cursos (Seletivo Twygo)

## Descrição do Projeto

Este projeto consiste em uma aplicação web para listar cursos disponíveis, permitindo o cadastro, edição e exclusão de cursos. A tela inicial exibe uma lista de cursos atuais, filtrando-os com base na data de término. Além disso, a aplicação apresenta um formulário de cadastro de cursos e fornece uma maneira de editar e excluir cursos existentes. Também é exibido o tamanho total ocupado pelos vídeos nos cursos.

## Requisitos

| Requisitos | Descrições |
|------------|------------|
| R.1 | A tela inicial deve exibir uma lista de cursos atuais. |
| R.2 | Os cursos devem ser exibidos em um layout responsivo que funcione bem em dispositivos móveis. |
| R.3 | Cada curso na lista deve incluir o título e a descrição do curso. |
| R.4 | Os cursos devem ser filtrados com base na data de término, mostrando apenas cursos cuja data de término ainda não passou em relação à data atual. |
| R.5 | Crie um formulário de cadastro de curso que inclua os campos da tabela. |
| R.6 | Forneça uma maneira de editar e excluir cursos existentes. |
| R.7 | Apresentação tamanho total ocupado pelos vídeos nos cursos. |

## Ferramentas Utilizadas

### SPA:
- React;
- TypeScript;
- Chakra UI;
- React Hook Form;
- Zod;
- Jest + React Testing Library;

### API:
- Node;
- Fastify;
- TypeScript;
- Jest;
- Zod;
- Docker;

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

- **/server**: Contém a API em Node.js utilizando Fastify.
- **/web**: SPA (Single Page Application) em React utilizando o Vite.

## Pré-requisitos

- Node.js versão 20.10.0 ou superior.
- Docker.

## Configuração e Execução

### Para rodar o servidor:

1. Navegue até o diretório /server.
2. Execute `npm install` para instalar as dependências.
3. Execute o comando `docker-compose up -d` para iniciar os serviços necessários.
4. Aguarde até que todos os contêineres estejam prontos e executando.
5. Execute `npm run setup` para configurar o ambiente.
6. Por fim, execute `npm run dev` para iniciar o servidor na porta http://localhost:3002.

### Para rodar a aplicação web:

1. Navegue até o diretório /web.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm run dev` para iniciar o servidor de desenvolvimento no endereco: http://localhost:5173.

### Para rodar os testes:

#### No servidor:

1. Navegue até o diretório /server.
2. Cancele a execução da API, caso esteja rodando na porta 3002.
3. Execute `npm run test` para rodar os testes unitários.

#### Na aplicação web:

1. Navegue até o diretório /web.
2. Execute `npm run test` para rodar os testes unitários.

## Autor

Este projeto foi desenvolvido por Alexandre Kumagae.