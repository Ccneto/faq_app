<h1>Estudo de RESTful API</h1>

<h2>Descrição</h2>
<p align="center">Desafio Scarf</p>

<p>Esta API possui as funcionalidades de criar um FAQ sobre o autor.</p>

<p align="center">
    <a href="#prerequisites">Pré-requisitos</a> •
    <a href="#technologies">Tecnologias</a> • 
    <a href="#license">Licença</a> • 
    <a href="#author">Autor</a>
</p>

<h3 id="prerequisites">Pré-requisitos</h3>
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
<ul>
    <li>[Git](https://git-scm.com)</li>
    <li>[Docker](https://docs.docker.com/get-docker/)</li>
    <li>Editor de código (recomendação) [VSCode](https://code.visualstudio.com/)</li>
</ul>

<h3>Rodando o Back End (servidor)</h3>

Clone este repositório<br/>
```bash
git clone https://github.com/Ccneto/faq_app.git/'
```

De <i>pull</i> no Docker da API<br/>
```bash
docker pull carloscn/scarf:dev
```

Inicialize o docker<br/>
```bash
docker run -e HOME=$HOME -v $(pwd):$(pwd) -w $(pwd) --rm -it -p 3000:3000 --name scarf carloscn/scarf:dev
```

Vá para a pasta do projeto e inicialize a API<br/>
```bash
cd faq_app; python3 app.py
```

Em outro <i>prompt</i> de comando, acesse o container na qual a API está rodando:<br/>
```bash
docker exec -it scarf bash
```

Vá para a pasta <i>view</i> do projeto e inicialize a interface:<br/>
```bash
cd scarf/view; npm start
```

<h3 id="technologies">🛠 Tecnologias</h3>

As seguintes ferramentas foram usadas na construção do projeto:

<ul>
    <li>[Python] (https://www.python.org)</li>
    <li>[JavaScript] (https://www.javascript.com)</li>
    <li>[React.JS] (https://reactjs.org)</li>
    <li>[HTML/CSS]</li>
</ul>

<h3 id="license">Licença</h3>
Copyright (c) <2022> <Carlos Castanho Neto>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<h3 id="author">Autor</h3>
<ul>
    <li>[Nome] Carlos Castanho Neto </li>
    <li>[E-mail] castanho.cneto@gmail.com</li>
    <li>[LinkedIn] https://www.linkedin.com/in/carlos-castanho-neto-9b2b04166/</li>
</ul>
