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
    <li>Outras bibliotecas e ferramentas: Pode incluir bibliotecas como Axios para requisições HTTP, Material-UI para
      componentes de interface, entre outras.</li>
  </ul>

<h2 align="center"> Gif da Aplicação </h2>
<p>O gif abaixo foi gerado pela própria aplicação durante a conversão de um vídeo para formato GIF.</p>
<img src="/aplication.gif" alt="Gif da Aplicação">
![](/aplication.gif)

<h2>Como Executar o Projeto</h2>
  <ol>
    <li>Clonar o repositório: <code>git clone https://github.com/seu-usuario/nome-do-repositorio.git</code></li>
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
