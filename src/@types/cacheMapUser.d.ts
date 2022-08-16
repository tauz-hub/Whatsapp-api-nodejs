type questionsObj = {
  text: string;
  verify: (...args) => Promise<boolean>;
  unverifiedMessage: string;
  run?: function;
};

type cacheMapUser = {
  questions: Array<questionsObj>;
  responses: Array<string>;
};

