const CepCoords = require('coordenadas-do-cep');

(async () => {
  try {
    const info = await CepCoords.getByCep('68285000');
    console.log(info);
  } catch (err) {}
})();
