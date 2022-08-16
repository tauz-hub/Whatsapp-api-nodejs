import { Message, Whatsapp } from 'venom-bot';
import { getCoordFromUser } from '../../buscacep';
import { WhatsappBot } from '../../structures/Client';
import json from '../../model/unidades';

export default {
  name: 'orçamento',
  run: (client: Whatsapp, message: Message) => {
    const verify = async (msg: Message) => {
      const content = msg.content;
      const regex = /[0-9]{5}-?[0-9]{3}/g;

      if (!regex.test(content)) return false;
      const cepregex = content.match(regex)[0];

      const user = await getCoordFromUser(cepregex);

      if (!user) return false;

      return true;
    };

    const run = async (msg: Message) => {
      const content = msg.body;
      const regex = /[0-9]{5}-?[0-9]{3}/g;

      const cepregex = content.match(regex)[0];

      const user = await getCoordFromUser(cepregex);

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
      }\nE-mail: ${
        unidadeMaisProxima.email
      }\nEntre em contato com a unidade acima e faça o orçamento para sua construção!\n\nOu ainda clique no link abaixo:\nhttp://polimixconcreto.com.br/orcamento/orcamento.html`;

      client.sendMessageOptions(msg.from, str);
    };
    const unverifiedMessage = 'Escreva apenas um cep válido com números!';
    const objCacheUser: cacheMapUser = {
      questions: [
        {
          text: 'Envie seu cep para eu te mandar a unidade mais próxima de você!',
          verify,
          unverifiedMessage,
          run,
        },
      ],
      responses: [],
    };

    const user = message.from.replace('@c.us', '');
    const waap = WhatsappBot.getInstance();
    waap.setCacheUser(user, objCacheUser);

    client.sendMessageOptions(message.from, objCacheUser.questions[0].text);

    /* 

    const str = `Boa Tarde,
Prezado(a),
     
Para solicitação de orçamento, por gentileza acessar o link http://polimixconcreto.com.br/orcamento/orcamento.html.
     
Atenciosamente,`;

    client.sendMessageOptions(message.from, str); */
  },
} as CommandType;
