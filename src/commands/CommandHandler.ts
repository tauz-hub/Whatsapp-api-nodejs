import path from 'path';
import { Dirent, readdirSync } from 'fs';

const commandFolders = ['users'];
const mapCommands = new Map();
async function recursiveImport(folder: string) {
  const folderPath = path.resolve(__dirname, folder);

  let commandFiles: Dirent[];
  try {
    commandFiles = readdirSync(folderPath, { withFileTypes: true });
  } catch {}
  if (commandFiles) {
    commandFiles.map(async (file) => {
      if (file.isDirectory()) {
        recursiveImport(path.join(folder, file.name));

        return;
      }

      if (!/[.command.js]|[.command.ts]$/.test(file.name)) return;
      const name = `./${path.join('.', folder, file.name).replace(/\\/g, '/')}`;

      try {
        const command = (await import(`${name}`)).default as CommandType;
        mapCommands.set(command.name, command);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

async function commandHandler(): Promise<Map<string, CommandType>> {
  return new Promise(async (resolve) => {
    const exec = commandFolders.map(
      async (folder) => await recursiveImport(folder)
    );

    await Promise.all(exec);

    resolve(mapCommands);
  });
}

export default commandHandler;
