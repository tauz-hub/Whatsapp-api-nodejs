import { LocalAuth } from 'whatsapp-web.js';

const qrcode = require('qrcode-terminal');

const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'client-one',
  }),
  puppeteer: { headless: false },
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
  console.log(session);
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});
client.on('message', (message) => {
  if (message.body === 'Boa noite') {
    message.reply('Olá boa tarde!');
  }
});

client.initialize();
