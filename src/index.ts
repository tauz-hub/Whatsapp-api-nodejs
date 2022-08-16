import { create } from 'venom-bot';
import { WhatsappBot } from './structures/Client';

create({ useChrome: false, browserArgs: ['--no-sandbox'] })
  .then((client) => {
    WhatsappBot.setInstance(client);
    WhatsappBot.start();
  })
  .catch((erro) => {
    console.log(erro);
  });
