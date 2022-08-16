import { Message, Whatsapp } from 'venom-bot';

export default {
  name: 'trabalhe conosco',
  run: (client: Whatsapp, message: Message) => {
    const str = `Boa Tarde,
Prezado(a),

Para propostas por gentileza acessar o link

http://www.polimix.com.br/apresentacao-fornecedor/

Atenciosamente.`;
    client.sendMessageOptions(message.from, str);
  },
} as CommandType;
