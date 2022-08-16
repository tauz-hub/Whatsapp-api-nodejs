import { openDb } from '../config/openDB';

export async function getChatUser(user: string): Promise<insertDatabase[]> {
  return openDb().then(async (db) => {
    const tableQuery = `CREATE TABLE IF NOT EXISTS USER_${user} ( ID TEXT PRIMARY KEY NOT NULL, DATA TEXT NOT NULL)`;

    await db.exec(tableQuery);

    const itemSelectQuery = `SELECT DATA FROM USER_${user} WHERE ID='CHATDIALOG'`;
    const itemExist = await db.get(itemSelectQuery);

    if (!itemExist) {
      const listInit = [];
      const itemInsertQuery = `INSERT INTO USER_${user} ('ID', 'DATA') VALUES ('CHATDIALOG', '${listInit}')`;
      await db.exec(itemInsertQuery);
      return false;
    }

    return JSON.parse(itemExist.DATA);
  });
}

export async function updateChatUser(
  user: string,
  dialog: Array<insertDatabase>
) {
  return openDb().then(async (db) => {
    const tableQuery = `CREATE TABLE IF NOT EXISTS USER_${user} ( ID TEXT PRIMARY KEY NOT NULL, DATA TEXT NOT NULL)`;
    await db.exec(tableQuery);

    const updateQuery = `UPDATE USER_${user} SET DATA='${JSON.stringify(
      dialog
    )}' WHERE ID='CHATDIALOG'`;

    await db.run(updateQuery);
    return;
  });
}
