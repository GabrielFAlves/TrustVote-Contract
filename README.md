# 🗳️ Blockchain Voting Smart Contract

Este repositório contém o contrato inteligente para um sistema de votação descentralizado na rede Polygon, garantindo segurança, transparência e anonimato dos votos.

## 📌 Tecnologias Utilizadas

- **Solidity** - Linguagem para contratos inteligentes
- **Hardhat** - Framework para desenvolvimento, testes e implantação de contratos
- **Ethers.js** - Biblioteca para interação com contratos inteligentes
- **OpenZeppelin** - Conjunto de bibliotecas para contratos seguros e reutilizáveis
- **Polygon** - Blockchain utilizada para registrar os votos

## 📁 Estrutura do Projeto

```
📂 voting-contract
├── 📂 contracts          # Diretório dos contratos inteligentes
│   ├── Voting.sol       # Contrato principal de votação
│   ├── Token.sol        # Contrato do token de votação
│   ├── interfaces       # Interfaces para contratos
├── 📂 scripts           # Scripts para implantação e interação
│   ├── deploy.js       # Script de deploy dos contratos
├── 📂 test              # Testes unitários dos contratos
│   ├── Voting.test.js  # Testes para o contrato de votação
├── hardhat.config.js    # Configuração do Hardhat
├── package.json         # Dependências do projeto
└── README.md            # Documentação do repositório
```

## 🚀 Como Configurar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env`:
   ```env
   PRIVATE_KEY=your-wallet-private-key
   INFURA_API_KEY=your-infura-api-key
   ```
4. Compile os contratos:
   ```sh
   npx hardhat compile
   ```
5. Execute os testes:
   ```sh
   npx hardhat test
   ```
6. Faça o deploy na rede Polygon:
   ```sh
   npx hardhat run scripts/deploy.js --network polygon
   ```

## 🛠️ Funcionalidades do Contrato

- Registro de uma nova eleição
- Cadastro de candidatos elegíveis
- Registro de votos anônimos utilizando ZKP
- Restrição para que cada CPF possa votar apenas uma vez
- Auditoria transparente dos votos sem expor informações pessoais

## 📜 Licença

Este projeto é licenciado sob a **MIT License**.
