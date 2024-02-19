<h1>Desafio Wavelight - Web: Conversor de Vídeo para GIF</h1>

<p>
  Este projeto é uma aplicação web desenvolvida como parte do Desafio Wavelight, com o
  objetivo de criar um conversor de vídeo para GIF. A aplicação é construída utilizando React
  para o front-end e NestJS para o back-end, ambos utilizando TypeScript.
</p>
<h2>Tecnologias Utilizadas</h2>

  <h3>Backend (NestJS)</h3>
  <ul>
    <li>NestJS: Framework para construção de aplicativos eficientes e escaláveis em Node.js.</li>
    <li>TypeScript: Superset de JavaScript que adiciona tipagem estática opcional ao código.</li>
    <li>MySQL: Banco de dados relacional utilizado para armazenar dados relacionados aos usuários e aos vídeos
      processados.</li>
    <li>JWT (JSON Web Tokens): Mecanismo de autenticação utilizado para autenticar os usuários na aplicação.</li>
    <li>FFmpeg: Biblioteca para manipulação de arquivos de áudio e vídeo, utilizado para converter os vídeos em GIFs.</li>
    <li>Diretório para Simular um Bucket: Para simular um armazenamento de arquivos, foi utilizado um diretório na raiz
      do backend para armazenar os arquivos de vídeo e os GIFs convertidos.</li>
  </ul>

  <h3>Frontend (ReactJS)</h3>
  <ul>
    <li>React: Biblioteca JavaScript de código aberto para construir interfaces de usuário.</li>
    <li>TypeScript: Utilizado também no frontend para adicionar tipagem estática e aumentar a robustez do código.</li>
  </ul>

<h2 style="text-align: center;">Gif da Aplicação</h2>
<p>O gif abaixo foi gerado pela própria aplicação durante a conversão de um vídeo para formato GIF.</p>
<div style="text-align: center;">
  <img src="/aplication.gif" alt="Gif da Aplicação" style="width: 80%; max-width: 800px;">
</div>

<h2>Como Executar o Projeto com Docker</h2>
<p>Para executar o projeto usando Docker, siga as instruções abaixo:</p>
<ol>
  <li>Clonar o repositório: <code>git clone https://github.com/Roiney/desafioWavelight.git</code></li>
  <li>Ajustar o arquivo de ambiente:</li>
  <ul>
    <li>Renomeie o arquivo <code>.env-exemplo</code> para <code>.env</code> em <code>app/frontend</code> e <code>app/backend</code>.</li>
  </ul>
  <li>Executar o comando Docker Compose: <code>docker compose -f "app/docker-compose.yml" up -d --build</code>.</li>
</ol>

<h3>O que o Docker Compose faz:</h3>
<ul>
  <li>Define e inicia os serviços necessários para executar a aplicação.</li>
  <li>Constroi as imagens dos contêineres, se necessário, com base nas configurações do Dockerfile.</li>
  <li>Configura a rede entre os contêineres, permitindo que eles se comuniquem entre si.</li>
  <li>Cria e gerencia volumes de dados conforme necessário para persistência de dados entre execuções.</li>
  <li>Monitora e reinicia automaticamente os contêineres em caso de falha.</li>
</ul>

<h2>Container do Backend</h2>

O container do backend neste projeto é responsável por executar a lógica do servidor da aplicação. Abaixo está um descritivo das principais atividades e funcionalidades do container:

1. **Base Image**: Utiliza uma imagem base do Docker que inclui o ambiente Node.js na versão 18. Isso fornece uma base consistente para o ambiente de desenvolvimento e execução do código Node.js.

2. **Instalação de Dependências**: Atualiza os repositórios e instala as dependências necessárias para a aplicação backend, incluindo o ffmpeg e lsof.

3. **Diretório de Aplicação**: Define o diretório de trabalho dentro do contêiner como `/app-backend`, onde todos os comandos subsequentes serão executados.

4. **Cópia de Arquivos de Configuração e Dependências**: Copia os arquivos `package.json`, `package-lock.json` e `yarn.lock` para o diretório de trabalho no contêiner. Isso permite que o Docker instale as dependências especificadas no projeto.

5. **Instalação de Dependências**: Executa o comando `yarn install` para instalar todas as dependências especificadas no arquivo `package.json`.

6. **Definição do Ambiente**: Define a variável de ambiente `NODE_ENV` como `production`, indicando que o ambiente está configurado para produção.

7. **Cópia do Código Fonte**: Copia todo o código fonte da aplicação para o diretório de trabalho no contêiner.

8. **Geração de Tipos Prisma**: Executa o comando `yarn prisma generate` para gerar os tipos TypeScript com base no modelo do Prisma, que é uma ferramenta ORM (Object-Relational Mapping) para o Node.js e TypeScript.

9. **Criação do Build de Produção**: Executa o comando `yarn build` para criar uma versão otimizada e pronta para produção da aplicação no diretório `dist`.

10. **Exposição da Porta**: Expõe a porta 3001 do contêiner, permitindo que outros contêineres ou hosts externos se comuniquem com o servidor backend.

11. **Inicialização do Servidor**: Define o comando `node dist/main.js` como comando padrão a ser executado quando o contêiner é iniciado. Isso inicia o servidor backend, que estará disponível na porta 3001.

Este container encapsula toda a lógica do servidor da aplicação, desde a instalação de dependências até a inicialização do servidor web, garantindo que o ambiente seja replicável e consistente em diferentes ambientes de execução.

<h2>Container do Frontend</h2>

O container do frontend neste projeto é responsável por servir a interface de usuário da aplicação. Abaixo está um descritivo das principais atividades e funcionalidades do container:

1. **Base Image**: Utiliza uma imagem base do Docker que inclui o ambiente Node.js na versão 18-alpine. A variação "alpine" é mais leve em tamanho, o que pode resultar em tempos de construção e execução mais rápidos.

2. **Diretório de Aplicação**: Define o diretório de trabalho dentro do contêiner como `/app-frontend`, onde todos os comandos subsequentes serão executados.

3. **Exposição da Porta**: Expõe a porta 3000 do contêiner, permitindo que outros contêineres ou hosts externos se comuniquem com o servidor frontend.

4. **Cópia do Código Fonte**: Copia todo o código fonte da aplicação para o diretório de trabalho no contêiner.

5. **Instalação de Dependências**: Executa o comando `npm install --force` para instalar todas as dependências especificadas no arquivo `package.json`. O parâmetro `--force` garante que as dependências sejam instaladas mesmo que ocorram problemas durante o processo.

6. **Formatação do Código**: Executa o comando `npm run format` para formatar o código fonte do frontend, garantindo uma padronização e legibilidade consistente.

7. **Inicialização do Servidor**: Define o comando `npm start` como comando padrão a ser executado quando o contêiner é iniciado. Isso inicia o servidor frontend, permitindo que os usuários acessem a interface da aplicação por meio do navegador.

Este container encapsula toda a lógica e recursos necessários para servir a interface de usuário da aplicação, garantindo que o ambiente seja replicável e consistente em diferentes ambientes de execução.

<h2>Como Executar o Projeto</h2>
  <ol>
    <li>Clonar o repositório: <code>git clone https://github.com/Roiney/desafioWavelight.git</code></li>
    <li>Instalar Dependências:
      <ul>
        <li>Backend: <code>cd backend &amp;&amp; npm install</code></li>
        <li>Frontend: <code>cd frontend &amp;&amp; npm install</code></li>
      </ul>
    </li>
    <li>Configurar o Banco de Dados:
      <ul>
        <li>Configure as credenciais do MySQL no arquivo de configuração do NestJS.</li>
      </ul>
    </li>
    <li>Instalar o FFmpeg: Certifique-se de ter o FFmpeg instalado em seu sistema. Você pode baixá-lo em
      https://ffmpeg.org/download.html.</li>
    <li>Executar o Backend: <code>cd backend &amp;&amp; npm run start:dev</code></li>
    <li>Executar o Frontend: <code>cd frontend &amp;&amp; npm start</code></li>
    <li>Acessar a Aplicação: Acesse a aplicação em seu navegador através do endereço <code>http://localhost:3000</code>.
    </li>
  </ol>
