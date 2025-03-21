# 🏳️‍🌟 Blockchain Voting Smart Contract

Este repositório contém o contrato inteligente para um sistema de **votação descentralizado** na **rede Polygon**, garantindo **segurança, transparência e anonimato** dos votos.

## 📌 Tecnologias Utilizadas

- **Solidity** - Linguagem para contratos inteligentes
- **Hardhat** - Framework para desenvolvimento, testes e implantação de contratos
- **Ethers.js** - Biblioteca para interação com contratos inteligentes
- **OpenZeppelin** - Conjunto de bibliotecas para contratos seguros e reutilizáveis
- **Polygon (Amoy Testnet)** - Blockchain utilizada para registrar os votos

---

## 💁️🏻 Estrutura do Projeto

```
📂 voting-contract
👉📂 contracts          # Diretório dos contratos inteligentes
👉👉📂 Voting.sol       # Contrato principal de votação
👉📂 scripts           # Scripts para implantação e interação
👉👉📂 deploy.ts       # Script de deploy dos contratos
👉📂 test              # Testes unitários dos contratos
👉👉📂 Voting.test.ts  # Testes para o contrato de votação
👉 hardhat.config.ts    # Configuração do Hardhat
👉 package.json         # Dependências do projeto
👉 tsconfig.json        # Configuração do TypeScript
👉 README.md            # Documentação do repositório
```

---

## 🚀 Como Configurar o Projeto

### **1️⃣ Clonar o Repositório**
```sh
git clone https://github.com/GabrielFAlves/TrustVote-Contract.git
cd TrustVote-Contract
```

### **2️⃣ Instalar as Dependências**
```sh
npm install
```

### **3️⃣ Configurar as Variáveis de Ambiente**
Crie um arquivo `.env` e adicione suas chaves:
```env
PRIVATE_KEY=SUA_CHAVE_PRIVADA_DA_METAMASK
POLYGON_AMOY_RPC=https://polygon-amoy.g.alchemy.com/v2/SUA_ALCHEMY_KEY
```
📈 **IMPORTANTE**: Mumbai Testnet foi descontinuada. Agora usamos **Amoy Testnet** via **Alchemy**.

### **4️⃣ Compilar os Contratos**
```sh
npx hardhat compile
```

### **5️⃣ Executar os Testes**
```sh
npx hardhat test
```

### **6️⃣ Fazer o Deploy na Rede Polygon (Amoy Testnet)**
```sh
npx hardhat run scripts/deploy.ts --network amoy
```

---

## 🛠️ Funcionalidades do Contrato

🔹 Registro de uma nova eleição.  
🔹 Cadastro de candidatos elegíveis.  
🔹 Registro de votos anônimos (com possível implementação de ZKP).  
🔹 Restrição para que **cada CPF possa votar apenas uma vez**.  
🔹 Auditoria pública dos votos sem expor informações pessoais.  

---

## 💚 Licença

Este projeto é licenciado sob a **MIT License**.

