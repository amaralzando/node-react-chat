validator_hash_ptu
Este projeto consiste em um validador de hash para arquivos PTU, com um backend em Java Spring Boot e um frontend em React.

Pré-requisitos

Docker
Docker Compose

Como Executar

Clone o repositório:

git clone [url do repositório]

Navegue até o diretório do projeto:

    cd validator_hash_ptu

Inicie os serviços com Docker Compose

    docker-compose up -d --build

Execulte o docker com o comando abaixo:

```
    docker-compose up -d
```

Inicia os containers em segundo plano (modo detached).

```
    docker-compose up --build
```

Força a reconstrução das imagens antes de iniciar os containers.

Acesse o frontend:
Abra o seu navegador e acesse http://localhost:3000.
Como usar (para o usuário final):

Instale o Docker e o Docker Compose.
Clone o repositório.
Execute docker-compose up -d --build.
Acesse http://localhost:3000 no navegador.

Observações

Certifique-se de que as portas 8080 (backend) e 3000 (frontend) estejam livres em sua máquina.
Se você fizer alterações no código fonte, será necessário reconstruir as imagens e reiniciar os containers.
