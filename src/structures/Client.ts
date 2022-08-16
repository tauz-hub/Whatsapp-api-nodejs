import { Whatsapp } from 'venom-bot';
import EventHandler from '../events/EventHandler';

export class WhatsappBot {
  static instance: WhatsappBot;

  static client: Whatsapp;

  private cacheUsersResponse: Map<string, cacheMapUser> = new Map();

  public static getInstance(): WhatsappBot {
    if (!WhatsappBot.instance) {
      WhatsappBot.instance = new WhatsappBot();
    }
    return WhatsappBot.instance;
  }

  public deleteCacheUser(user: string) {
    this.cacheUsersResponse.delete(user);
    return;
  }

  public setCacheUser(user: string, objCacheUser: cacheMapUser) {
    this.cacheUsersResponse.set(user, objCacheUser);
    return;
  }

  public getCacheUser(user: string) {
    const userCache = this.cacheUsersResponse.get(user);

    return userCache;
  }

  public static setInstance(client: Whatsapp) {
    WhatsappBot.client = client;
  }

  public static async start() {
    await EventHandler();
  }
}
