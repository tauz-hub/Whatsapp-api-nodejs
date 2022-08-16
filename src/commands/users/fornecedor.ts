import { Message, Whatsapp } from 'venom-bot';

export default {
  name: 'fornecedor',
  run: (client: Whatsapp, message: Message) => {
    const str = `Boa Tarde,
Prezado(a),

Para propostas por gentileza acessar o link:

http://polimixconcreto.com.br/contato/contato.html

Atenciosamente.`;
    client.sendMessageOptions(message.from, str);
  },
} as CommandType;
