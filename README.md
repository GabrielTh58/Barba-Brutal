# Barba Brutal

<div align="center">
  <img src="https://github.com/GabrielTh58/PortfolioIA/raw/main/.gitassets/Projetos/barba-brutal/logo.png" width="350" />
  
  
  <div data-badges>
      <img src="https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
      <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
      <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/prisma-%232D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
      <img src="https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
      <img src="https://img.shields.io/badge/jwt-%23323330.svg?style=for-the-badge&logo=json-web-tokens&logoColor=pink" alt="JWT" />
     <img src="https://img.shields.io/badge/turborepo-%23000000.svg?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
     <img src="https://img.shields.io/badge/expo-%23000000.svg?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
     <img src="https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn" />
     <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
     <img src="https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </div>
</div>

<br>

A aplicação Barba Brutal é uma plataforma desenvolvida para otimizar o gerenciamento de agendamentos em barbearias. A aplicação permite que os clientes agendem atendimentos de forma prática e rápida, escolhendo os serviços desejados, horários disponíveis e garantindo uma experiência personalizada e eficiente para todos os envolvidos.

A aplicação oferece uma interface moderna e intuitiva, possibilitando que os clientes naveguem facilmente pelo sistema de agendamento (tanto na versão mobile quanto na versão web) selecionem os serviços que desejam realizar, como cortes de cabelo, barbas ou pacotes combinados, e escolham o horário que melhor se adequa à sua rotina.

Para os barbeiros, a plataforma proporciona um painel exclusivo onde é possível visualizar todos os agendamentos do dia, organizados de forma clara e detalhada. Isso permite que o profissional gerencie seu tempo de maneira eficiente, garantindo um atendimento de qualidade para cada cliente.

---

## 🌐 Acesse online

A aplicação está hospedada em nuvem e pode ser acessada no seguinte 🔗[Link](http://ec2-18-230-217-138.sa-east-1.compute.amazonaws.com:3000)

---
 
## 🗒️ Features do projeto 🗒️

- Agendamento e gerenciamento de horários online
- Cadastro para clientes
- Controle de serviços oferecidos e valores
- Escolha de profissionais e serviços a serem prestados
- Versões Web e Mobile
- Painel administrativo para barbeiros

![](https://github.com/GabrielTh58/PortfolioIA/raw/main/.gitassets/Projetos/barba-brutal/capa.jpg)

---
## 🖥️ Como rodar este projeto 🖥️

### Requisitos:

- Node.js instalado
- PostgreSQL configurado

### Execução:

1. Clone este repositório:

   ```sh
   git clone https://github.com/GabrielTh58/Barba-Brutal.git
   ```

2. Acesse o diretório do projeto:

   ```sh
   cd Barba-Brutal
   ```

3. Instale as dependências com o comando a seguir na pasta raiz do projeto:

   ```sh
   yarn install
   ```

4. Configure as variáveis de ambiente:

   Será necessário criar um arquivo `.env` com as mesmas variáveis de ambiente listadas no arquivo `.env.example` nas pastas `apps/frontend`, `apps/backend` e `apps/mobile`. Cada um desses arquivos deverá ser preenchido com as variáveis de ambiente correspondentes e exemplificadas no arquivo `env.example` de cada pasta.

5. Execute as migrações do banco rodando o comando a seguir na pasta prisma que se localiza dentro da pasta `app/backend`:

   ```sh
   npx prisma migrate dev
   ```

6. Inicie a aplicação rodando o comando `yarn dev` na pasta raiz da sua aplicação. Esse comando iniciará todos os projetos da sua aplicação.

7. Acesse o projeto web em [http://localhost:3000](http://localhost:3000) e o projeto mobile através do emulador que será aberto automáticamente.


<br>

---

## 💎 Links úteis 💎 

- [Next.js](https://nextjs.org/docs)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Expo](https://expo.dev)
