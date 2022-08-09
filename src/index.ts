import { Client, LocalAuth } from 'whatsapp-web.js';
import { getCoordFromUser } from './buscacep';

import qrcode from 'qrcode-terminal';

import json from './database/unidades.js';

const client: Client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
  puppeteer: { headless: false },
});
type location = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  lat: number;
  lon: number;
};
type unidade = {
  coord: {
    class: string;
    'data-lat': string;
    'data-lng': string;
  };
  nomeUnidade: string;
  endereco: string;
  telefone: string;
  email: string;
};

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});
client.on('message', async (message) => {
  const content = message.body;

  const regex = /[0-9]{5}-?[0-9]{3}/g;

  if (regex.test(content)) {
    const cepregex = content.match(regex)[0];

    const user: location = await getCoordFromUser(cepregex);

    if (!user) return;

    const latUser = user.lat;
    const lngUser = user.lon;

    let unidadeMaisProxima: unidade;
    let distanciaMaisCurta;

    json.forEach((obj: unidade) => {
      const latUnit = parseFloat(obj.coord['data-lat']);
      const lngUnit = parseFloat(obj.coord['data-lng']);

      const modLat = Math.abs(latUnit - latUser);
      const modLng = Math.abs(lngUnit - lngUser);

      const distancia = Math.sqrt(Math.pow(modLat, 2) + Math.pow(modLng, 2));

      console.log(distancia);

      if (distanciaMaisCurta) {
        if (distancia < distanciaMaisCurta) {
          unidadeMaisProxima = obj;
          distanciaMaisCurta = distancia;
        }
      } else {
        unidadeMaisProxima = obj;
        distanciaMaisCurta = distancia;
      }
    });

    const str = `Unidade mais próxima: ${JSON.stringify(
      unidadeMaisProxima.nomeUnidade
    )}\nEndereço: ${unidadeMaisProxima.endereco}\nTelefone: ${
      unidadeMaisProxima.telefone
    }\nE-mail: ${unidadeMaisProxima.email}`;

    message.reply(str);
  }
});

client.initialize();
