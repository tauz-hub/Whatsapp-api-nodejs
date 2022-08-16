import { create } from 'venom-bot';
import { WhatsappBot } from './structures/Client';

create()
  .then((client) => {
    WhatsappBot.setInstance(client);
    WhatsappBot.start();
  })
  .catch((erro) => {
    console.log(erro);
  });
