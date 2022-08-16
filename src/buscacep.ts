import CepCoords from 'coordenadas-do-cep';

type location = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  lat: number;
  lon: number;
};
export async function getCoordFromUser(cepUser: string): Promise<location> {
  let info: location;
  try {
    info = await CepCoords.getByCep(cepUser);
    return info;
  } catch (err) {
    return info;
  }
}
