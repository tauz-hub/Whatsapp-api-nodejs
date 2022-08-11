import { create } from 'venom-bot';
import { start } from './startEvents';

create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });