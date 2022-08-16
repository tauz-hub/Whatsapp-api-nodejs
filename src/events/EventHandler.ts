import path from 'path';
import { readdirSync } from 'fs';
import { WhatsappBot } from '../structures/Client';

async function EventHandler(): Promise<void> {
  return new Promise((resolve) => {
    const eventFolders = ['users'];

    eventFolders.forEach(async (folder) => {
      const folderPath = path.resolve(__dirname, folder);

      const eventFiles = readdirSync(folderPath).filter(
        (file) => file.endsWith('.event.js') || file.endsWith('.event.ts')
      );

      eventFiles.forEach(async (file) => {
        const instanceEvent: EventType = (await import(`./${folder}/${file}`))
          .default;

        const client = WhatsappBot.client;
        client[instanceEvent.name](instanceEvent.run);
      });
    });

    resolve();
  });
}

export default EventHandler;
