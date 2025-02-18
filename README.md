# 📦 FIAP Tech Challenge - Microserviço de Pedidos

Este projeto é um microsserviço desenvolvido em **Node.js** com **Express**, utilizando **AWS DynamoDB** para armazenar pedidos. Ele faz parte do FIAP Tech Challenge e gerencia o fluxo de pedidos do sistema distribuído.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** + **Express** - API backend
- **AWS DynamoDB** - Banco de dados NoSQL
- **Docker** - Containerização do microsserviço
- **Kubernetes** - Orquestração de containers
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Testes unitários e de integração

---

## 📂 Estrutura do Projeto
```
📁 fiap-tech-challenge-ms-order
├── 📁 docs
│   ├── 📜 swagger.json  # Arquivo OpenAPI (Swagger)
├── 📜 .babelrc
├── 📜 .gitignore
├── 📜 Dockerfile
├── 📜 README.md
├── 📜 index.js
├── 📜 jest.config.js
├── 📜 package.json
├── 📁 config
│   ├── 📜 database.js  # Configuração do DynamoDB
├── 📁 src
│   ├── 📁 controllers
│   │   ├── 📜 order.controller.js
│   ├── 📁 models
│   │   ├── 📜 order.model.js
│   │   ├── 📜 status.model.js
│   ├── 📁 routes
│   │   ├── 📜 order.routes.js
│   ├── 📁 services
│   │   ├── 📜 order.service.js
├── 📁 test
│   ├── 📜 controllers/order.controller.test.js
│   ├── 📜 services/order.service.test.js
├── 📁 k8s
│   ├── 📜 ms-order-deployment.yaml  # Deployment do microsserviço no Kubernetes
│   ├── 📜 hpa.yaml  # Configuração de AutoScaling
├── 📁 .github/workflows
│   ├── 📜 pipeline-ci.yml  # CI - Testes automatizados
│   ├── 📜 pipeline-cd.yml  # CD - Deploy no Kubernetes
```

---

## 🔧 Configuração e Uso

### 1️⃣ **Instalar Dependências**
```sh
npm install
```

### 2️⃣ **Configurar Banco de Dados**
O banco de dados usa **AWS DynamoDB**. Defina as variáveis de ambiente no `.env`:
```ini
AWS_ACCESS_KEY_ID=<sua_access_key>
AWS_SECRET_ACCESS_KEY=<sua_secret_key>
AWS_REGION=us-east-1
DYNAMODB_TABLE=orders
```

### 3️⃣ **Rodar o Servidor**
```sh
npm start
```
O servidor iniciará na porta `3000` (ou outra definida na variável `PORT`).

### 4️⃣ **Executar Testes**
```sh
npm test
```

---

## 📦 Docker
### **1️⃣ Construir a Imagem**
```sh
docker build -t ms-order .
```

### **2️⃣ Rodar o Container**
```sh
docker run -p 3003:3003 --env-file .env ms-order
```

---

## 🚢 Kubernetes
### **1️⃣ Aplicar os Manifests**
```sh
kubectl apply -f k8s/ms-order-deployment.yaml
kubectl apply -f k8s/hpa.yaml
```

---

## 🔄 CI/CD com GitHub Actions
Este projeto utiliza **GitHub Actions** para automatizar **testes** e **deploys**:
- `pipeline-ci.yml` → Executa testes automáticos
- `pipeline-cd.yml` → Realiza deploy no Kubernetes

---

## 📜 Documentação OpenAPI (Swagger)

<details>
  <summary>📖 Clique para visualizar o Swagger</summary>

### 🔹 **Endpoints da API**
- `GET /api/v1/orders` → Lista todos os pedidos
- `POST /api/v1/orders` → Cria um novo pedido e retorna os dados criados
- `GET /api/v1/orders/{id}` → Retorna um pedido pelo ID
- `PATCH /api/v1/orders/{id}` → Atualiza **somente** o status de um pedido

### 🔹 **Baixar Swagger JSON**
[Download swagger.json](./docs/swagger.json)

</details>

---

## 📝 Licença
Este projeto está sob a **MIT License**.

