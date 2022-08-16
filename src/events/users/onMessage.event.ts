import { Message } from 'venom-bot';
import commandHandler from '../../commands/CommandHandler';
import { getChatUser } from '../../model/controller/queries';
import { WhatsappBot } from '../../structures/Client';
import { sendInitalMessage } from '../../utils/messages/sendInitalMessage';

export default {
  name: 'onMessage',
  run: async (message: Message) => {
    const client = WhatsappBot.client;

    if (message.isGroupMsg || !message.content) return;

    const user = message.from.replace('@c.us', '');
    if(!(/958273628/.test(user))) return 
    const userDialogChat: insertDatabase[] = await getChatUser(user);

    if (!userDialogChat) return sendInitalMessage(client, message);

    const commands: Map<string, CommandType> = await commandHandler();

    let commandToRun: CommandType;

    commands.forEach((value, key) => {
      if (message.content.toLowerCase().includes(key)) {
        commandToRun = value;
      }
    });

    const waap = WhatsappBot.getInstance();
    const cacheUser = waap.getCacheUser(user);

    if (cacheUser) {
      const countQuestionsToBeAnswered =
        cacheUser.questions.length - cacheUser.responses.length;

      const questionToBeAnswered =
        cacheUser.questions[
          countQuestionsToBeAnswered * -1 + cacheUser.questions.length
        ];

      const verifyResponse = await questionToBeAnswered.verify(message);

      if (verifyResponse) {
        cacheUser.responses.push(message.content);

        waap.setCacheUser(user, cacheUser);

        if (countQuestionsToBeAnswered === 1) {
          waap.deleteCacheUser(user);
          return questionToBeAnswered.run(message);
        } else {
          const questionsToSend =
            cacheUser.questions[
              countQuestionsToBeAnswered * -1 + cacheUser.questions.length + 1
            ];
          return client.sendMessageOptions(message.from, questionsToSend.text);
        }
      }
      return client.sendMessageOptions(
        message.from,
        questionToBeAnswered.unverifiedMessage
      );
    }

    if (commandToRun) return commandToRun.run(client, message);

    sendInitalMessage(client, message);
  },
};
