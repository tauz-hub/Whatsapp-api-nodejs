import { create } from 'venom-bot';
import { start } from './startEvents';

create({ headless: false })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
