<h1>Desafio Wavelight - Web: Conversor de Vídeo para GIF</h1>

<p>
  Este projeto é uma aplicação web desenvolvida como parte do Desafio Wavelight, com o
  objetivo de criar um conversor de vídeo para GIF. A aplicação é construída utilizando React
  para o front-end e NestJS para o back-end, ambos utilizando TypeScript.
</p>
<h2>Tecnologias Utilizadas</h2>

<p>
  As partes do projeto foram construídas em repositórios separados no GitHub e agrupadas posteriormente para melhor entendimento. Como resultado, o histórico de commits pode estar comprometido no entendimento da construção. Se necessário, você pode solicitar acesso aos repositórios originais para obter mais detalhes sobre o desenvolvimento.
</p>

<h3>Banco de Dados (MySQL)</h3>
<p>A rastreabilidade é uma questão importante neste projeto, e o MySQL foi escolhido como banco de dados devido à sua robustez e capacidade de fornecer registros claros e rastreáveis das atividades dos usuários, bem como dos processos de conversão de vídeo para GIF. Além disso, o MySQL oferece uma estrutura relacional que facilita a organização e recuperação eficiente dos dados, tornando-o uma escolha ideal para um aplicativo como este.</p>

<h3>Backend (NestJS)</h3>
<ul>
  <li>NestJS: Framework para construção de aplicativos eficientes e escaláveis em Node.js.</li>
  <li>TypeScript: Superset de JavaScript que adiciona tipagem estática opcional ao código.</li>
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

<h2>Arquitetura do Backend</h2>

<p>O backend desta aplicação segue uma arquitetura padrão MVC (Model-View-Controller) dividida em módulos, seguindo os princípios e convenções do framework Nest.js.</p>

<h3>Rota de Cadastro de Usuários</h3>

<p>Esta rota permite o cadastro de novos usuários na aplicação. Ela é do tipo POST e recebe as informações de nome, email e senha para o cadastro dos mesmos. A rota possui um endpoint público, ou seja, não requer autenticação para acessá-la. Os dados enviados são validados pela biblioteca <code>class-validator</code>, garantindo que estejam de acordo com o padrão estabelecido e que não estejam vazios. Além disso, foi implementada uma validação de senha forte para garantir a segurança das contas de usuário.</p>

<ul>
  <li><strong>Endpoint:</strong> /user</li>
  <li><strong>Método HTTP:</strong> POST</li>
  <li><strong>Corpo da Requisição:</strong>
  <pre>{
  "name": "johnD@e10",
  "email": "example@example.com",
  "password": "12@#!10Aa"
  }</pre>
</ul>

<h3>Rota de Login de Usuários</h3>

<p>Esta rota permite que os usuários façam login na aplicação. Ela recebe o email e a senha do usuário e retorna um token utilizado para validar as permissões do usuário no frontend. A rota é pública, permitindo que qualquer usuário acesse sem a necessidade de autenticação. No entanto, posteriormente será necessário adicionar proteção a essa rota através de um guard local. Assume-se que apenas os usuários que possuem um email cadastrado poderão acessar esta rota. O token gerado é assinado com JWT (JSON Web Token).</p>

<ul>
  <li><strong>Endpoint:</strong> /auth/login</li>
  <li><strong>Método HTTP:</strong> POST</li>
  <li><strong>Corpo da Requisição:</strong>
  <pre>{
  "email": "example@example.com",
  "password": "12@#!10Aa"
}</pre>
</ul>
<h3>Rota de Envio de Vídeos para Conversão em GIF</h3>

<p>Esta rota permite o envio de vídeos para serem convertidos em arquivos GIF. Ela é do tipo POST e utiliza o <code>multipart/form-data</code> com o boundary para receber os arquivos. A rota faz uso da biblioteca Multer para realizar o upload dos arquivos e implementa um decorator personalizado para garantir que apenas vídeos no formato MP4 sejam aceitos. Além disso, a rota possui um guard e utiliza a engenharia JWT para garantir a segurança e capturar o usuário que está realizando o envio do vídeo.</p>

<p>A lógica por trás da conversão é realizada através do FFmpeg. O FFmpeg é um projeto de software livre e de código aberto que consiste em uma série de bibliotecas e programas para manipular arquivos e streams de vídeo, áudio e outros arquivos de multimídia.</p>

<p>Após a conversão, o sistema salva o arquivo convertido em um diretório específico do usuário, simulando um sistema de "bucket", e armazena o caminho do arquivo no banco de dados relacional para rastreamento e posterior acesso dos GIFs gerados.</p>

<ul>
  <li><strong>Endpoint:</strong> /converter/mp4</li>
  <li><strong>Método HTTP:</strong> POST</li>
  <li><strong>Corpo da Requisição:</strong> form-data com o arquivo de vídeo</li>
</ul>
<h3>Rota de Busca de Todos os GIFs de um Usuário</h3>

<p>Esta rota permite que o frontend obtenha todos os GIFs de um usuário para serem exibidos na biblioteca de GIFs. Ela é do tipo GET e retorna uma lista paginada de GIFs. A rota possui autenticação JWT, que é utilizada para garantir uma resposta personalizada para o usuário autenticado e já implementa a funcionalidade de paginação.</p>

<ul>
  <li><strong>Endpoint:</strong> /server-gif</li>
  <li><strong>Método HTTP:</strong> GET</li>
  <li><strong>Parâmetros da Requisição:</strong>
    <ul>
      <li><code>take</code>  número de GIFs a serem retornados por página (padrão: 10)</li>
      <li><code>skip</code>  número de GIFs a serem ignorados no início da lista (padrão: 0)</li>
    </ul>
  </li>
</ul>
<h3>Rota para Fornecer o GIF para Download</h3>

<p>Esta rota permite que o frontend faça o download de um GIF específico. Ela utiliza o módulo ServeStaticModule do Nest.js para fornecer o arquivo GIF estático ao frontend. A rota também possui validação JWT para garantir que apenas usuários autenticados possam baixar os GIFs.</p>

<ul>
  <li><strong>Endpoint:</strong> /server-gif/:filename</li>
  <li><strong>Método HTTP:</strong> GET</li>
 
  <li><strong>Parâmetros da Query:</strong> 
    <ul>
      <li><code>filename</code>: Nome do arquivo GIF (caminho informado pela rota anterior)</li>
    </ul>
  </li>
</ul>

<h2>Arquitetura do Frontend</h2>

<p>Este projeto consiste em um frontend com 4 páginas que compõem uma aplicação para um desafio técnico.</p>

<h2>Arquitetura do Frontend</h2>

<p>Este projeto consiste em um frontend com 4 páginas que compõem uma aplicação para um desafio técnico.</p>

<h2>Páginas</h2>
<ul>
    <li><strong>Página Home:</strong> Contém a descrição do desafio técnico.</li>
    <li><strong>Página de Inscrição de Usuário:</strong> Possui 4 campos (nome, email, senha e confirmação de senha) e um botão de envio para cadastrar o usuário.</li>
    <li><strong>Área de Login:</strong> Página onde os usuários podem inserir seu email e senha para acessar a aplicação.</li>
    <li><strong>Biblioteca de Gifs:</strong> Esta página permite aos usuários enviar vídeos e acessar uma biblioteca de gifs.</li>
</ul>

<p>Entretanto, devido à limitação da tag `<img>` em carregar arquivos locais diretamente pelo HTML, é necessário implementar uma lógica de download para permitir o acesso aos gifs.</p>

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

<h2>Como Executar o Projeto Localmente</h2>
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
