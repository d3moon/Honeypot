
# Honeypot


[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<div align="center">
  <img src="https://clipart-library.com/images/yikA5jj4T.png" alt="Bee" width="100">
</div>


Esse app representa um aplicativo Node.js que cria um Honeypot usando o framework Express. O Honeypot é uma técnica de segurança que consiste em simular um sistema vulnerável para atrair possíveis atacantes, registrando suas tentativas e coletando informações sobre eles.


## Funcionalidades

- Registro de tentativas de acesso: O aplicativo registra todas as solicitações recebidas no servidor Honeypot, incluindo o endereço IP do atacante, a URL original, os cabeçalhos da solicitação e outras informações relevantes.

- Coleta de informações do atacante: Para cada tentativa de acesso, são coletadas informações sobre o atacante, como o endereço IP, o agente do usuário, o referenciador e a geolocalização. As informações de geolocalização são obtidas usando a API ipgeolocation.io.

- Visualização dos detalhes do atacante: Os detalhes do atacante são exibidos no console, fornecendo insights sobre sua localização geográfica, provedor de internet e outras informações relevantes.

- Execução de comandos no servidor: O Honeypot também oferece a capacidade de executar comandos no sistema operacional do servidor. Os comandos são recebidos através da rota `/cmd` e são executados usando o módulo `child_process`.

## Requisitos do Sistema

- Node.js: Certifique-se de ter o Node.js instalado no seu sistema. Você pode baixá-lo em [https://nodejs.org](https://nodejs.org).



