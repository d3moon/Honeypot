const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');
require('dotenv').config()

const app = express();
app.set('view engine', 'ejs');
const honeypotPort = 8080;

let honeypotIP;  

function startHoneypot() {
  app.get('/', async (req, res) => {
    const { ip, originalUrl, headers } = req;
    console.log(`[Honeypot] IP: ${ip} Tentou acessar: ${originalUrl}`);

     const attackerInfo = {
      ipAddress: ip,
      timestamp: new Date(),
      userAgent: headers['user-agent'],
      referer: headers['referer'] || headers['referrer'],
      host: headers['host'],
      headers: headers
    };

     try {
      const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_GEO}&ip=${ip}`);
      const { country_name, state_prov, city, isp, organization, latitude, longitude } = response.data;

      attackerInfo.geoLocation = {
        country: country_name,
        region: state_prov,
        city,
        isp,
        org: organization,
        latitude,
        longitude
      };

      console.log('[Honeypot] Informações do atacante:');
      console.log(attackerInfo);
    } catch (error) {
      console.error('[Honeypot] Erro ao obter informações de geolocalização:', error.message);
    }

    const data = { honeypotIP: honeypotIP };

    return res.status(404).render('index', { honeypotIP: data.honeypotIP });

  });


  app.get('/cmd', (req, res) => {
    const command = req.headers['x-command'];

    exec(command, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Erro ao executar o comando: ${error.message}`);
      } else {
        res.send(stdout || stderr);
      }
    });
  });

  app.listen(honeypotPort, honeypotIP, () => {
    console.log(`Honeypot Express iniciado em http://${honeypotIP}:${honeypotPort}`);
  });
}

process.stdout.write('Digite o endereço IP do Honeypot: ');

process.stdin.on('data', (data) => {
  honeypotIP = data.toString().trim();  
  startHoneypot();  
});

process.stdin.on('end', () => {
  console.log('Entrada de dados encerrada.');
});

process.stdin.resume();
