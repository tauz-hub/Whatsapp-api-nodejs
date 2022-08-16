enum INVITETYPE {
  'USER',
  'BOT',
}
type inviteType = keyof typeof INVITETYPE;
type insertDatabase = {
  message: string;
  inviteFrom: inviteType;
};
