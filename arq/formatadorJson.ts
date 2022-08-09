const json = require('./bigdata.json');
const fs = require('fs');
const arrayData = json.div;

const newJson: Array<any> = [];

arrayData.forEach((element) => {
  const obj = element.div[0].div[0];
  const coord = element.$;

  if (obj) {
    const unidade = {
      coord,
      nomeUnidade: obj.div[0]?.strong[0]?.span[0],
      endereco: obj.div[1]?.span[0],
      telefone: obj.div[2]?.span[0],
      email: obj.div[3]?.span[0],
    };

    newJson.push(unidade);
    console.log(unidade);
  }
});

fs.writeFile('./unidades.json', JSON.stringify(newJson), (err) =>
  console.log(err)
);
