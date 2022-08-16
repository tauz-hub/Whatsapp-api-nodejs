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
/* {
	questions: [{
text:string, 
run: function(): boolean
},{
text:string, 
run: function(): boolean
}],{
text:string, 
run: function(): boolean
}],{
text:string, 
run: function(): boolean
}],
	responses: [strings, strings,strings,strings],
	
} */
