import { Whatsapp } from 'venom-bot';
import { getCoordFromUser } from './buscacep';
import json from './database/unidades';

export async function start(client: Whatsapp) {
  client.onMessage(async (message) => {
    console.log('message: ' + JSON.stringify(message));
    const content = message.body;

    const regex = /[0-9]{5}-?[0-9]{3}/g;
    if (regex.test(content) && message.isGroupMsg === false) {
      const cepregex = content.match(regex)[0];

      const user = await getCoordFromUser(cepregex);

      if (!user) return;

      const latUser = user.lat;
      const lngUser = user.lon;

      let unidadeMaisProxima;
      let distanciaMaisCurta;

      json.forEach((obj) => {
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

      client.sendMessageOptions(message.from, str);
    }
  });
}
