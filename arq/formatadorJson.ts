const json = require('./xmltojson.json');
const fs = require('fs');
const arrayData = json.div.div;

const newJson: Array<any> = [];

arrayData.forEach((element) => {
  const obj = element.div?.div?.div;

  if (obj) {
    const unidade = {
      nomeUnidade: obj[0].strong.span,
      endereco: obj[1].span,
      telefone: obj[2].span,
      email: obj[3].span,
    };

    newJson.push(unidade);
    console.log(unidade);
  }
});

fs.writeFile('./unidades.json', JSON.stringify(newJson), (err) =>
  console.log(err)
);
