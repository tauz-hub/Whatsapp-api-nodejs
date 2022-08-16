import json from './bigdata.json';
import fs from 'fs';
const arrayData = json.div;

const newJson: Array<any> = [];

arrayData.forEach((element: any) => {
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
  }
});

fs.writeFile('./database/unidades.json', JSON.stringify(newJson), (err: any) =>
  console.log(err)
);
