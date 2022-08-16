import { Message, Whatsapp } from 'venom-bot';
import { updateChatUser } from '../../model/controller/queries';

export async function sendInitalMessage(client: Whatsapp, message: Message) {
  const user = message.from.replace('@c.us', '');

  const str = `Olá ${
    message.notifyName || ''
  }, sou a assistente virtual da Polimix Concreto e estou aqui para te ajudar.

Para te direcionar melhor o seu atendimento, preciso saber sobre qual dos assuntos abaixo você gostaria de conversar:
      
Clique na opção desejada abaixo:`;

  const insertItem: insertDatabase = {
    inviteFrom: 'BOT',
    message: str,
  };
  await updateChatUser(user, [insertItem]);

  const buttons = [
    {
      buttonText: {
        displayText: 'Orçamentos e Unidades',
      },
    },
    {
      buttonText: {
        displayText: 'Trabalhe conosco',
      },
    },
    {
      buttonText: {
        displayText: 'Fornecedores',
      },
    },
    {
      buttonText: {
        displayText: 'Outros',
      },
    },
  ];

  return client.sendButtons(message.from, str, buttons, ' ');
}
